
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  AlertCircle,
  Users,
} from 'lucide-react'

import { useBookings } from '../contexts/useBookings.js'
import BookingFormPreview from '../components/booking/BookingFormPreview.jsx'
import BookingSummary from '../components/booking/BookingSummary.jsx'
import './BookingPage.css'

const formatLocalDate = (date) =>
  [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-')

function createPlannerDates(nights) {
  if (!Number.isInteger(nights) || nights < 1) return {}

  const checkIn = new Date()
  const checkOut = new Date(checkIn)
  checkOut.setDate(checkOut.getDate() + nights)

  return {
    checkIn: formatLocalDate(checkIn),
    checkOut: formatLocalDate(checkOut),
  }
}

const createEmptyDraft = () => ({
  guestName: '',
phone: '',
email: '',
checkIn: '',
  checkOut: '',
  guestsCount: '1',
  comment: '',
  needsHelp: false,
})

const createDraft = (nights, initialDraft) => ({
  ...createEmptyDraft(),
  ...createPlannerDates(nights),
  ...(initialDraft ?? {}),
})

function validateBooking(draft, room) {
  const errors = {}
  const guestName = draft.guestName.trim()
  const phone = draft.phone.trim()
  const email = (draft.email ?? '').trim() 
  const today = formatLocalDate(new Date())
  const guests = Number(draft.guestsCount)
  const maxGuests = Number(room?.guests)

  if (guestName.length < 2 || guestName.length > 60) {
    errors.guestName = 'Вкажіть ім’я від 2 до 60 символів.'
  }

  if (!/^\+380\d{9}$/.test(phone)) {
    errors.phone = 'Введіть телефон у форматі +380XXXXXXXXX.'
  }

  if (
  email.length > 254 ||
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
) {
  errors.email = 'Введіть коректну електронну пошту.'
}

  if (!draft.checkIn || draft.checkIn < today) {
    errors.checkIn = 'Оберіть дату заїзду не раніше сьогодні.'
  }

  if (!draft.checkOut || draft.checkOut <= draft.checkIn) {
    errors.checkOut = 'Дата виїзду має бути пізніше заїзду.'
  }

  if (
    !Number.isInteger(guests) ||
    guests < 1 ||
    (maxGuests > 0 && guests > maxGuests)
  ) {
    errors.guestsCount = maxGuests > 0
      ? `Допустима кількість гостей: від 1 до ${maxGuests}.`
      : 'Вкажіть цілу кількість гостей від 1.'
  }

  if (draft.comment.length > 300) {
    errors.comment = 'Максимум 300 символів.'
  }

  return errors
}

export default function BookingPage({
  room,
  selectedNights = null,
  onSave,
  onClearSelection,
  title = 'Підготовка бронювання',
  initialDraft,
  onCancel,
  cancelLabel = 'Скасувати вибір номера',
  bookingId = null,
}) {
  const { getAvailableRooms } = useBookings()

  const [draft, setDraft] = useState(() =>
    createDraft(selectedNights, initialDraft)
  )
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const savingRef = useRef(false)

  const isEditing = title === 'Редагування бронювання'
  const pageTitle = room ? `${title}: ${room.name}` : title
  const handleCancel = onCancel ?? onClearSelection

  useEffect(() => {
    const previousTitle = document.title
    document.title = `Готельний комплекс: ${pageTitle}`

    return () => {
      document.title = previousTitle
    }
  }, [pageTitle])

  const datesValid =
    Boolean(draft.checkIn && draft.checkOut) &&
    draft.checkIn >= formatLocalDate(new Date()) &&
    draft.checkOut > draft.checkIn

  const availableCount = room && datesValid
    ? getAvailableRooms(
        room.id,
        draft.checkIn,
        draft.checkOut,
        bookingId
      )
    : null

  function handleFieldChange(name, value) {
    setDraft((previous) => ({
      ...previous,
      [name]: value,
    }))

    setErrors((previous) => ({
      ...previous,
      [name]: undefined,
    }))

    setMessage('')
  }

  function resetDraft() {
    setDraft(createDraft(selectedNights, initialDraft))
    setErrors({})
    setMessage('')
  }

  async function handleSubmit() {
    if (savingRef.current) return

    const validationErrors = validateBooking(draft, room)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length) {
      setMessage('Перевірте правильність заповнення полів.')
      return
    }

    if (availableCount === 0) {
      setMessage(
        'На вибрані дати всі номери цієї категорії зайняті. Оберіть інші дати.'
      )
      return
    }

    if (!onSave) {
      setMessage('Збереження недоступне.')
      return
    }

    savingRef.current = true
    setIsSaving(true)
    setMessage('Зберігаємо бронювання...')

    try {
      const result = await onSave(draft)

      if (!result?.success) {
        setMessage(
          result?.error || 'Не вдалося зберегти бронювання.'
        )
      }
    } catch (error) {
      setMessage(
        error?.message || 'Сталася помилка під час збереження.'
      )
    } finally {
      savingRef.current = false
      setIsSaving(false)
    }
  }

  if (!room) {
    return (
      <div className="booking-page booking-empty-page">
        <div className="booking-empty-card">
          <span className="booking-kicker">
            HOTEL & WELLNESS
          </span>

          <h1>Номер ще не вибрано.</h1>

          <p>
            Оберіть категорію номера, щоб перейти
            до оформлення бронювання.
          </p>

          <Link to="/rooms" className="booking-empty-link">
            Переглянути номери
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="booking-page">

      {/* HERO */}
      <section className="booking-hero">
        <div className="booking-container">
          <Link
            to={isEditing ? '/bookings' : '/rooms'}
            className="booking-back-link"
          >
            <ArrowLeft size={18} />
            {isEditing
              ? 'До моїх бронювань'
              : 'Повернутися до номерів'}
          </Link>

          <span className="booking-kicker">
            HOTEL & WELLNESS / RESERVATION
          </span>

          <h1>
            {isEditing ? (
              <>
                ЗМІНИТИ
                <br />
                <em>БРОНЮВАННЯ.</em>
              </>
            ) : (
              <>
                ВАШ ІДЕАЛЬНИЙ
                <br />
                <em>ВІДПОЧИНОК.</em>
              </>
            )}
          </h1>

          <p>
            Оберіть дати, заповніть свої дані та
            підтвердьте бронювання.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="booking-content">
        <div className="booking-container">

          <div className="booking-section-heading">
            <span className="booking-kicker">
              01 / ОФОРМЛЕННЯ
            </span>

            <h2>
              Майже все <em>готово.</em>
            </h2>

            <p>
              Перевірте вибраний номер і заповніть форму.
            </p>
          </div>

          <div className="booking-columns">

            {/* SIDEBAR */}
            <aside className="booking-sidebar">
              <article className="booking-selected-room">
                <div className="booking-selected-image">
                  <img
                    src={room.image}
                    alt={`Інтер'єр номера ${room.name}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <span>ОБРАНИЙ НОМЕР</span>
                </div>

                <div className="booking-selected-info">
                  <span className="booking-kicker">
                    ВАШ НОМЕР
                  </span>

                  <h3>{room.name}</h3>
                  <p>{room.description}</p>

                  <div className="booking-room-meta">
                    <span>
                      <Users size={17} />
                      До {room.guests} гостей
                    </span>

                    <span>
                      {room.quantity} номерів у категорії
                    </span>
                  </div>

                  <div className="booking-price-line">
                    <span>Вартість за ніч</span>
                    <strong>
                      {room.price.toLocaleString('uk-UA')} грн
                    </strong>
                  </div>
                </div>
              </article>

              <BookingSummary
                roomName={room.name}
                draft={draft}
              />
            </aside>

            {/* FORM */}
            <div className="booking-form-panel">
              <div className="booking-form-heading">
                <span className="booking-kicker">
                  02 / ОСОБИСТІ ДАНІ
                </span>

                <h2>Дані для бронювання</h2>

                <p>
                  Заповніть обов'язкові поля, позначені
                  зірочкою.
                </p>
              </div>

              <BookingFormPreview
                idPrefix="booking-form"
                roomName={room.name}
                draft={draft}
                errors={errors}
                onFieldChange={handleFieldChange}
                onReset={resetDraft}
                onSubmit={handleSubmit}
                isSaving={isSaving}
                maxGuests={room.guests}
              />

              {/* AVAILABILITY */}
              <div
                className="booking-availability"
                aria-live="polite"
              >
                {!datesValid ? (
                  <div className="booking-availability-neutral">
                    <CalendarDays size={21} />
                    <p>
                      Оберіть коректні дати заїзду та
                      виїзду, щоб перевірити доступність.
                    </p>
                  </div>
                ) : availableCount > 0 ? (
                  <div className="booking-availability-success">
                    <CheckCircle2 size={21} />
                    <p>
                      На вибрані дати доступно номерів:{' '}
                      <strong>{availableCount}</strong>
                    </p>
                  </div>
                ) : (
                  <div className="booking-availability-error">
                    <AlertCircle size={21} />
                    <p>
                      На вибрані дати всі номери цієї
                      категорії зайняті. Спробуйте інші дати.
                    </p>
                  </div>
                )}
              </div>

              {message && (
                <p className="booking-message" role="status">
                  {message}
                </p>
              )}

              {handleCancel && (
                <button
                  type="button"
                  className="booking-cancel-link"
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  <ArrowLeft size={17} />
                  {cancelLabel}
                </button>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
