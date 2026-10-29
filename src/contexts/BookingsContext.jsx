import { datesOverlap } from '../utils/bookingLogic.js'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { BookingsContext } from './BookingsContextValue.js'

import { bookingsAdapter } from '../api/bookingsAdapter.js'

import { rooms } from '../data/rooms.js'

const LEGACY_ROOM_NAMES = {
  Стандарт: 1,
}

function findRoom(booking) {
  if (booking.roomId !== undefined && booking.roomId !== '') {
    const byId = rooms.find(
      (room) => String(room.id) === String(booking.roomId)
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

function countAvailable(bookings, roomId, checkIn, checkOut, excludeId = null) {
  const room = rooms.find(
    (item) => String(item.id) === String(roomId)
  )

  if (!room || !checkIn || !checkOut || checkIn >= checkOut) {
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

export function BookingsProvider({ children }) {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const requestVersion = useRef(0)
  const bookingsRef = useRef([])
  const writeQueue = useRef(Promise.resolve())
  const mountedRef = useRef(false)

  const publishBookings = useCallback((items) => {
    bookingsRef.current = items
    setBookings(items)
  }, [])

  const loadBookings = useCallback(async () => {
    const version = ++requestVersion.current

    setLoading(true)
    setError('')

    try {
      const result = await bookingsAdapter.getAll()

      if (
        !mountedRef.current ||
        version !== requestVersion.current
      ) {
        return
      }

      if (!Array.isArray(result)) {
        throw new Error('Некоректна відповідь джерела даних.')
      }

      publishBookings(result)
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
  }, [publishBookings])

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

  function getAvailableRooms(roomId, checkIn, checkOut, excludeId = null) {
    return countAvailable(
      bookings,
      roomId,
      checkIn,
      checkOut,
      excludeId
    )
  }

  function validateAvailability(data, excludeId = null, collection = bookingsRef.current) {
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

    const available = countAvailable(
      collection,
      room.id,
      data.checkIn,
      data.checkOut,
      excludeId
    )

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

  function createBooking(data) {
    return enqueueWrite(async () => {
      if (loading || error) {
        return {
          success: false,
          error: 'Дані ще не готові. Повторіть спробу після завантаження.',
        }
      }

      const validation = validateAvailability(data)

      if (!validation.success) {
        return validation
      }

      const room = validation.room

      try {
        const created = await bookingsAdapter.create({
          ...data,
          roomId: room.id,
          roomName: room.name,
        })

        // Старі запити читання більше не можуть перезаписати колекцію
        requestVersion.current += 1

        publishBookings([
          ...bookingsRef.current,
          created,
        ])

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
          error: 'Дані ще не готові. Повторіть спробу після завантаження.',
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

      const validation = validateAvailability(
        updatedData,
        id
      )

      if (!validation.success) {
        return validation
      }

      const room = validation.room

      try {
        const updated = await bookingsAdapter.update(id, {
          ...updatedData,
          roomId: room.id,
          roomName: room.name,
        })

        requestVersion.current += 1

        publishBookings(
          bookingsRef.current.map((booking) =>
            String(booking.id) === String(id)
              ? updated
              : booking
          )
        )

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
          error: 'Дані ще не готові. Повторіть спробу після завантаження.',
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
            (booking) => String(booking.id) !== String(id)
          )
        )

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