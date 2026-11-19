
import { useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import {
  ArrowLeft, ArrowUpRight, CalendarDays, Users,
  UserRound, Phone, Moon, MessageSquare,
  Headphones, Pencil, Trash2, BedDouble, CheckCircle2,
} from 'lucide-react'
import { useBookings } from '../contexts/useBookings.js'
import { rooms } from '../data/rooms.js'
import './BookingDetailsPage.css'

const formatPrice = (value) =>
  `${value.toLocaleString('uk-UA')} грн`

const getNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0

  return Math.round(
    (new Date(`${checkOut}T00:00:00`) -
      new Date(`${checkIn}T00:00:00`)) / 86400000
  )
}

function InfoItem({ label, value, icon: Icon }) {
  return (
    <div className="booking-detail-info-item">
      <span>{label}</span>
      <strong>
        {Icon && <Icon size={16} />}
        {value}
      </strong>
    </div>
  )
}

function InfoSection({ icon: Icon, title, children }) {
  return (
    <div className="booking-detail-info-section">
      <div className="booking-detail-info-section-title">
        <span className="booking-detail-icon">
          <Icon size={20} />
        </span>
        <h3>{title}</h3>
      </div>
      {children}
    </div>
  )
}

export default function BookingDetailsPage() {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const { getBookingById, deleteBooking } = useBookings()

  const [isDeleting, setIsDeleting] = useState(false)
  const deletingRef = useRef(false)
  const booking = getBookingById(bookingId)

  async function handleCancelBooking() {
    if (deletingRef.current || !booking) return

    if (!window.confirm(
      'Ви впевнені, що хочете скасувати це бронювання?'
    )) return

    deletingRef.current = true
    setIsDeleting(true)

    try {
      const result = await deleteBooking(booking.id)

      if (result.success) {
        navigate('/bookings')
      } else {
        window.alert(
          result.error || 'Не вдалося скасувати бронювання.'
        )
      }
    } catch (error) {
      window.alert(
        error?.message || 'Сталася помилка під час видалення.'
      )
    } finally {
      deletingRef.current = false
      setIsDeleting(false)
    }
  }

  if (!booking) {
    return (
      <div className="booking-detail-page">
        <section className="booking-detail-not-found">
          <span className="booking-detail-eyebrow">
            HOTEL & WELLNESS / RESERVATION
          </span>

          <h1>Бронювання не знайдено.</h1>

          <p>
            Можливо, його було скасовано або адреса
            неправильна.
          </p>

          <Link
            to="/bookings"
            className="booking-detail-primary-button"
          >
            <ArrowLeft size={18} />
            Повернутися до моїх бронювань
          </Link>
        </section>
      </div>
    )
  }

  const room = rooms.find(
    (item) => String(item.id) === String(booking.roomId)
  )

  const nights = getNights(booking.checkIn, booking.checkOut)
  const totalPrice = room && nights > 0
    ? room.price * nights
    : null

  const displayedNights = nights > 0 ? nights : 'Не вказано'
  const displayedPrice = room
    ? formatPrice(room.price)
    : 'Не визначено'

  return (
    <div className="booking-detail-page">

      {/* HERO */}
      <section className="booking-detail-hero">
        <div className="booking-detail-container">
          <Link to="/bookings" className="booking-detail-back">
            <ArrowLeft size={18} />
            Мої бронювання
          </Link>

          <span className="booking-detail-eyebrow">
            HOTEL & WELLNESS / MY RESERVATION
          </span>

          <h1>
            ДЕТАЛІ ВАШОГО
            <br />
            <em>БРОНЮВАННЯ.</em>
          </h1>

          <p>
            Уся інформація про ваш запланований
            відпочинок в одному місці.
          </p>
        </div>
      </section>

      {/* MAIN */}
      <section className="booking-detail-content">
        <div className="booking-detail-container">
          <div className="booking-detail-section-title">
            <div>
              <span className="booking-detail-eyebrow">
                01 / ВАШ ВІДПОЧИНОК
              </span>

              <h2>
                Усе <em>готово.</em>
              </h2>

              <p>
                Перегляньте інформацію про номер
                та деталі вашого проживання.
              </p>
            </div>

            <div className="booking-detail-confirmed">
              <CheckCircle2 size={19} />
              Деталі бронювання
            </div>
          </div>

          <div className="booking-detail-grid">

            {/* LEFT COLUMN */}
            <aside className="booking-detail-sidebar">
              <article className="booking-detail-room-card">
                {room?.image ? (
                  <div className="booking-detail-room-image">
                    <img
                      src={room.image}
                      alt={`Номер ${room.name}`}
                      loading="lazy"
                      decoding="async"
                    />

                    <span className="booking-detail-image-tag">
                      ВАШ НОМЕР
                    </span>
                  </div>
                ) : (
                  <div className="booking-detail-room-placeholder">
                    <BedDouble size={58} />
                  </div>
                )}

                <div className="booking-detail-room-info">
                  <span className="booking-detail-eyebrow">
                    ОБРАНА КАТЕГОРІЯ
                  </span>

                  <h3>
                    {room
                      ? room.name
                      : booking.roomName || 'Номер не знайдено'}
                  </h3>

                  {room?.description && (
                    <p className="booking-detail-room-description">
                      {room.description}
                    </p>
                  )}

                  {room && (
                    <>
                      <div className="booking-detail-room-features">
                        <span>
                          <Users size={17} />
                          До {room.guests} гостей
                        </span>

                        <span>
                          <BedDouble size={17} />
                          Готельний номер
                        </span>
                      </div>

                      <div className="booking-detail-night-price">
                        <span>Вартість за ніч</span>
                        <strong>{formatPrice(room.price)}</strong>
                      </div>
                    </>
                  )}
                </div>
              </article>

              {/* PRICE */}
              <div className="booking-detail-price-card">
                <span className="booking-detail-eyebrow">
                  03 / ВАРТІСТЬ
                </span>

                <h3>Ваш розрахунок</h3>

                <div className="booking-detail-price-rows">
                  <div>
                    <span>Кількість ночей</span>
                    <strong>{displayedNights}</strong>
                  </div>

                  <div>
                    <span>Ціна за ніч</span>
                    <strong>{displayedPrice}</strong>
                  </div>
                </div>

                <div className="booking-detail-price-total">
                  <span>Загальна вартість</span>

                  <strong>
                    {totalPrice !== null
                      ? formatPrice(totalPrice)
                      : 'Не визначено'}
                  </strong>

                  {totalPrice !== null && (
                    <small>
                      Розрахунок за {nights} ночей проживання
                    </small>
                  )}
                </div>
              </div>
            </aside>

            {/* RIGHT COLUMN */}
            <div className="booking-detail-information">
              <div className="booking-detail-information-heading">
                <span className="booking-detail-eyebrow">
                  02 / ІНФОРМАЦІЯ
                </span>

                <h2>Деталі проживання</h2>
                <p>Основна інформація про ваше бронювання.</p>
              </div>

              {/* GUEST */}
              <InfoSection icon={UserRound} title="Контактні дані">
                <div className="booking-detail-info-grid">
                  <InfoItem
                    label="Ім’я гостя"
                    value={booking.guestName || 'Не вказано'}
                  />
                  <InfoItem
                    icon={Phone}
                    label="Номер телефону"
                    value={booking.phone || 'Не вказано'}
                  />
                </div>
              </InfoSection>

              {/* DATES */}
              <InfoSection icon={CalendarDays} title="Дати проживання">
                <div className="booking-detail-info-grid">
                  <InfoItem
                    icon={CalendarDays}
                    label="Дата заїзду"
                    value={booking.checkIn || 'Не вказано'}
                  />
                  <InfoItem
                    icon={CalendarDays}
                    label="Дата виїзду"
                    value={booking.checkOut || 'Не вказано'}
                  />
                  <InfoItem
                    icon={Users}
                    label="Кількість гостей"
                    value={booking.guestsCount || 'Не вказано'}
                  />
                  <InfoItem
                    icon={Moon}
                    label="Кількість ночей"
                    value={displayedNights}
                  />
                </div>
              </InfoSection>

              {/* ADDITIONAL */}
              <InfoSection icon={MessageSquare} title="Додаткова інформація">
                <div className="booking-detail-additional">
                  <div>
                    <MessageSquare size={19} />
                    <div>
                      <span>Коментар до бронювання</span>
                      <strong>{booking.comment || 'Немає'}</strong>
                    </div>
                  </div>

                  <div>
                    <Headphones size={19} />
                    <div>
                      <span>Допомога адміністратора</span>
                      <strong>
                        {booking.needsHelp ? 'Потрібна' : 'Не потрібна'}
                      </strong>
                    </div>
                  </div>
                </div>
              </InfoSection>

              {/* ACTIONS */}
              <div className="booking-detail-actions">
                <Link
                  to={`/bookings/${booking.id}/edit`}
                  className="booking-detail-primary-button"
                >
                  <Pencil size={18} />
                  Змінити бронювання
                  <ArrowUpRight size={17} />
                </Link>

                <button
                  type="button"
                  className="booking-detail-delete-button"
                  onClick={handleCancelBooking}
                  disabled={isDeleting}
                >
                  <Trash2 size={18} />
                  {isDeleting
                    ? 'Скасовуємо...'
                    : 'Скасувати бронювання'}
                </button>
              </div>

              <Link
                to="/bookings"
                className="booking-detail-bottom-back"
              >
                <ArrowLeft size={17} />
                Повернутися до моїх бронювань
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
