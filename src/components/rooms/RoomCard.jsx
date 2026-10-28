
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
  const isAvailable = room.status === 'Доступний'

  return (
    <article className="room-card">
      <Link
        to={`/rooms/${room.id}`}
        className="room-image-link"
        aria-label={`Переглянути номер ${room.name}`}
      >
        <img
          src={room.image}
          alt={`Інтер'єр номера ${room.name}`}
          className="room-image"
          loading="lazy"
        />
      </Link>

      <div className="room-card-content">
        <div className="room-card-top">
          <span className="room-category">
            ГОТЕЛЬНИЙ НОМЕР
          </span>

          <p className="room-status">
            <RoomStatus status={room.status} />
          </p>
        </div>

        <h3>
          <Link to={`/rooms/${room.id}`}>
            {room.name}
          </Link>
        </h3>

        <p className="room-description">
          {room.description}
        </p>

        <p className="room-guests">
          До {room.guests} гостей
        </p>

        <div className="room-price">
          <strong>
            {room.price.toLocaleString('uk-UA')} грн
          </strong>
          <span> / ніч</span>
        </div>

        <AppButton
          variant="secondary"
          aria-expanded={detailsOpen}
          aria-controls={detailsId}
          onClick={() => setDetailsOpen((previous) => !previous)}
        >
          {detailsOpen ? 'Згорнути деталі' : 'Детальніше'}
        </AppButton>

        <div id={detailsId} hidden={!detailsOpen}>
          <p>Кількість гостей: {room.guests}</p>
          <p>Вартість за ніч: {room.price} грн</p>
        </div>

        {isAvailable ? (
          <div className="room-actions">
            <Link
              to={`/bookings/new?roomId=${room.id}`}
              className="booking-button"
            >
              Забронювати
            </Link>

            <AppButton
              variant="secondary"
              aria-pressed={selected}
              onClick={() => onSelect(room.id)}
            >
              {selected ? 'Номер вибрано' : 'Вибрати номер'}
            </AppButton>
          </div>
        ) : (
          <p className="room-unavailable">
            Наразі недоступний
          </p>
        )}
      </div>
    </article>
  )
}
