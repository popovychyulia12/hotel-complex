
import { useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import {
  ArrowUpRight,
  CalendarDays,
  Users,
  Search,
  Plus,
  Pencil,
  Trash2,
} from 'lucide-react'

import { useBookings } from '../contexts/useBookings.js'
import { rooms } from '../data/rooms.js'
import './BookingsPage.css'

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
    loading,
    error,
    retry,
  } = useBookings()

  const [searchParams, setSearchParams] = useSearchParams()
  const [deletingId, setDeletingId] = useState(null)
  const deletingRef = useRef(false)

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

  async function handleCancel(booking) {
    if (deletingRef.current) return

    const confirmed = window.confirm(
      `Ви впевнені, що хочете скасувати бронювання гостя "${booking.guestName}"?`
    )

    if (!confirmed) return

    deletingRef.current = true
    setDeletingId(booking.id)

    try {
      const result = await deleteBooking(booking.id)

      if (!result.success) {
        window.alert(
          result.error || 'Не вдалося скасувати бронювання.'
        )
      }
    } catch (deleteError) {
      window.alert(
        deleteError?.message ||
        'Сталася помилка під час видалення.'
      )
    } finally {
      deletingRef.current = false
      setDeletingId(null)
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

      return bookings.indexOf(b) - bookings.indexOf(a)
    })

  return (
    <div className="my-bookings-page">
      <header className="my-bookings-hero">
        <div className="my-bookings-container">
          <span className="my-bookings-kicker">
            HOTEL & WELLNESS / MY RESERVATIONS
          </span>

          <h1>
            МОЇ
            <br />
            <em>БРОНЮВАННЯ.</em>
          </h1>

          <p>
            Переглядайте свої бронювання, змінюйте
            плани та керуйте майбутнім відпочинком.
          </p>
        </div>
      </header>

      <section className="my-bookings-content">
        <div className="my-bookings-container">
          <div className="my-bookings-heading">
            <div>
              <span className="my-bookings-kicker">
                01 / ВАШІ ПОДОРОЖІ
              </span>

              <h2>
                Запланований <em>відпочинок.</em>
              </h2>
            </div>

            <Link
              to="/rooms"
              className="my-bookings-new-button"
            >
              <Plus size={19} />
              Забронювати номер
            </Link>
          </div>

          {notice && (
            <div className="my-bookings-notice" role="status">
              <p>{notice}</p>

              <button
                type="button"
                onClick={() => setNotice('')}
              >
                Закрити
              </button>
            </div>
          )}

          <div className="my-bookings-filters">
            <div className="my-bookings-filter">
              <label htmlFor="booking-search">
                Пошук за іменем гостя
              </label>

              <div className="my-bookings-search-wrap">
                <Search size={18} />

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
            </div>

            <div className="my-bookings-filter">
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
                  <option
                    key={room.id}
                    value={String(room.id)}
                  >
                    {room.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="my-bookings-filter">
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

          {!loading && !error && (
            <p className="my-bookings-count">
              Знайдено бронювань:{' '}
              <strong>{filteredBookings.length}</strong>
            </p>
          )}

          {loading ? (
            <div className="my-bookings-state" role="status">
              <p>Завантажуємо бронювання...</p>
            </div>
          ) : error ? (
            <div className="my-bookings-state" role="alert">
              <h3>Не вдалося завантажити бронювання</h3>
              <p>{error}</p>

              <button type="button" onClick={retry}>
                Спробувати ще раз
              </button>
            </div>
          ) : bookings.length === 0 ? (
            <div className="my-bookings-state">
              <h3>У вас поки немає бронювань</h3>

              <p>
                Оберіть номер і заплануйте свій
                наступний відпочинок.
              </p>

              <Link to="/rooms">
                Переглянути номери
              </Link>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="my-bookings-state">
              <h3>Нічого не знайдено</h3>

              <p>
                Спробуйте змінити параметри пошуку.
              </p>

              <button
                type="button"
                onClick={() => setSearchParams({})}
              >
                Скинути фільтри
              </button>
            </div>
          ) : (
            <ul className="my-bookings-grid">
              {filteredBookings.map((booking) => {
                const room = findBookingRoom(booking)

                return (
                  <li
                    key={booking.id}
                    className="my-bookings-card"
                  >
                    {room?.image && (
                      <div className="my-bookings-card-image">
                        <img
                          src={room.image}
                          alt={`Інтер'єр номера ${room.name}`}
                          loading="lazy"
                        />
                      </div>
                    )}

                    <div className="my-bookings-card-body">
                      <span className="my-bookings-kicker">
                        ВАШЕ БРОНЮВАННЯ
                      </span>

                      <h3>
                        {room
                          ? room.name
                          : booking.roomName || 'Номер готелю'}
                      </h3>

                      <div className="my-bookings-card-info">
                        <p>
                          <strong>Гість</strong>
                          <span>{booking.guestName}</span>
                        </p>

                        <p>
                          <CalendarDays size={17} />
                          <strong>Заїзд</strong>
                          <span>{booking.checkIn || 'Не вказано'}</span>
                        </p>

                        <p>
                          <CalendarDays size={17} />
                          <strong>Виїзд</strong>
                          <span>{booking.checkOut || 'Не вказано'}</span>
                        </p>

                        <p>
                          <Users size={17} />
                          <strong>Гостей</strong>
                          <span>
                            {booking.guestsCount || 'Не вказано'}
                          </span>
                        </p>
                      </div>

                      <div className="my-bookings-card-actions">
                        <Link
                          to={`/bookings/${booking.id}`}
                          className="my-bookings-details-button"
                        >
                          Детальніше
                          <ArrowUpRight size={17} />
                        </Link>

                        <Link
                          to={`/bookings/${booking.id}/edit`}
                          className="my-bookings-edit-button"
                        >
                          <Pencil size={16} />
                          Змінити
                        </Link>

                        <button
                          type="button"
                          className="my-bookings-delete-button"
                          onClick={() => handleCancel(booking)}
                          disabled={deletingId !== null}
                        >
                          <Trash2 size={16} />
                          {deletingId === booking.id
                            ? 'Скасовуємо...'
                            : 'Скасувати'}
                        </button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </section>
    </div>
  )
}
