
import { Link, useNavigate, useParams } from 'react-router'
import { useBookings } from '../contexts/useBookings.js'
import { rooms } from '../data/rooms.js'
import { useRef, useState } from 'react'

export default function BookingDetailsPage() {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const [isDeleting, setIsDeleting] = useState(false)
const deletingRef = useRef(false)

  const { getBookingById, deleteBooking } = useBookings()

  const booking = getBookingById(bookingId)

  if (!booking) {
    return (
      <section>
        <h2>Бронювання не знайдено</h2>
        <p>Можливо, його було скасовано або адреса неправильна.</p>
        <Link to="/bookings">Повернутися до моїх бронювань</Link>
      </section>
    )
  }

  const room = rooms.find(
    (item) => String(item.id) === String(booking.roomId)
  )

  const nights =
    booking.checkIn && booking.checkOut
      ? Math.round(
          (new Date(`${booking.checkOut}T00:00:00`) -
            new Date(`${booking.checkIn}T00:00:00`)) /
            (1000 * 60 * 60 * 24)
        )
      : 0

  const totalPrice =
    room && nights > 0 ? room.price * nights : null

  
async function handleCancelBooking() {
  if (deletingRef.current) return

  const confirmed = window.confirm(
    'Ви впевнені, що хочете скасувати це бронювання?'
  )

  if (!confirmed) return

  deletingRef.current = true
  setIsDeleting(true)

  try {
    const result = await deleteBooking(booking.id)

    if (result.success) {
      navigate('/bookings')
    } else {
      window.alert(
        result.error || 'Не вдалося скасувати бронювання.'
      )
    }
  } catch (error) {
    window.alert(
      error?.message || 'Сталася помилка під час видалення.'
    )
  } finally {
    deletingRef.current = false
    setIsDeleting(false)
  }
}

  return (
    <section className="booking-details">
      <Link to="/bookings">← Мої бронювання</Link>

      <h2>Деталі мого бронювання</h2>

      <p>
        Тут зібрана вся інформація про ваш запланований відпочинок.
      </p>

      <div className="booking-details-card">
        <h3>{room ? room.name : 'Номер не знайдено'}</h3>

        <p><strong>Гість:</strong> {booking.guestName}</p>

        <p>
          <strong>Телефон:</strong> {booking.phone || 'Не вказано'}
        </p>

        <p>
          <strong>Дата заїзду:</strong> {booking.checkIn || 'Не вказано'}
        </p>

        <p>
          <strong>Дата виїзду:</strong> {booking.checkOut || 'Не вказано'}
        </p>

        <p>
          <strong>Кількість гостей:</strong> {booking.guestsCount || 'Не вказано'}
        </p>

        <p>
          <strong>Кількість ночей:</strong> {nights > 0 ? nights : 'Не вказано'}
        </p>

        <p>
          <strong>Коментар:</strong> {booking.comment || 'Немає'}
        </p>

        <p>
          <strong>Додаткова допомога:</strong>{' '}
          {booking.needsHelp ? 'Потрібна' : 'Не потрібна'}
        </p>

        {totalPrice !== null && (
          <div className="booking-total">
            <h3>
              Загальна вартість: {totalPrice.toLocaleString('uk-UA')} грн
            </h3>
            <p>Розрахунок за {nights} ночей проживання.</p>
          </div>
        )}
      </div>

      <div className="form-actions">
        <Link to={`/bookings/${booking.id}/edit`}>
          Змінити бронювання
        </Link>

        <button
  type="button"
  onClick={handleCancelBooking}
  disabled={isDeleting}
>
  {isDeleting ? 'Скасовуємо...' : 'Скасувати бронювання'}
</button>
      </div>
    </section>
  )
}
