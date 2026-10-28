
import { Link, useSearchParams } from 'react-router'
import { useBookings } from '../contexts/BookingsContext.jsx'
import { rooms } from '../data/rooms.js'
import Section from '../components/ui/Section.jsx'

// Підтримка старих бронювань
function findBookingRoom(booking) {
  const byId = rooms.find(
    (room) => String(room.id) === String(booking.roomId)
  )

  if (byId) return byId

  if (booking.roomName === 'Стандарт') {
    return rooms.find((room) => room.id === 1)
  }

  return rooms.find(
    (room) => room.name === booking.roomName
  )
}

export default function BookingsPage() {
  const {
    bookings,
    notice,
    setNotice,
    deleteBooking,
  } = useBookings()

  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search') ?? ''
  const roomFilter = searchParams.get('room') ?? 'all'
  const sort = searchParams.get('sort') ?? 'new'

  function updateFilter(name, value) {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous)

      if (
        !value ||
        (name === 'room' && value === 'all') ||
        (name === 'sort' && value === 'new')
      ) {
        next.delete(name)
      } else {
        next.set(name, value)
      }

      return next
    }, { replace: true })
  }

  function handleCancel(booking) {
    const confirmed = window.confirm(
      `Ви впевнені, що хочете скасувати бронювання гостя "${booking.guestName}"?`
    )

    if (!confirmed) return

    const result = deleteBooking(booking.id)

    if (!result.success) {
      window.alert(
        result.error || 'Не вдалося скасувати бронювання.'
      )
    }
  }

  const filteredBookings = bookings
    .filter((booking) =>
      (booking.guestName ?? '')
        .toLocaleLowerCase('uk')
        .includes(search.trim().toLocaleLowerCase('uk'))
    )
    .filter((booking) => {
      if (roomFilter === 'all') return true

      const room = findBookingRoom(booking)

      return room && String(room.id) === roomFilter
    })
    .sort((a, b) => {
      if (sort === 'name-asc') {
        return (a.guestName ?? '').localeCompare(
          b.guestName ?? '',
          'uk'
        )
      }

      if (sort === 'name-desc') {
        return (b.guestName ?? '').localeCompare(
          a.guestName ?? '',
          'uk'
        )
      }

      if (sort === 'date-asc') {
        return (a.checkIn ?? '9999-12-31').localeCompare(
          b.checkIn ?? '9999-12-31'
        )
      }

      if (sort === 'date-desc') {
        return (b.checkIn ?? '').localeCompare(
          a.checkIn ?? ''
        )
      }

      // Новіші записи показуємо першими
      return bookings.indexOf(b) - bookings.indexOf(a)
    })

  return (
    <Section id="bookings" title="Мої бронювання">
      <p>
        Тут зберігаються ваші бронювання.
        Переглядайте деталі, змінюйте плани або
        скасовуйте бронювання.
      </p>

      {notice && (
        <div role="status" className="booking-notice">
          <p>{notice}</p>

          <button
            type="button"
            onClick={() => setNotice('')}
          >
            Закрити
          </button>
        </div>
      )}

      <p>
        <Link to="/rooms">
          + Забронювати номер
        </Link>
      </p>

      <div className="booking-filters">
        <div>
          <label htmlFor="booking-search">
            Пошук за іменем гостя
          </label>

          <input
            id="booking-search"
            type="search"
            placeholder="Введіть ім’я..."
            value={search}
            onChange={(event) =>
              updateFilter('search', event.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="booking-room-filter">
            Категорія номера
          </label>

          <select
            id="booking-room-filter"
            value={roomFilter}
            onChange={(event) =>
              updateFilter('room', event.target.value)
            }
          >
            <option value="all">Усі категорії</option>

            {rooms.map((room) => (
              <option key={room.id} value={String(room.id)}>
                {room.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="booking-sort">
            Сортування
          </label>

          <select
            id="booking-sort"
            value={sort}
            onChange={(event) =>
              updateFilter('sort', event.target.value)
            }
          >
            <option value="new">Спочатку новіші</option>
            <option value="name-asc">Ім’я: А–Я</option>
            <option value="name-desc">Ім’я: Я–А</option>
            <option value="date-asc">
              Дата заїзду: раніше
            </option>
            <option value="date-desc">
              Дата заїзду: пізніше
            </option>
          </select>
        </div>
      </div>

      <p>
        Знайдено бронювань: <strong>{filteredBookings.length}</strong>
      </p>

      {bookings.length === 0 ? (
        <div>
          <h3>У вас поки немає бронювань</h3>
          <p>
            Оберіть номер і заплануйте свій наступний відпочинок.
          </p>
          <Link to="/rooms">Переглянути номери</Link>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div>
          <h3>Нічого не знайдено</h3>
          <p>Спробуйте змінити параметри пошуку.</p>

          <button
            type="button"
            onClick={() => setSearchParams({})}
          >
            Скинути фільтри
          </button>
        </div>
      ) : (
        <ul className="bookings-list">
          {filteredBookings.map((booking) => {
            const room = findBookingRoom(booking)

            return (
              <li key={booking.id}>
                <h2>
                  {room
                    ? room.name
                    : booking.roomName || 'Номер готелю'}
                </h2>

                <p>
                  <strong>Гість:</strong> {booking.guestName}
                </p>

                <p>
                  <strong>Заїзд:</strong>{' '}
                  {booking.checkIn || 'Не вказано'}
                </p>

                <p>
                  <strong>Виїзд:</strong>{' '}
                  {booking.checkOut || 'Не вказано'}
                </p>

                <p>
                  <strong>Гостей:</strong>{' '}
                  {booking.guestsCount || 'Не вказано'}
                </p>

                <div className="form-actions">
                  <Link to={`/bookings/${booking.id}`}>
                    Переглянути деталі
                  </Link>

                  <Link to={`/bookings/${booking.id}/edit`}>
                    Змінити бронювання
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleCancel(booking)}
                  >
                    Скасувати бронювання
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </Section>
  )
}
