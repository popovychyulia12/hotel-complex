
import { datesOverlap } from '../utils/bookingLogic.js'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  collection,
  getDocs,
  onSnapshot,
} from 'firebase/firestore'

import { signInAnonymously } from 'firebase/auth'

import { BookingsContext } from './BookingsContextValue.js'
import { bookingsAdapter } from '../api/bookingsAdapter.js'
import { auth, db } from '../firebase.js'
import { rooms } from '../data/rooms.js'
import { getBookingDates } from '../utils/bookingDates.js'

const LEGACY_ROOM_NAMES = {
  Стандарт: 1,
}

const USE_FIREBASE =
  import.meta.env.VITE_DATA_MODE === 'firebase'

function findRoom(booking) {
  if (
    booking.roomId !== undefined &&
    booking.roomId !== ''
  ) {
    const byId = rooms.find(
      (room) =>
        String(room.id) === String(booking.roomId)
    )

    if (byId) return byId
  }

  const legacyId = LEGACY_ROOM_NAMES[booking.roomName]

  if (legacyId) {
    return rooms.find((room) => room.id === legacyId)
  }

  return rooms.find(
    (room) => room.name === booking.roomName
  )
}

function countAvailable(
  bookings,
  roomId,
  checkIn,
  checkOut,
  excludeId = null
) {
  const room = rooms.find(
    (item) => String(item.id) === String(roomId)
  )

  if (
    !room ||
    !checkIn ||
    !checkOut ||
    checkIn >= checkOut
  ) {
    return 0
  }

  const occupied = bookings.filter((booking) => {
    if (
      excludeId !== null &&
      String(booking.id) === String(excludeId)
    ) {
      return false
    }

    const bookedRoom = findRoom(booking)

    return (
      bookedRoom?.id === room.id &&
      booking.checkIn &&
      booking.checkOut &&
      datesOverlap(
        checkIn,
        checkOut,
        booking.checkIn,
        booking.checkOut
      )
    )
  }).length

  return Math.max(0, room.quantity - occupied)
}

async function ensureFirebaseUser() {
  await auth.authStateReady()

  if (auth.currentUser) {
    return auth.currentUser
  }

  const credential = await signInAnonymously(auth)
  return credential.user
}

function parseAvailability(snapshot) {
  const result = {}

  snapshot.forEach((documentSnapshot) => {
    const data = documentSnapshot.data()

    if (
      typeof data.roomId === 'string' &&
      typeof data.date === 'string' &&
      Number.isInteger(data.occupied) &&
      data.occupied >= 0
    ) {
      result[documentSnapshot.id] = data.occupied
    }
  })

  return result
}

async function fetchAvailability() {
  await ensureFirebaseUser()

  const snapshot = await getDocs(
    collection(db, 'roomAvailability')
  )

  return parseAvailability(snapshot)
}

function countFirebaseAvailable(
  availability,
  roomId,
  checkIn,
  checkOut,
  existingBooking = null
) {
  const room = rooms.find(
    (item) => String(item.id) === String(roomId)
  )

  if (!room) return 0

  const dates = getBookingDates(checkIn, checkOut)

  if (dates.length === 0 || dates.length > 30) {
    return 0
  }

  let minimumAvailable = room.quantity

  for (const date of dates) {
    const key = `${room.id}_${date}`

    let occupied = availability[key] ?? 0

    if (
      existingBooking &&
      String(existingBooking.roomId) ===
        String(room.id) &&
      existingBooking.checkIn <= date &&
      existingBooking.checkOut > date
    ) {
      occupied -= 1
    }

    const available = room.quantity - occupied

    minimumAvailable = Math.min(
      minimumAvailable,
      available
    )
  }

  return Math.max(0, minimumAvailable)
}

export function BookingsProvider({ children }) {
  const [bookings, setBookings] = useState([])
  const [availability, setAvailability] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const requestVersion = useRef(0)
  const bookingsRef = useRef([])
  const availabilityRef = useRef({})
  const writeQueue = useRef(Promise.resolve())
  const mountedRef = useRef(false)

  const publishBookings = useCallback((items) => {
    bookingsRef.current = items
    setBookings(items)
  }, [])

  const publishAvailability = useCallback((data) => {
    availabilityRef.current = data
    setAvailability(data)
  }, [])

  // Автоматичне оновлення зайнятості номерів
  useEffect(() => {
    if (!USE_FIREBASE) return

    let unsubscribe = null
    let cancelled = false

    async function startListener() {
      try {
        await ensureFirebaseUser()

        if (cancelled) return

        unsubscribe = onSnapshot(
          collection(db, 'roomAvailability'),
          (snapshot) => {
            if (cancelled) return

            const latest = parseAvailability(snapshot)
            publishAvailability(latest)
          },
          (snapshotError) => {
            console.error(
              'Помилка оновлення зайнятості:',
              snapshotError
            )
          }
        )
      } catch (listenerError) {
        console.error(
          'Не вдалося підключити оновлення зайнятості:',
          listenerError
        )
      }
    }

    startListener()

    return () => {
      cancelled = true

      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [publishAvailability])

  const loadBookings = useCallback(async () => {
    const version = ++requestVersion.current

    setLoading(true)
    setError('')

    try {
      const [result, availabilityResult] =
        await Promise.all([
          bookingsAdapter.getAll(),
          USE_FIREBASE
            ? fetchAvailability()
            : Promise.resolve({}),
        ])

      if (
        !mountedRef.current ||
        version !== requestVersion.current
      ) {
        return
      }

      if (!Array.isArray(result)) {
        throw new Error(
          'Некоректна відповідь джерела даних.'
        )
      }

      publishBookings(result)

      if (!USE_FIREBASE) {
        publishAvailability(availabilityResult)
      }
    } catch (loadError) {
      if (
        mountedRef.current &&
        version === requestVersion.current
      ) {
        setError(
          loadError?.message ||
          'Не вдалося завантажити бронювання.'
        )
      }
    } finally {
      if (
        mountedRef.current &&
        version === requestVersion.current
      ) {
        setLoading(false)
      }
    }
  }, [publishBookings, publishAvailability])

  useEffect(() => {
    mountedRef.current = true

    const controller = new AbortController()

    Promise.resolve().then(() => {
      if (!controller.signal.aborted) {
        loadBookings()
      }
    })

    return () => {
      controller.abort()
      mountedRef.current = false
      requestVersion.current += 1
    }
  }, [loadBookings])

  const retry = useCallback(() => {
    loadBookings()
  }, [loadBookings])

  function getBookingById(id) {
    return bookings.find(
      (booking) => String(booking.id) === String(id)
    )
  }

  function getAvailableRooms(
    roomId,
    checkIn,
    checkOut,
    excludeId = null
  ) {
    if (!USE_FIREBASE) {
      return countAvailable(
        bookings,
        roomId,
        checkIn,
        checkOut,
        excludeId
      )
    }

    const existingBooking =
      excludeId === null
        ? null
        : bookings.find(
            (booking) =>
              String(booking.id) === String(excludeId)
          )

    return countFirebaseAvailable(
      availability,
      roomId,
      checkIn,
      checkOut,
      existingBooking
    )
  }

  function validateAvailability(
    data,
    excludeId = null,
    collectionData = bookingsRef.current
  ) {
    const room = findRoom(data)

    if (!room) {
      return {
        success: false,
        error: 'Оберіть категорію номера.',
      }
    }

    if (
      !data.checkIn ||
      !data.checkOut ||
      data.checkIn >= data.checkOut
    ) {
      return {
        success: false,
        error: 'Перевірте дати заїзду та виїзду.',
      }
    }

    let available

    if (USE_FIREBASE) {
      const existingBooking =
        excludeId === null
          ? null
          : collectionData.find(
              (booking) =>
                String(booking.id) ===
                String(excludeId)
            )

      available = countFirebaseAvailable(
        availabilityRef.current,
        room.id,
        data.checkIn,
        data.checkOut,
        existingBooking
      )
    } else {
      available = countAvailable(
        collectionData,
        room.id,
        data.checkIn,
        data.checkOut,
        excludeId
      )
    }

    if (available <= 0) {
      return {
        success: false,
        error:
          'На вибрані дати всі номери цієї категорії зайняті. Оберіть інші дати або категорію.',
      }
    }

    return { success: true, room }
  }

  function enqueueWrite(operation) {
    const result = writeQueue.current.then(operation)

    writeQueue.current = result.catch(() => {})

    return result
  }

  async function refreshAvailability() {
    if (!USE_FIREBASE) return

    const latest = await fetchAvailability()

    if (mountedRef.current) {
      publishAvailability(latest)
    }

    return latest
  }

  function createBooking(data) {
    return enqueueWrite(async () => {
      if (loading || error) {
        return {
          success: false,
          error:
            'Дані ще не готові. Повторіть спробу після завантаження.',
        }
      }

      try {
        if (USE_FIREBASE) {
          await refreshAvailability()
        }

        const validation = validateAvailability(data)

        if (!validation.success) {
          return validation
        }

        const room = validation.room

        const created = await bookingsAdapter.create({
          ...data,
          roomId: room.id,
          roomName: room.name,
        })

        requestVersion.current += 1

        publishBookings([
          ...bookingsRef.current,
          created,
        ])

        if (USE_FIREBASE) {
          await refreshAvailability()
        }

        setLoading(false)
        setNotice('Бронювання успішно створено!')

        return { success: true, booking: created }
      } catch (saveError) {
        return {
          success: false,
          error:
            saveError?.message ||
            'Не вдалося створити бронювання.',
        }
      }
    })
  }

  function updateBooking(id, data) {
    return enqueueWrite(async () => {
      if (loading || error) {
        return {
          success: false,
          error:
            'Дані ще не готові. Повторіть спробу після завантаження.',
        }
      }

      const existing = bookingsRef.current.find(
        (booking) => String(booking.id) === String(id)
      )

      if (!existing) {
        return {
          success: false,
          error: 'Бронювання не знайдено.',
        }
      }

      const updatedData = {
        ...existing,
        ...data,
        id: existing.id,
      }

      try {
        if (USE_FIREBASE) {
          await refreshAvailability()
        }

        const validation = validateAvailability(
          updatedData,
          id
        )

        if (!validation.success) {
          return validation
        }

        const room = validation.room

        const updated = await bookingsAdapter.update(
          id,
          {
            ...updatedData,
            roomId: room.id,
            roomName: room.name,
          }
        )

        requestVersion.current += 1

        publishBookings(
          bookingsRef.current.map((booking) =>
            String(booking.id) === String(id)
              ? updated
              : booking
          )
        )

        if (USE_FIREBASE) {
          await refreshAvailability()
        }

        setLoading(false)
        setNotice('Бронювання успішно оновлено!')

        return { success: true, booking: updated }
      } catch (saveError) {
        return {
          success: false,
          error:
            saveError?.message ||
            'Не вдалося оновити бронювання.',
        }
      }
    })
  }

  function deleteBooking(id) {
    return enqueueWrite(async () => {
      if (loading || error) {
        return {
          success: false,
          error:
            'Дані ще не готові. Повторіть спробу після завантаження.',
        }
      }

      const existing = bookingsRef.current.find(
        (booking) => String(booking.id) === String(id)
      )

      if (!existing) {
        return {
          success: false,
          error: 'Бронювання не знайдено.',
        }
      }

      try {
        await bookingsAdapter.delete(id)

        requestVersion.current += 1

        publishBookings(
          bookingsRef.current.filter(
            (booking) =>
              String(booking.id) !== String(id)
          )
        )

        if (USE_FIREBASE) {
          await refreshAvailability()
        }

        setLoading(false)
        setNotice('Бронювання успішно видалено!')

        return { success: true }
      } catch (deleteError) {
        return {
          success: false,
          error:
            deleteError?.message ||
            'Не вдалося видалити бронювання.',
        }
      }
    })
  }

  return (
    <BookingsContext.Provider
      value={{
        bookings,
        loading,
        error,
        retry,
        notice,
        setNotice,
        getBookingById,
        getAvailableRooms,
        createBooking,
        updateBooking,
        deleteBooking,
      }}
    >
      {children}
    </BookingsContext.Provider>
  )
}
