
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { useBookings } from '../contexts/useBookings.js'
import Section from '../components/ui/Section.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import BookingFormPreview from '../components/booking/BookingFormPreview.jsx'
import BookingSummary from '../components/booking/BookingSummary.jsx'
import AppButton from '../components/ui/AppButton.jsx'

function formatLocalDate(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-')
}

function createPlannerDates(selectedNights) {
  if (!Number.isInteger(selectedNights) || selectedNights < 1) {
    return {}
  }

  const checkIn = new Date()
  const checkOut = new Date(checkIn)

  checkOut.setDate(checkOut.getDate() + selectedNights)

  return {
    checkIn: formatLocalDate(checkIn),
    checkOut: formatLocalDate(checkOut),
  }
}

function createEmptyDraft() {
  return {
    guestName: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guestsCount: '1',
    comment: '',
    needsHelp: false,
  }
}

function validateBooking(draft, room) {
  const errors = {}
  const guestName = draft.guestName.trim()
  const phone = draft.phone.trim()

  if (guestName.length < 2 || guestName.length > 60) {
    errors.guestName = 'Вкажіть ім’я від 2 до 60 символів.'
  }

  if (!/^\+380\d{9}$/.test(phone)) {
    errors.phone = 'Введіть телефон у форматі +380XXXXXXXXX.'
  }

  const todayString = formatLocalDate(new Date())

  if (!draft.checkIn || draft.checkIn < todayString) {
    errors.checkIn = 'Оберіть дату заїзду не раніше сьогодні.'
  }

  if (!draft.checkOut || draft.checkOut <= draft.checkIn) {
    errors.checkOut = 'Дата виїзду має бути пізніше заїзду.'
  }

  const guests = Number(draft.guestsCount)
  const maxGuests = Number(room?.guests)

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

  const [draft, setDraft] = useState(() => ({
    ...createEmptyDraft(),
    ...createPlannerDates(selectedNights),
    ...(initialDraft ?? {}),
  }))

  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const savingRef = useRef(false)

  const pageTitle = room
    ? `${title}: ${room.name}`
    : title

  useEffect(() => {
    const previousTitle = document.title
    document.title = `Готельний комплекс: ${pageTitle}`

    return () => {
      document.title = previousTitle
    }
  }, [pageTitle])

  const datesValid =
    Boolean(draft.checkIn) &&
    Boolean(draft.checkOut) &&
    draft.checkIn >= formatLocalDate(new Date()) &&
    draft.checkOut > draft.checkIn

  const availableCount =
    room && datesValid
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
    setDraft({
      ...createEmptyDraft(),
      ...createPlannerDates(selectedNights),
      ...(initialDraft ?? {}),
    })

    setErrors({})
    setMessage('')
  }

  

async function handleSubmit() {
  if (savingRef.current) return

  const validationErrors = validateBooking(draft, room)
  setErrors(validationErrors)

  if (Object.keys(validationErrors).length > 0) {
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


  const handleCancel = onCancel ?? onClearSelection

  return (
    <Section id="booking" title={title}>
      {room ? (
        <>
          <p>
            Обрана категорія: <strong>{room.name}</strong>
          </p>

          <p>
            Усього номерів цієї категорії: <strong>{room.quantity}</strong>
          </p>

          <BookingFormPreview
            idPrefix="booking-form"
            roomName={room.name}
            draft={draft}
            errors={errors}
            onFieldChange={handleFieldChange}
            onReset={resetDraft}
            onSubmit={handleSubmit}
            isSaving={isSaving}
          />

          <div className="booking-availability" aria-live="polite">
            {!datesValid ? (
              <p>
                Оберіть коректні дати заїзду та виїзду,
                щоб перевірити доступність.
              </p>
            ) : availableCount > 0 ? (
              <p className="availability-success">
                На вибрані дати доступно номерів: <strong>{availableCount}</strong>
              </p>
            ) : (
              <p className="availability-error">
                На вибрані дати всі номери цієї категорії зайняті.
                Спробуйте інші дати.
              </p>
            )}
          </div>

          {message && (
            <p role="status">{message}</p>
          )}

          <BookingSummary
            roomName={room.name}
            draft={draft}
          />

          <AppButton
            variant="secondary"
            onClick={handleCancel}
          >
            {cancelLabel}
          </AppButton>
        </>
      ) : (
        <EmptyState title="Номер для бронювання не вибрано">
          <p>
            <Link to="/rooms">Переглянути номери</Link>
          </p>
        </EmptyState>
      )}
    </Section>
  )
}
