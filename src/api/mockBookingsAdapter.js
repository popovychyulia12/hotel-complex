
import { bookings as initialBookings } from '../data/bookings.js'

const STORAGE_KEY = 'hotel-complex-bookings'
const DELAY_MS = 700

// Помилки, які можна викликати один раз для тестування
const pendingFailures = new Set()

function delay(ms = DELAY_MS) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

function readBookings() {
  const saved = localStorage.getItem(STORAGE_KEY)

  // null означає, що сховище ще не ініціалізовано.
  // Порожній масив [] — це вже збережений результат.
  if (saved === null) {
    const initial = structuredClone(initialBookings)

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(initial)
    )

    return initial
  }

  const parsed = JSON.parse(saved)

  if (!Array.isArray(parsed)) {
    throw new Error('Некоректний формат збережених бронювань.')
  }

  return parsed
}

function writeBookings(bookings) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(bookings)
  )
}

async function simulateOperation(operation) {
  await delay()

  if (pendingFailures.has(operation)) {
    pendingFailures.delete(operation)

    throw new Error(
      `Імітована помилка операції ${operation}. Спробуйте ще раз.`
    )
  }
}

function findById(bookings, id) {
  return bookings.find(
    (booking) => String(booking.id) === String(id)
  )
}

// Послідовне виконання операцій запису
let writeQueue = Promise.resolve()

function enqueueWrite(operation) {
  const result = writeQueue.then(operation)

  // Помилка однієї операції не блокує наступні
  writeQueue = result.catch(() => {})

  return result
}

export const mockBookingsAdapter = {
  // 1. Отримати всі бронювання
  async getAll() {
    await simulateOperation('getAll')

    return structuredClone(readBookings())
  },

  // 2. Отримати бронювання за ID
  
async getById(id, options = {}) {
  const delayMs = options.delayMs ?? 700

  await delay(delayMs)

  if (pendingFailures.has('getById')) {
    pendingFailures.delete('getById')

    throw new Error(
      'Імітована помилка операції getById. Спробуйте ще раз.'
    )
  }

  const booking = findById(readBookings(), id)

  return booking ? structuredClone(booking) : null
},


  // 3. Створити бронювання
  create(data) {
    return enqueueWrite(async () => {
      await simulateOperation('create')

      const bookings = readBookings()

      const newBooking = {
        ...structuredClone(data),
        id: crypto.randomUUID(),
      }

      writeBookings([...bookings, newBooking])

      return structuredClone(newBooking)
    })
  },

  // 4. Оновити бронювання
  update(id, data) {
    return enqueueWrite(async () => {
      await simulateOperation('update')

      const bookings = readBookings()
      const existing = findById(bookings, id)

      if (!existing) {
        throw new Error('Бронювання не знайдено.')
      }

      const updated = {
        ...existing,
        ...structuredClone(data),
        id: existing.id,
      }

      const nextBookings = bookings.map((booking) =>
        String(booking.id) === String(id)
          ? updated
          : booking
      )

      writeBookings(nextBookings)

      return structuredClone(updated)
    })
  },

  // 5. Видалити бронювання
  delete(id) {
    return enqueueWrite(async () => {
      await simulateOperation('delete')

      const bookings = readBookings()
      const existing = findById(bookings, id)

      if (!existing) {
        throw new Error('Бронювання не знайдено.')
      }

      writeBookings(
        bookings.filter(
          (booking) => String(booking.id) !== String(id)
        )
      )

      return { success: true, id: existing.id }
    })
  },
}

// Увімкнути одноразову помилку для конкретної операції
export function failNextMockOperation(operation) {
  const allowedOperations = [
    'getAll',
    'getById',
    'create',
    'update',
    'delete',
  ]

  if (!allowedOperations.includes(operation)) {
    throw new Error(`Невідома операція: ${operation}`)
  }

  pendingFailures.add(operation)
}

// Очистити заплановані тестові помилки
export function clearMockFailures() {
  pendingFailures.clear()
}
