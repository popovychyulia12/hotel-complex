
import { Link } from 'react-router'
import { bookings } from '../data/bookings.js'
import { rooms } from '../data/rooms.js'
import Section from '../components/ui/Section.jsx'

export default function BookingsPage() {
  return (
    <Section id="bookings" title="Мої бронювання">
      <p>
        Тут відображаються демонстраційні записи бронювань.
      </p>

      <p>
        <Link to="/bookings/new">
          Створити бронювання
        </Link>
      </p>

      {bookings.length === 0 ? (
        <p>Бронювань поки немає.</p>
      ) : (
        <ul>
          {bookings.map((booking) => {
            const room = rooms.find(
              (item) => item.id === booking.roomId
            )

            return (
              <li key={booking.id}>
                <h2>Бронювання №{booking.id}</h2>

                <p>
                  Гість: {booking.guestName}
                </p>

                <p>
                  Номер: {room ? room.name : 'Номер не знайдено'}
                </p>

                <p>
                  Коментар: {booking.comment || 'Немає'}
                </p>

                <p>
                  Додаткова допомога:{' '}
                  {booking.needsHelp ? 'Потрібна' : 'Не потрібна'}
                </p>

                <Link to={`/bookings/${booking.id}/edit`}>
                  Редагувати бронювання
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </Section>
  )
}
