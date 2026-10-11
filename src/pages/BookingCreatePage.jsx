
import { Link, useNavigate, useSearchParams } from 'react-router'
import { rooms } from '../data/rooms.js'
import BookingPage from './BookingPage.jsx'
import useRoomSelection from '../hooks/useRoomSelection.js'

export default function BookingCreatePage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { clearSelection } = useRoomSelection()

  const roomId = searchParams.get('roomId')

  const room = rooms.find(
    (item) => String(item.id) === roomId
  )

  function handleCancel() {
    clearSelection()
    navigate('/rooms')
  }

  if (!roomId) {
    return (
      <section>
        <h1>Створення бронювання</h1>
        <p>Спочатку виберіть номер для бронювання.</p>
        <Link to="/rooms">Переглянути номери</Link>
      </section>
    )
  }

  if (!room) {
    return (
      <section>
        <h1>Номер не знайдено</h1>
        <p>Вибраного номера не існує.</p>
        <Link to="/rooms">Повернутися до каталогу</Link>
      </section>
    )
  }

  if (room.status !== 'Доступний') {
    return (
      <section>
        <h1>Номер недоступний</h1>
        <p>Цей номер наразі не можна забронювати.</p>
        <Link to="/rooms">Вибрати інший номер</Link>
      </section>
    )
  }

  return (
    <BookingPage
      key={room.id}
      room={room}
      title="Створення бронювання"
      onCancel={handleCancel}
      cancelLabel="Повернутися до номерів"
    />
  )
}
