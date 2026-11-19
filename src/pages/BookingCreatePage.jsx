
import { Link, useNavigate, useSearchParams } from 'react-router'
import { rooms } from '../data/rooms.js'
import { useBookings } from '../contexts/useBookings.js'
import BookingPage from './BookingPage.jsx'
import useRoomSelection from '../hooks/useRoomSelection.js'

export default function BookingCreatePage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const { clearSelection } = useRoomSelection()
  const {
  createBooking
} = useBookings()

  const roomId = searchParams.get('roomId')

  // Кількість ночей, вибрана в конструкторі
  const nightsParam = Number(searchParams.get('nights'))

  const selectedNights =
    Number.isInteger(nightsParam) &&
    nightsParam >= 1 &&
    nightsParam <= 30
      ? nightsParam
      : null

  const room = rooms.find(
    (item) => String(item.id) === roomId
  )

  function handleCancel() {
    clearSelection()
    navigate('/rooms')
  }

  async function handleSave(draft) {
    if (!room) {
      return {
        success: false,
        error: 'Категорію номера не знайдено.',
      }
    }

    const result = await createBooking({
      ...draft,
      roomId: room.id,
      roomName: room.name,
      guestsCount: Number(draft.guestsCount),
      guestName: draft.guestName.trim(),
phone: draft.phone.trim(),
email: draft.email.trim().toLowerCase(),
comment: (draft.comment ?? '').trim(),
    })

    if (result.success) {
      clearSelection()
      navigate('/bookings')
    }

    return result
  }

  if (!roomId) {
    return (
      <section>
        <h1>Створення бронювання</h1>
        <p>Спочатку виберіть категорію номера.</p>
        <Link to="/rooms">
          Переглянути номери
        </Link>
      </section>
    )
  }

  if (!room) {
    return (
      <section>
        <h1>Категорію не знайдено</h1>
        <p>Вибраної категорії номера не існує.</p>
        <Link to="/rooms">
          Повернутися до каталогу
        </Link>
      </section>
    )
  }

  
return (
  <>
   

    <BookingPage
      key={`${room.id}-${selectedNights ?? 'default'}`}
      room={room}
      title="Створення бронювання"
      selectedNights={selectedNights}
      onSave={handleSave}
      onCancel={handleCancel}
      cancelLabel="Повернутися до номерів"
    />
  </>
)
}

