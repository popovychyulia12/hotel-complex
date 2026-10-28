
import { useState } from 'react'
import { Link } from 'react-router'
import { rooms } from '../data/rooms'

export default function StayPlanner() {
  const [guests, setGuests] = useState('2')
  const [restType, setRestType] = useState('romantic')
  const [nights, setNights] = useState(2)
  const [budget, setBudget] = useState('any')
  const [showResult, setShowResult] = useState(false)

  function recommendRoom() {
    const suitableRooms = rooms.filter(
      (room) =>
        room.guests >= Number(guests) &&
        room.quantity > 0
    )

    if (suitableRooms.length === 0) {
      return null
    }

    const withinBudget = suitableRooms.filter(
      (room) =>
        budget === 'any' ||
        room.price * nights <= Number(budget)
    )

    // Спочатку розглядаємо номери в межах бюджету
    const candidates =
      withinBudget.length > 0
        ? withinBudget
        : suitableRooms

    const preferences = {
      romantic: [
        'Люкс Преміум',
        'Люкс',
        'Покращений двомісний',
        'Стандарт двомісний',
      ],
      family: [
        'Сімейні апартаменти',
        'Сімейний',
        'Президентський люкс',
      ],
      relax: [
        'Покращений двомісний',
        'Люкс',
        'Стандарт одномісний',
        'Стандарт двомісний',
      ],
      active: [
        'Стандарт одномісний',
        'Стандарт двомісний',
        'Покращений двомісний',
      ],
    }

    const preferredNames = preferences[restType] ?? []

    const preferredRoom = preferredNames
      .map((name) =>
        candidates.find((room) => room.name === name)
      )
      .find(Boolean)

    if (preferredRoom) {
      return preferredRoom
    }

    return [...candidates].sort(
      (a, b) => a.price - b.price
    )[0]
  }

  const recommendedRoom = recommendRoom()

  const totalPrice = recommendedRoom
    ? recommendedRoom.price * nights
    : 0

  const overBudget =
    budget !== 'any' &&
    totalPrice > Number(budget)

  function resetResult() {
    setShowResult(false)
  }

  return (
    <section className="stay-planner" id="stay-planner">
      <div className="stay-planner-heading">
        <span className="stay-planner-label">
          СТВОРИ СВІЙ ВІДПОЧИНОК
        </span>

        <h2>Конструктор ідеального відпочинку</h2>

        <p>
          Розкажіть нам про свої побажання,
          а ми допоможемо обрати номер.
        </p>
      </div>

      <div className="stay-planner-form">
        <div className="planner-field">
          <label htmlFor="planner-guests">
            З ким плануєте відпочивати?
          </label>

          <select
            id="planner-guests"
            value={guests}
            onChange={(event) => {
              setGuests(event.target.value)
              resetResult()
            }}
          >
            <option value="1">Самостійно</option>
            <option value="2">Удвох</option>
            <option value="3">Троє гостей</option>
            <option value="4">З родиною (4 гості)</option>
            <option value="5">Великою компанією (5 гостей)</option>
          </select>
        </div>

        <div className="planner-field">
          <label htmlFor="planner-type">
            Який відпочинок вам до душі?
          </label>

          <select
            id="planner-type"
            value={restType}
            onChange={(event) => {
              setRestType(event.target.value)
              resetResult()
            }}
          >
            <option value="relax">Спокійний</option>
            <option value="romantic">Романтичний</option>
            <option value="active">Активний</option>
            <option value="family">Сімейний</option>
          </select>
        </div>

        <div className="planner-field">
          <label htmlFor="planner-nights">
            На скільки ночей?
          </label>

          <select
            id="planner-nights"
            value={nights}
            onChange={(event) => {
              setNights(Number(event.target.value))
              resetResult()
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 10, 14].map((count) => (
              <option key={count} value={count}>
                {count}{' '}
                {count === 1
                  ? 'ніч'
                  : count < 5
                    ? 'ночі'
                    : 'ночей'}
              </option>
            ))}
          </select>
        </div>

        <div className="planner-field">
          <label htmlFor="planner-budget">
            Ваш бюджет на проживання
          </label>

          <select
            id="planner-budget"
            value={budget}
            onChange={(event) => {
              setBudget(event.target.value)
              resetResult()
            }}
          >
            <option value="any">Без обмежень</option>
            <option value="3000">До 3 000 грн</option>
            <option value="5000">До 5 000 грн</option>
            <option value="7000">До 7 000 грн</option>
            <option value="10000">До 10 000 грн</option>
            <option value="15000">До 15 000 грн</option>
            <option value="25000">До 25 000 грн</option>
            <option value="40000">До 40 000 грн</option>
          </select>
        </div>

        <button
          type="button"
          className="planner-submit"
          onClick={() => setShowResult(true)}
        >
          Підібрати відпочинок
        </button>
      </div>

      {showResult && (
        <div className="planner-result" aria-live="polite">
          {recommendedRoom ? (
            <>
              <img
                src={recommendedRoom.image}
                alt={`Номер ${recommendedRoom.name}`}
              />

              <div className="planner-result-content">
                <span className="stay-planner-label">
                  ВАША РЕКОМЕНДАЦІЯ
                </span>

                <h3>{recommendedRoom.name}</h3>

                <p>{recommendedRoom.description}</p>

                <p>
                  {nights}{' '}
                  {nights === 1
                    ? 'ніч'
                    : nights < 5
                      ? 'ночі'
                      : 'ночей'}
                  {' '}· До {recommendedRoom.guests} гостей
                </p>

                <strong>
                  {totalPrice.toLocaleString('uk-UA')} грн
                </strong>

                {overBudget && (
                  <p className="planner-warning">
                    На жаль, серед відповідних категорій
                    немає варіанта в межах вашого бюджету.
                    Показуємо найбільш доступний варіант
                    за обраними параметрами.
                  </p>
                )}

                <Link
                  to={`/bookings/new?roomId=${recommendedRoom.id}&nights=${nights}`}
                  className="planner-booking-link"
                >
                  Забронювати номер
                </Link>
              </div>
            </>
          ) : (
            <div className="planner-result-content">
              <h3>Поки немає відповідного номера</h3>

              <p>
                Спробуйте змінити кількість гостей
                або перегляньте каталог номерів.
              </p>

              <Link
                to="/rooms"
                className="planner-booking-link"
              >
                Переглянути номери
              </Link>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
