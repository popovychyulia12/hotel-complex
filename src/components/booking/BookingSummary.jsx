
import {
  CalendarDays,
  Moon,
  UserRound,
  MessageSquare,
} from 'lucide-react'
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
    (
      Date.UTC(
        end.getFullYear(),
        end.getMonth(),
        end.getDate()
      ) -
      Date.UTC(
        start.getFullYear(),
        start.getMonth(),
        start.getDate()
      )
    ) / millisecondsPerDay
  )

  return nights > 0 ? nights : 0
}

export default function BookingSummary({ roomName, draft }) {
  const room = rooms.find(
    (item) => item.name === roomName
  )

  const nights = calculateNights(
    draft.checkIn,
    draft.checkOut
  )

  const pricePerNight = room?.price ?? 0
  const totalPrice = nights * pricePerNight

  const formatPrice = (value) =>
    `${value.toLocaleString('uk-UA')} грн`

  return (
    <section className="booking-summary">
      <span className="booking-kicker">
        03 / ВАШЕ БРОНЮВАННЯ
      </span>

      <h3>Підсумок бронювання</h3>

      <p className="booking-summary-description">
        Уся інформація про ваше майбутнє проживання.
      </p>

      <div className="booking-summary-list">
        <div className="booking-summary-row">
          <span>Номер</span>
          <strong>{roomName}</strong>
        </div>

        <div className="booking-summary-row">
          <span>
            <UserRound size={16} />
            Гість
          </span>
          <strong>{draft.guestName || 'Не вказано'}</strong>
        </div>

        <div className="booking-summary-row">
          <span>
            <CalendarDays size={16} />
            Дата заїзду
          </span>
          <strong>{draft.checkIn || 'Не вибрано'}</strong>
        </div>

        <div className="booking-summary-row">
          <span>
            <CalendarDays size={16} />
            Дата виїзду
          </span>
          <strong>{draft.checkOut || 'Не вибрано'}</strong>
        </div>

        <div className="booking-summary-row">
          <span>
            <Moon size={16} />
            Кількість ночей
          </span>
          <strong>{nights || 'Не визначено'}</strong>
        </div>

        <div className="booking-summary-row">
          <span>Ціна за ніч</span>
          <strong>{formatPrice(pricePerNight)}</strong>
        </div>
      </div>

      <div className="booking-summary-total">
        <span>Загальна вартість</span>
        <strong>{formatPrice(totalPrice)}</strong>
        <small>
          {nights > 0
            ? `Розрахунок за ${nights} ночей`
            : 'Оберіть дати для розрахунку'}
        </small>
      </div>

      <div className="booking-summary-extra">
        <div>
          <MessageSquare size={18} />
          <p>
            <span>Додаткові побажання</span>
            <strong>{draft.comment || 'Немає'}</strong>
          </p>
        </div>

        <div>
          <UserRound size={18} />
          <p>
            <span>Допомога адміністратора</span>
            <strong>
              {draft.needsHelp ? 'Потрібна' : 'Не потрібна'}
            </strong>
          </p>
        </div>
      </div>

      <p className="booking-summary-note">
        Це попередній розрахунок. Бронювання буде
        створено після підтвердження форми.
      </p>
    </section>
  )
}
