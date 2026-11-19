
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
  where,
} from 'firebase/firestore'

import { signInAnonymously } from 'firebase/auth'

import { auth, db } from '../firebase.js'
import { rooms } from '../data/rooms.js'
import { getBookingDates } from '../utils/bookingDates.js'

const bookingsCollection = collection(db, 'bookings')

async function getCurrentUser() {
  await auth.authStateReady()

  if (auth.currentUser) {
    return auth.currentUser
  }

  const credential = await signInAnonymously(auth)
  return credential.user
}

function mapBooking(snapshot) {
  return {
    ...snapshot.data(),
    id: snapshot.id,
  }
}

function getAvailabilityRef(roomId, date) {
  return doc(db, 'roomAvailability', `${roomId}_${date}`)
}

function getRoomCapacity(roomId) {
  const room = rooms.find(
    (item) => String(item.id) === String(roomId)
  )

  if (!room) {
    throw new Error('Категорію номера не знайдено.')
  }

  return room.quantity
}

function getDates(data) {
  const dates = getBookingDates(data.checkIn, data.checkOut)

  if (dates.length === 0 || dates.length > 30) {
    throw new Error('Оберіть період проживання від 1 до 30 ночей.')
  }

  return dates
}

export const firebaseBookingsAdapter = {
  async getAll() {
    const user = await getCurrentUser()

    const bookingsQuery = query(
      bookingsCollection,
      where('userId', '==', user.uid)
    )

    const snapshot = await getDocs(bookingsQuery)
    return snapshot.docs.map(mapBooking)
  },

  async getById(id) {
    const user = await getCurrentUser()
    const snapshot = await getDoc(
      doc(bookingsCollection, String(id))
    )

    if (!snapshot.exists()) return null

    const booking = mapBooking(snapshot)

    if (booking.userId !== user.uid) {
      throw new Error('Немає доступу до цього бронювання.')
    }

    return booking
  },

  async create(data) {
    const user = await getCurrentUser()
    const bookingRef = doc(bookingsCollection)
    const dates = getDates(data)
    const capacity = getRoomCapacity(data.roomId)

    const availabilityRefs = dates.map((date) =>
      getAvailabilityRef(data.roomId, date)
    )

    const booking = {
      ...data,
      id: bookingRef.id,
      userId: user.uid,
    }

    await runTransaction(db, async (transaction) => {
      const snapshots = []

      for (const ref of availabilityRefs) {
        snapshots.push(await transaction.get(ref))
      }

      for (const snapshot of snapshots) {
        const occupied = snapshot.exists()
          ? snapshot.data().occupied
          : 0

        if (!Number.isInteger(occupied) ||
            occupied < 0 ||
            occupied >= capacity) {
          throw new Error(
            'На вибрані дати немає вільних номерів цієї категорії.'
          )
        }
      }

      snapshots.forEach((snapshot, index) => {
        const ref = availabilityRefs[index]
        const occupied = snapshot.exists()
          ? snapshot.data().occupied
          : 0

        transaction.set(ref, {
          roomId: String(data.roomId),
          date: dates[index],
          occupied: occupied + 1,
        })
      })

      transaction.set(bookingRef, booking)
    })

    return booking
  },

  async update(id, data) {
    const user = await getCurrentUser()
    const bookingRef = doc(bookingsCollection, String(id))
    const newDates = getDates(data)

    let updatedBooking

    await runTransaction(db, async (transaction) => {
      const bookingSnapshot = await transaction.get(bookingRef)

      if (!bookingSnapshot.exists()) {
        throw new Error('Бронювання не знайдено.')
      }

      const existing = bookingSnapshot.data()

      if (existing.userId !== user.uid) {
        throw new Error('Немає доступу до цього бронювання.')
      }

      const oldDates = getDates(existing)
      const oldRoomId = String(existing.roomId)
      const newRoomId = String(data.roomId)

      const oldKeys = oldDates.map(
        (date) => `${oldRoomId}_${date}`
      )
      const newKeys = newDates.map(
        (date) => `${newRoomId}_${date}`
      )

      const allKeys = [...new Set([...oldKeys, ...newKeys])]
      const snapshots = new Map()

      for (const key of allKeys) {
        const ref = doc(db, 'roomAvailability', key)
        snapshots.set(key, {
          ref,
          snapshot: await transaction.get(ref),
        })
      }

      const capacity = getRoomCapacity(newRoomId)

      for (const key of newKeys) {
        const entry = snapshots.get(key)
        const occupied = entry.snapshot.exists()
          ? entry.snapshot.data().occupied
          : 0

        const alreadyReserved = oldKeys.includes(key)

        if (!Number.isInteger(occupied) ||
            occupied < 0 ||
            occupied - (alreadyReserved ? 1 : 0) >= capacity) {
          throw new Error(
            'На вибрані дати немає вільних номерів цієї категорії.'
          )
        }
      }

      for (const key of allKeys) {
        const entry = snapshots.get(key)
        const occupied = entry.snapshot.exists()
          ? entry.snapshot.data().occupied
          : 0

        const difference =
          (newKeys.includes(key) ? 1 : 0) -
          (oldKeys.includes(key) ? 1 : 0)

        if (difference === 0) continue

        const nextOccupied = occupied + difference

        if (nextOccupied < 0) {
          throw new Error('Помилка обліку зайнятості номерів.')
        }

        const [roomId, ...dateParts] = key.split('_')

        transaction.set(entry.ref, {
          roomId,
          date: dateParts.join('_'),
          occupied: nextOccupied,
        })
      }

      updatedBooking = {
        ...existing,
        ...data,
        id: bookingSnapshot.id,
        userId: user.uid,
      }

      transaction.update(bookingRef, updatedBooking)
    })

    return updatedBooking
  },

  async delete(id) {
    const user = await getCurrentUser()
    const bookingRef = doc(bookingsCollection, String(id))

    await runTransaction(db, async (transaction) => {
      const bookingSnapshot = await transaction.get(bookingRef)

      if (!bookingSnapshot.exists()) {
        throw new Error('Бронювання не знайдено.')
      }

      const booking = bookingSnapshot.data()

      if (booking.userId !== user.uid) {
        throw new Error('Немає доступу до цього бронювання.')
      }

      const dates = getDates(booking)
      const availabilityRefs = dates.map((date) =>
        getAvailabilityRef(booking.roomId, date)
      )

      const snapshots = []

      for (const ref of availabilityRefs) {
        snapshots.push(await transaction.get(ref))
      }

      snapshots.forEach((snapshot, index) => {
        const occupied = snapshot.exists()
          ? snapshot.data().occupied
          : 0

        if (!Number.isInteger(occupied) || occupied <= 0) {
          throw new Error('Помилка обліку зайнятості номерів.')
        }

        transaction.set(availabilityRefs[index], {
          roomId: String(booking.roomId),
          date: dates[index],
          occupied: occupied - 1,
        })
      })

      transaction.delete(bookingRef)
    })

    return { success: true, id }
  },
}
