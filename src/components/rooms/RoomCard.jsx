
import { memo } from 'react'
import { Link } from 'react-router'
import { ArrowUpRight, Users, Check } from 'lucide-react'
import RoomStatus from './RoomStatus.jsx'

function RoomCard({
  room,
  selected = false,
  onSelect,
}) {
  const isAvailable = room.status === 'Доступний'

  return (
    <article className="room-card">
      <div className="room-card-image">
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
            decoding="async"
          />
        </Link>

        <span className="room-card-number">
          {String(room.id).padStart(2, '0')}
        </span>

        <div className="room-card-image-arrow">
          <ArrowUpRight size={22} />
        </div>
      </div>

      <div className="room-card-content">
        <div className="room-card-top">
          <span className="room-category">
            ГОТЕЛЬНИЙ НОМЕР
          </span>

          <div className="room-status">
            <RoomStatus status={room.status} />
          </div>
        </div>

        <h3>
          <Link to={`/rooms/${room.id}`}>
            {room.name}
          </Link>
        </h3>

        <p className="room-description">
          {room.description}
        </p>

        <div className="room-card-meta">
          <span>
            <Users size={17} />
            До {room.guests} гостей
          </span>

          <span>
            {room.quantity} номерів
          </span>
        </div>

        <div className="room-card-footer">
          <div className="room-price">
            <strong>
              {room.price.toLocaleString('uk-UA')} грн
            </strong>
            <span> / ніч</span>
          </div>

          <Link
            to={`/rooms/${room.id}`}
            className="room-details-link"
          >
            Детальніше
            <ArrowUpRight size={19} />
          </Link>
        </div>

        <div className="room-actions">
          {isAvailable ? (
            <>
              <Link
                to={`/bookings/new?roomId=${room.id}`}
                className="booking-button"
              >
                Забронювати
                <ArrowUpRight size={18} />
              </Link>

              <button
                type="button"
                className={`room-select-button ${
                  selected ? 'is-selected' : ''
                }`}
                aria-pressed={selected}
                onClick={() => onSelect?.(room.id)}
              >
                {selected ? (
                  <>
                    <Check size={17} />
                    Номер вибрано
                  </>
                ) : (
                  'Вибрати номер'
                )}
              </button>
            </>
          ) : (
            <p className="room-unavailable">
              Наразі недоступний для бронювання
            </p>
          )}
        </div>
      </div>
    </article>
  )
}

export default memo(RoomCard)
