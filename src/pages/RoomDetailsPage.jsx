
import { Link, useNavigate, useParams } from 'react-router'
import { rooms } from '../data/rooms.js'
import useRoomSelection from '../hooks/useRoomSelection.js'

export default function RoomDetailsPage() {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const { selectRoom } = useRoomSelection()

  const room = rooms.find(
    (item) => String(item.id) === roomId
  )

  if (!room) {
    return (
      <section>
        <h1>Номер не знайдено</h1>
        <p>Перевірте адресу або виберіть номер із каталогу.</p>
        <Link to="/rooms">Повернутися до номерів</Link>
      </section>
    )
  }

  function handleBooking() {
    selectRoom(room.id)
    navigate(`/bookings/new?roomId=${room.id}`)
  }

  return (
    <section className="room-details">
      <h1>{room.name}</h1>

      <p>Ціна за добу: {room.price.toLocaleString('uk-UA')} грн</p>
      <p>Кількість гостей: {room.guests}</p>
      <p>Статус: {room.status}</p>

      {room.status === 'Доступний' ? (
        <button type="button" onClick={handleBooking}>
          Обрати номер і перейти до бронювання
        </button>
      ) : (
        <p>Цей номер наразі недоступний для бронювання.</p>
      )}

      <p>
        <Link to="/rooms">Повернутися до каталогу</Link>
      </p>
    </section>
  )
}
