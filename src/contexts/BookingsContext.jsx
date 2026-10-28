
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import { bookings as initialBookings } from '../data/bookings.js'
import { rooms } from '../data/rooms.js'

const BookingsContext = createContext(null)

const STORAGE_KEY = 'hotel-complex-bookings'

// Старі назви категорій залишаємо для сумісності
const LEGACY_ROOM_NAMES = {
  Стандарт: 1,
}

function loadBookings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (saved !== null) {
      const parsed = JSON.parse(saved)

      if (Array.isArray(parsed)) {
        return parsed
      }
    }
  } catch (error) {
    console.error('Помилка завантаження бронювань:', error)
  }

  return initialBookings
}

// Знаходимо категорію за ID або назвою
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

// Перевіряємо, чи перетинаються дати двох бронювань
function datesOverlap(start1, end1, start2, end2) {
  return start1 < end2 && end1 > start2
}

export function BookingsProvider({ children }) {
  const [bookings, setBookings] = useState(loadBookings)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(bookings)
      )
    } catch (error) {
      console.error('Помилка збереження бронювань:', error)
    }
  }, [bookings])

  function getBookingById(id) {
    return bookings.find(
      (booking) => String(booking.id) === String(id)
    )
  }

  // Рахуємо вільні номери на вибрані дати
  function getAvailableRooms(roomId, checkIn, checkOut, excludeId = null) {
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

      if (!bookedRoom || bookedRoom.id !== room.id) {
        return false
      }

      if (!booking.checkIn || !booking.checkOut) {
        return false
      }

      return datesOverlap(
        checkIn,
        checkOut,
        booking.checkIn,
        booking.checkOut
      )
    }).length

    return Math.max(0, room.quantity - occupied)
  }

  // Перевірка перед створенням або редагуванням
  function validateAvailability(data, excludeId = null) {
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

    const available = getAvailableRooms(
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

    return { success: true }
  }

  function createBooking(data) {
    const validation = validateAvailability(data)

    if (!validation.success) {
      return validation
    }

    const room = findRoom(data)

    const newBooking = {
      ...data,
      roomId: room.id,
      roomName: room.name,
      id: crypto.randomUUID(),
    }

    setBookings((previous) => [
      ...previous,
      newBooking,
    ])

    setNotice('Бронювання успішно створено!')

    return {
      success: true,
      booking: newBooking,
    }
  }

  function updateBooking(id, data) {
    const existing = getBookingById(id)

    if (!existing) {
      return {
        success: false,
        error: 'Бронювання не знайдено.',
      }
    }

    const updated = {
      ...existing,
      ...data,
      id: existing.id,
    }

    const validation = validateAvailability(updated, id)

    if (!validation.success) {
      return validation
    }

    const room = findRoom(updated)

    updated.roomId = room.id
    updated.roomName = room.name

    setBookings((previous) =>
      previous.map((booking) =>
        String(booking.id) === String(id)
          ? updated
          : booking
      )
    )

    setNotice('Бронювання успішно оновлено!')

    return {
      success: true,
      booking: updated,
    }
  }

  function deleteBooking(id) {
    const existing = getBookingById(id)

    if (!existing) {
      return {
        success: false,
        error: 'Бронювання не знайдено.',
      }
    }

    setBookings((previous) =>
      previous.filter(
        (booking) => String(booking.id) !== String(id)
      )
    )

    setNotice('Бронювання успішно видалено!')

    return {
      success: true,
    }
  }

  return (
    <BookingsContext.Provider
      value={{
        bookings,
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

export function useBookings() {
  const context = useContext(BookingsContext)

  if (!context) {
    throw new Error(
      'useBookings потрібно використовувати всередині BookingsProvider'
    )
  }

  return context
}
