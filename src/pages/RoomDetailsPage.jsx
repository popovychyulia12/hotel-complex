
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Users,
  BedDouble,
  CalendarDays,
  ShieldCheck,
  Image as ImageIcon,
} from 'lucide-react'

import { rooms } from '../data/rooms.js'
import useRoomSelection from '../hooks/useRoomSelection.js'
import './RoomDetailsPage.css'

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

  const [activeImage, setActiveImage] = useState(0)

  const room = rooms.find(
    (item) => String(item.id) === roomId
  )

  if (!room) {
    return (
      <div className="room-detail-page">
        <section className="room-detail-not-found">
          <span className="room-detail-kicker">
            HOTEL & WELLNESS / ROOMS
          </span>

          <h1>Номер не знайдено.</h1>

          <p>
            Перевірте адресу або виберіть інший номер
            із нашого каталогу.
          </p>

          <Link to="/rooms" className="room-detail-primary-link">
            <ArrowLeft size={18} />
            Повернутися до номерів
          </Link>
        </section>
      </div>
    )
  }

  const isAvailable = room.status === 'Доступний'
  const amenities = roomAmenities[room.id] || []

  const gallery = room.gallery?.length
    ? room.gallery
    : [room.image]

  const currentImage = gallery[activeImage] || gallery[0]

  function handleBooking() {
    selectRoom(room.id)
    navigate(`/bookings/new?roomId=${room.id}`)
  }

  function showPreviousImage() {
    setActiveImage((previous) =>
      (previous - 1 + gallery.length) % gallery.length
    )
  }

  function showNextImage() {
    setActiveImage((previous) =>
      (previous + 1) % gallery.length
    )
  }

  const formattedPrice = room.price.toLocaleString('uk-UA')

  return (
    <div className="room-detail-page">

      {/* HERO */}

      <section className="room-detail-hero">
        <div className="room-detail-container">
          <Link
            to="/rooms"
            className="room-detail-back-link"
          >
            <ArrowLeft size={18} />
            Усі номери
          </Link>

          <div className="room-detail-hero-heading">
            <div>
              <span className="room-detail-kicker">
                HOTEL & WELLNESS / ROOMS
              </span>

              <h1>
                ВАШ ПРОСТІР
                <br />
                <em>ДЛЯ ВІДПОЧИНКУ.</em>
              </h1>

              <p>
                Продумані деталі, затишна атмосфера
                та комфорт, який відчувається з першої миті.
              </p>
            </div>

            <div className="room-detail-hero-number">
              <span>ОБРАНА КАТЕГОРІЯ</span>
              <strong>{room.name}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ROOM INTRO */}

      <section className="room-detail-intro">
        <div className="room-detail-container">
          <div className="room-detail-intro-heading">
            <div>
              <span className="room-detail-kicker">
                01 / ВАШ НОМЕР
              </span>

              <h2>
                Номер <em>«{room.name}»</em>
              </h2>

              <p>{room.description}</p>
            </div>

            <div className="room-detail-intro-price">
              <span>Вартість проживання</span>
              <strong>{formattedPrice} грн</strong>
              <small>за одну ніч</small>
            </div>
          </div>

          {/* GALLERY */}

          <div className="room-detail-gallery">
            <div className="room-detail-gallery-main">
              <img
                src={currentImage}
                alt={`Фото номера ${room.name}`}
                className="room-detail-main-photo"
              />

              <div className="room-detail-gallery-label">
                <ImageIcon size={16} />
                ФОТО НОМЕРА
              </div>

              {gallery.length > 1 && (
                <div className="room-detail-gallery-controls">
                  <button
                    type="button"
                    onClick={showPreviousImage}
                    aria-label="Попереднє фото"
                  >
                    <ChevronLeft size={22} />
                  </button>

                  <button
                    type="button"
                    onClick={showNextImage}
                    aria-label="Наступне фото"
                  >
                    <ChevronRight size={22} />
                  </button>
                </div>
              )}

              <div className="room-detail-gallery-counter">
                {String(
                  Math.min(activeImage + 1, gallery.length)
                ).padStart(2, '0')}
                <span>/</span>
                {String(gallery.length).padStart(2, '0')}
              </div>
            </div>

            {gallery.length > 1 && (
              <div className="room-detail-gallery-thumbnails">
                {gallery.map((photo, index) => (
                  <button
                    type="button"
                    key={`${photo}-${index}`}
                    className={`room-detail-thumbnail ${
                      activeImage === index ? 'is-active' : ''
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
            )}
          </div>
        </div>
      </section>

      {/* DESCRIPTION + BOOKING */}

      <section className="room-detail-content">
        <div className="room-detail-container">
          <div className="room-detail-layout">

            {/* LEFT */}

            <div className="room-detail-main-content">

              <section className="room-detail-description">
                <span className="room-detail-kicker">
                  02 / ПРО НОМЕР
                </span>

                <h2>
                  Комфорт у <em>кожній деталі.</em>
                </h2>

                <p>
                  {room.description} Ми подбали про атмосферу,
                  у якій приємно починати ранок і
                  завершувати день.
                </p>

                <div className="room-detail-feature-grid">
                  <div className="room-detail-feature">
                    <span className="room-detail-feature-icon">
                      <Users size={24} />
                    </span>

                    <strong>{room.guests}</strong>
                    <span>Максимум гостей</span>
                  </div>

                  <div className="room-detail-feature">
                    <span className="room-detail-feature-icon">
                      <CalendarDays size={24} />
                    </span>

                    <strong>24/7</strong>
                    <span>Онлайн-бронювання</span>
                  </div>

                  <div className="room-detail-feature">
                    <span className="room-detail-feature-icon">
                      <ShieldCheck size={24} />
                    </span>

                    <strong
                      className="room-detail-status-text"
                    >
                      {room.status}
                    </strong>

                    <span>Статус номера</span>
                  </div>
                </div>
              </section>

              {/* AMENITIES */}

              <section className="room-detail-amenities-section">
                <span className="room-detail-kicker">
                  03 / ЗРУЧНОСТІ
                </span>

                <h2>
                  Усе для вашого <em>комфорту.</em>
                </h2>

                <p>
                  У номері передбачено все необхідне
                  для приємного та безтурботного проживання.
                </p>

                {amenities.length > 0 ? (
                  <ul className="room-detail-amenities">
                    {amenities.map((amenity) => (
                      <li key={amenity}>
                        <span className="room-detail-amenity-icon">
                          <Check size={17} />
                        </span>

                        {amenity}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="room-detail-amenities-empty">
                    Детальний перелік зручностей
                    уточнюється.
                  </p>
                )}
              </section>
            </div>

            {/* BOOKING CARD */}

            <aside className="room-detail-booking-card">
              <span className="room-detail-kicker">
                04 / БРОНЮВАННЯ
              </span>

              <h2>
                Час планувати
                <br />
                <em>відпочинок.</em>
              </h2>

              <p>
                Оберіть зручні дати та оформіть
                бронювання всього за кілька хвилин.
              </p>

              <div className="room-detail-booking-price">
                <span>Вартість за ніч</span>

                <strong>
                  {formattedPrice} грн
                </strong>

                <small>
                  за одну ніч проживання
                </small>
              </div>

              <div className="room-detail-booking-info">
                <div>
                  <BedDouble size={19} />
                  <span>{room.name}</span>
                </div>

                <div>
                  <Users size={19} />
                  <span>До {room.guests} гостей</span>
                </div>

                <div>
                  <ShieldCheck size={19} />
                  <span>{room.status}</span>
                </div>
              </div>

              {isAvailable ? (
                <button
                  type="button"
                  className="room-detail-book-button"
                  onClick={handleBooking}
                >
                  Забронювати номер
                  <ArrowUpRight size={20} />
                </button>
              ) : (
                <p className="room-detail-unavailable">
                  Наразі номер недоступний
                  для бронювання.
                </p>
              )}

              <Link
                to="/rooms"
                className="room-detail-other-rooms"
              >
                <ArrowLeft size={17} />
                Переглянути інші номери
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
