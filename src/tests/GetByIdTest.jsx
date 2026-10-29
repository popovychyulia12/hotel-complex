
import { useRef, useState } from 'react'
import { useBookings } from '../contexts/useBookings.js'
import { bookingsAdapter } from '../api/bookingsAdapter.js'

export default function GetByIdTest() {
  const { bookings, loading: listLoading } = useBookings()

  const [selectedId, setSelectedId] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const requestVersion = useRef(0)

  async function checkBooking(id, delayMs) {
    const version = ++requestVersion.current

    setSelectedId(String(id))
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const booking = await bookingsAdapter.getById(id, { delayMs })

      // Ігноруємо відповідь застарілого запиту
      if (version !== requestVersion.current) {
        return
      }

      setResult(booking)
    } catch (err) {
      if (version !== requestVersion.current) {
        return
      }

      setError(err.message || 'Помилка отримання бронювання.')
    } finally {
      if (version === requestVersion.current) {
        setLoading(false)
      }
    }
  }

  if (listLoading) {
    return <p role="status">Завантаження бронювань...</p>
  }

  return (
    <section>
      <h1>Дослід getById — лабораторна 3.2</h1>

      <p>
        Натисніть швидко на два різні бронювання.
        На екрані має залишитися тільки результат
        останнього вибраного запиту.
      </p>

      {bookings.length < 2 ? (
        <p>
          Для досліду потрібно щонайменше два бронювання.
        </p>
      ) : (
        <div className="form-actions">
          <button
            type="button"
            onClick={() => checkBooking(bookings[0].id, 3000)}
          >
            Перше бронювання
          </button>

          <button
            type="button"
           onClick={() => checkBooking(bookings[1].id, 700)}
          >
            Друге бронювання
          </button>
        </div>
      )}

      {selectedId && (
        <p>
          <strong>Вибраний ID:</strong> {selectedId}
        </p>
      )}

      {loading && (
        <p role="status">Отримуємо бронювання...</p>
      )}

      {error && <p role="alert">{error}</p>}

      {!loading && selectedId && !error && !result && (
        <p>Бронювання не знайдено.</p>
      )}

      {!loading && result && (
        <div>
          <h2>Отриманий запис</h2>
          <p><strong>ID:</strong> {result.id}</p>
          <p><strong>Гість:</strong> {result.guestName}</p>
          <p><strong>Заїзд:</strong> {result.checkIn}</p>
          <p><strong>Виїзд:</strong> {result.checkOut}</p>
        </div>
      )}
    </section>
  )
}
