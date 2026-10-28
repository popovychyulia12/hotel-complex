
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { rooms } from '../data/rooms.js'
import useRoomSelection from '../hooks/useRoomSelection.js'

const roomAmenities = {
  1: [
    'Безкоштовний Wi-Fi',
    'Кондиціонер',
    'Телевізор',
    'Власна ванна кімната',
    'Зручне двоспальне ліжко',
    'Рушники та косметичні засоби',
  ],
  2: [
    'Безкоштовний Wi-Fi',
    'Кондиціонер',
    'Велике двоспальне ліжко',
    'Простора зона відпочинку',
    'Телевізор',
    'Мінібар',
    'Власна ванна кімната',
    'Халати та косметичні засоби',
  ],
  3: [
    'Безкоштовний Wi-Fi',
    'Кондиціонер',
    'Сімейні спальні місця',
    'Телевізор',
    'Простора ванна кімната',
    'Зона відпочинку',
    'Рушники та косметичні засоби',
    'Місце для зберігання речей',
  ],
}

export default function RoomDetailsPage() {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const { selectRoom } = useRoomSelection()

  // Активна фотографія галереї
  const [activeImage, setActiveImage] = useState(0)

  // Шукаємо номер за його ID
  const room = rooms.find(
    (item) => String(item.id) === roomId
  )

  // Якщо номера не існує
  if (!room) {
    return (
      <section className="room-details">
        <h1>Номер не знайдено</h1>

        <p>
          Перевірте адресу або виберіть номер із каталогу.
        </p>

        <Link to="/rooms">
          Повернутися до номерів
        </Link>
      </section>
    )
  }

  const isAvailable = room.status === 'Доступний'
  const amenities = roomAmenities[room.id] || []

  // Фотографії номера
  const gallery = room.gallery?.length
    ? room.gallery
    : [room.image]

  // Вибрана фотографія
  const currentImage = gallery[activeImage] || gallery[0]

  // Перехід до бронювання
  function handleBooking() {
    selectRoom(room.id)
    navigate(`/bookings/new?roomId=${room.id}`)
  }

  return (
    <main className="room-details-page">

      {/* Навігація */}

      <div className="room-details-breadcrumb">
        <Link to="/rooms">Номери</Link>
        <span> / </span>
        <span>{room.name}</span>
      </div>

      {/* Заголовок номера */}

      <div className="room-details-heading">
        <div>
          <span className="room-details-eyebrow">
            ВАШ ІДЕАЛЬНИЙ ВІДПОЧИНОК
          </span>

          <h1>Номер «{room.name}»</h1>

          <p>{room.description}</p>
        </div>

        <div className="room-details-price">
          <strong>
            {room.price.toLocaleString('uk-UA')} грн
          </strong>

          <span>за ніч</span>
        </div>
      </div>

      {/* Галерея фотографій */}

      <div className="room-details-gallery">

        <div className="room-gallery-photos">

          {/* Велика фотографія */}

          <img
            src={currentImage}
            alt={`Фото номера ${room.name}`}
            className="room-details-main-image"
          />

          {/* Маленькі фотографії */}

          <div className="room-gallery-thumbnails">
            {gallery.map((photo, index) => (
              <button
                type="button"
                key={`${photo}-${index}`}
                className={`room-gallery-thumbnail ${
                  activeImage === index ? 'active' : ''
                }`}
                onClick={() => setActiveImage(index)}
                aria-label={`Показати фото ${index + 1}`}
                aria-pressed={activeImage === index}
              >
                <img
                  src={photo}
                  alt={`Мініатюра номера ${room.name}, фото ${index + 1}`}
                />
              </button>
            ))}
          </div>

        </div>

        {/* Текст біля галереї */}

        <div className="room-details-gallery-info">
          <span>ГОТЕЛЬНИЙ КОМПЛЕКС</span>

          <h2>Комфорт у кожній деталі</h2>

          <p>
            Простір, де можна відпочити від щоденних
            турбот, насолодитися затишком і присвятити
            час собі та близьким.
          </p>
        </div>

      </div>

      {/* Інформація про номер */}

      <div className="room-details-layout">

        <div className="room-details-content">

          {/* Опис */}

          <section className="room-details-section">
            <span className="room-details-eyebrow">
              ПРО НОМЕР
            </span>

            <h2>Ваш простір для відпочинку</h2>

            <p>
              {room.description} Ми подбали про атмосферу,
              у якій приємно починати ранок і завершувати день.
            </p>

            <div className="room-details-features">

              <div>
                <strong>{room.guests}</strong>
                <span>Максимум гостей</span>
              </div>

              <div>
                <strong>24/7</strong>
                <span>Онлайн-бронювання</span>
              </div>

              <div>
                <strong>{room.status}</strong>
                <span>Статус номера</span>
              </div>

            </div>
          </section>

          {/* Зручності */}

          <section className="room-details-section">
            <span className="room-details-eyebrow">
              ДЛЯ ВАШОГО КОМФОРТУ
            </span>

            <h2>Зручності номера</h2>

            <ul className="room-amenities">
              {amenities.map((amenity) => (
                <li key={amenity}>
                  <span className="amenity-check">
                    ✓
                  </span>

                  {amenity}
                </li>
              ))}
            </ul>
          </section>

        </div>

        {/* Блок бронювання */}

        <aside className="room-details-booking">

          <span className="room-details-eyebrow">
            ПЛАНУЙТЕ СВІЙ ВІДПОЧИНОК
          </span>

          <h2>Забронюйте свій номер</h2>

          <p>
            Оберіть зручні дати та оформіть бронювання
            за кілька хвилин.
          </p>

          <div className="room-booking-price">
            <strong>
              {room.price.toLocaleString('uk-UA')} грн
            </strong>

            <span>/ ніч</span>
          </div>

          {isAvailable ? (
            <button
              type="button"
              className="room-details-book-button"
              onClick={handleBooking}
            >
              Забронювати номер
            </button>
          ) : (
            <p className="room-details-unavailable">
              Наразі номер недоступний для бронювання.
            </p>
          )}

          <Link
            to="/rooms"
            className="room-details-back-link"
          >
            Переглянути інші номери
          </Link>

        </aside>

      </div>

    </main>
  )
}
