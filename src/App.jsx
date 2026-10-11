
import { Link, Route, Routes } from 'react-router'
import AppLayout from './components/layout/AppLayout.jsx'
import BookingsLayout from './components/layout/BookingsLayout.jsx'
import RoomsContainer from './pages/RoomsContainer.jsx'
import RoomDetailsPage from './pages/RoomDetailsPage.jsx'
import BookingsPage from './pages/BookingsPage.jsx'
import BookingCreatePage from './pages/BookingCreatePage.jsx'
import BookingEditPage from './pages/BookingEditPage.jsx'

const navigationLinks = [
  { to: '/', label: 'Головна', end: true },
  { to: '/rooms', label: 'Номери' },
  { to: '/bookings', label: 'Бронювання' },
]

function NotFoundPage() {
  return (
    <section>
      <h1>Сторінку не знайдено</h1>
      <p>Перевірте адресу або поверніться на головну сторінку.</p>
      <Link to="/">На головну</Link>
    </section>
  )
}

export default function App() {
  return (
    <Routes>
      <Route
        element={
          <AppLayout
            title="Готельний комплекс"
            links={navigationLinks}
          />
        }
      >
        <Route index element={<RoomsContainer />} />

        <Route path="rooms" element={<RoomsContainer />} />

        <Route
          path="rooms/:roomId"
          element={<RoomDetailsPage />}
        />

        <Route path="bookings" element={<BookingsLayout />}>
          <Route index element={<BookingsPage />} />

          <Route path="new" element={<BookingCreatePage />} />

          <Route
            path=":bookingId/edit"
            element={<BookingEditPage />}
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
