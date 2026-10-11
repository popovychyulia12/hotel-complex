
import { Link, useNavigate, useParams } from 'react-router'
import { bookings } from '../data/bookings.js'
import { rooms } from '../data/rooms.js'
import BookingPage from './BookingPage.jsx'

export default function BookingEditPage() {
  const { bookingId } = useParams()
  const navigate = useNavigate()

  const booking = bookings.find(
    (item) => String(item.id) === bookingId
  )

  if (!booking) {
    return (
      <section>
        <h1>Бронювання не знайдено</h1>
        <p>Перевірте адресу або виберіть інше бронювання.</p>
        <Link to="/bookings">Повернутися до бронювань</Link>
      </section>
    )
  }

  const room = rooms.find(
    (item) => item.id === booking.roomId
  )

  if (!room) {
    return (
      <section>
        <h1>Номер не знайдено</h1>
        <p>Для цього бронювання не вдалося знайти номер.</p>
        <Link to="/bookings">Повернутися до бронювань</Link>
      </section>
    )
  }

  const initialDraft = {
    guestName: booking.guestName,
    comment: booking.comment,
    needsHelp: booking.needsHelp,
  }

  return (
    <BookingPage
      key={booking.id}
      room={room}
      title={`Редагування бронювання №${booking.id}`}
      initialDraft={initialDraft}
      onCancel={() => navigate('/bookings')}
      cancelLabel="Повернутися до бронювань"
    />
  )
}
