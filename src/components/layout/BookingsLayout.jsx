
import { NavLink, Outlet } from 'react-router'

export default function BookingsLayout() {
  return (
    <section className="bookings-layout">
      <div className="bookings-header">
        <h1>Мій відпочинок</h1>

        <p>
          Плануйте свої подорожі, переглядайте бронювання
          та керуйте майбутнім відпочинком.
        </p>
      </div>

      <nav aria-label="Навігація бронювань">
        <ul className="nav-list">
          <li>
            <NavLink
              to="/bookings"
              end
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              Мої бронювання
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/rooms"
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              Обрати номер
            </NavLink>
          </li>
        </ul>
      </nav>

      <Outlet />
    </section>
  )
}
