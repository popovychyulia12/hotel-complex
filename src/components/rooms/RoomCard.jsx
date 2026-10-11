import { Link } from 'react-router'
import { useState } from 'react'
import RoomStatus from './RoomStatus.jsx'
import AppButton from '../ui/AppButton.jsx'

export default function RoomCard({
  room,
  selected = false,
  onSelect,
}) {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const detailsId = `room-${room.id}-details`

  return (
    <article className="room-card">
      <h3>
  <Link to={`/rooms/${room.id}`}>{room.name}</Link>
</h3>

      <p>
        Статус: <RoomStatus status={room.status} />
      </p>

      <AppButton
        variant="secondary"
        aria-expanded={detailsOpen}
        aria-controls={detailsId}
        onClick={() => setDetailsOpen((previous) => !previous)}
      >
        {detailsOpen ? 'Згорнути деталі' : 'Показати деталі'}
      </AppButton>

      <div id={detailsId} hidden={!detailsOpen}>
        <p>Кількість гостей: {room.guests}</p>
        <p>Ціна: {room.price} грн/доба</p>
      </div>

      <AppButton
        aria-pressed={selected}
        onClick={() => onSelect(room.id)}
      >
        {selected ? 'Номер вибрано' : 'Вибрати номер'}
      </AppButton>

      {selected && (
        <p className="selection-note">
          Цей номер вибрано для бронювання.
        </p>
      )}
    </article>
  )
}