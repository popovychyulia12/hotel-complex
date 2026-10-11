
import { NavLink, Outlet } from 'react-router'

export default function BookingsLayout() {
  return (
    <section className="bookings-layout">
      <h1>Розділ бронювань</h1>

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
              Усі бронювання
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/bookings/new"
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              Створити бронювання
            </NavLink>
          </li>
        </ul>
      </nav>

      <Outlet />
    </section>
  )
}
