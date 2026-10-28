
import { Link, useNavigate, useParams } from 'react-router'
import { useBookings } from '../contexts/BookingsContext.jsx'
import { rooms } from '../data/rooms.js'
import BookingPage from './BookingPage.jsx'

export default function BookingEditPage() {
  const { bookingId } = useParams()
  const navigate = useNavigate()

  const {
    getBookingById,
    updateBooking,
    loading,
    error,
    retry,
  } = useBookings()

  const booking = getBookingById(bookingId)

  if (loading) {
    return (
      <section role="status">
        <h1>Завантаження бронювання...</h1>
        <p>Зачекайте, отримуємо дані.</p>
      </section>
    )
  }

  if (error) {
    return (
      <section role="alert">
        <h1>Не вдалося завантажити бронювання</h1>
        <p>{error}</p>
        <button type="button" onClick={retry}>
          Спробувати ще раз
        </button>
      </section>
    )
  }

  if (!booking) {
    return (
      <section>
        <h1>Бронювання не знайдено</h1>
        <p>Перевірте адресу або виберіть інше бронювання.</p>
        <Link to="/bookings">
          Повернутися до бронювань
        </Link>
      </section>
    )
  }

  const room = rooms.find(
    (item) =>
      String(item.id) === String(booking.roomId) ||
      item.name === booking.roomName ||
      (item.id === 1 && booking.roomName === 'Стандарт')
  )

  if (!room) {
    return (
      <section>
        <h1>Категорію номера не знайдено</h1>
        <p>
          Для цього бронювання не вдалося знайти
          відповідну категорію номера.
        </p>
        <Link to="/bookings">
          Повернутися до бронювань
        </Link>
      </section>
    )
  }

  const initialDraft = {
    guestName: booking.guestName ?? '',
    phone: booking.phone ?? '',
    checkIn: booking.checkIn ?? '',
    checkOut: booking.checkOut ?? '',
    guestsCount: String(booking.guestsCount ?? 1),
    comment: booking.comment ?? '',
    needsHelp: booking.needsHelp ?? false,
  }

  async function handleSave(draft) {
    const result = await updateBooking(booking.id, {
      ...draft,
      roomId: room.id,
      roomName: room.name,
      guestName: draft.guestName.trim(),
      phone: draft.phone.trim(),
      guestsCount: Number(draft.guestsCount),
      comment: (draft.comment ?? '').trim(),
    })

    if (result.success) {
      navigate('/bookings')
    }

    return result
  }

  
return (
  <>

    <BookingPage
      key={booking.id}
      bookingId={booking.id}
      room={room}
      title="Редагування бронювання"
      initialDraft={initialDraft}
      onSave={handleSave}
      onCancel={() => navigate('/bookings')}
      cancelLabel="Повернутися до бронювань"
    />
  </>
)
}

