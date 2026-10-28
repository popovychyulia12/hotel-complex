
import { rooms } from '../../data/rooms.js'

function calculateNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0

  const start = new Date(`${checkIn}T12:00:00`)
  const end = new Date(`${checkOut}T12:00:00`)

  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime())
  ) {
    return 0
  }

  const millisecondsPerDay = 24 * 60 * 60 * 1000

  const nights = Math.round(
    (Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()) -
      Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())) /
      millisecondsPerDay
  )

  return nights > 0 ? nights : 0
}

export default function BookingSummary({ roomName, draft }) {
  const room = rooms.find((item) => item.name === roomName)

  const nights = calculateNights(draft.checkIn, draft.checkOut)
  const pricePerNight = room?.price ?? 0
  const totalPrice = nights * pricePerNight

  return (
    <div className="booking-summary">
      <h3>Підсумок бронювання</h3>

      <p>
        Номер: <strong>{roomName}</strong>
      </p>

      <p>
        Гість: <strong>{draft.guestName || 'Не вказано'}</strong>
      </p>

      <p>
        Дата заїзду:{' '}
        <strong>{draft.checkIn || 'Не вибрано'}</strong>
      </p>

      <p>
        Дата виїзду:{' '}
        <strong>{draft.checkOut || 'Не вибрано'}</strong>
      </p>

      <p>
        Кількість ночей:{' '}
        <strong>{nights || 'Не визначено'}</strong>
      </p>

      <p>
        Ціна за ніч:{' '}
        <strong>
          {pricePerNight.toLocaleString('uk-UA')} грн
        </strong>
      </p>

      <div className="booking-total">
        <span>Загальна вартість</span>
        <strong>
          {totalPrice.toLocaleString('uk-UA')} грн
        </strong>
      </div>

      <p>
        Побажання: <strong>{draft.comment || 'Немає'}</strong>
      </p>

      <p>
        Допомога адміністратора:{' '}
        <strong>{draft.needsHelp ? 'Так' : 'Ні'}</strong>
      </p>

      <p className="booking-summary-note">
        Це попередній розрахунок. Бронювання буде створено
        після підтвердження форми.
      </p>
    </div>
  )
}
