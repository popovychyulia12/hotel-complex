
import { Link, Route, Routes } from 'react-router'
import { BookingsProvider } from './contexts/BookingsContext.jsx'
import AppLayout from './components/layout/AppLayout.jsx'
import BookingsLayout from './components/layout/BookingsLayout.jsx'

import HomePage from './pages/HomePage.jsx'
import RoomsPage from './pages/RoomsPage.jsx'
import RoomDetailsPage from './pages/RoomDetailsPage.jsx'
import BookingsPage from './pages/BookingsPage.jsx'
import BookingCreatePage from './pages/BookingCreatePage.jsx'
import BookingEditPage from './pages/BookingEditPage.jsx'
import BookingDetailsPage from './pages/BookingDetailsPage.jsx'
import GetByIdTest from './tests/GetByIdTest.jsx'

import RestaurantPage from './pages/RestaurantPage.jsx'
import RestaurantMenuPage from './pages/RestaurantMenuPage.jsx'
import SpaPage from './pages/SpaPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import SpaProgramsPage from './pages/SpaProgramsPage.jsx'

const navigationLinks = [
  { to: '/', label: 'Головна', end: true },
  { to: '/rooms', label: 'Номери' },
  { to: '/restaurant', label: 'Ресторан' },
  { to: '/spa', label: 'SPA' },
  { to: '/services', label: 'Послуги' },
  { to: '/about', label: 'Про комплекс' },
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
    <BookingsProvider>
      <Routes>
        <Route
          element={
            <AppLayout
              title="Готельний комплекс"
              links={navigationLinks}
            />
          }
        >
          <Route index element={<HomePage />} />

          <Route path="rooms" element={<RoomsPage />} />

          <Route
            path="rooms/:roomId"
            element={<RoomDetailsPage />}
          />

          <Route
            path="restaurant"
            element={<RestaurantPage />}
          />

<Route
  path="restaurant/menu"
  element={<RestaurantMenuPage />}
/> 

          <Route
            path="spa"
            element={<SpaPage />}
          />

<Route
  path="spa/programs"
  element={<SpaProgramsPage />}
/>

          <Route
            path="services"
            element={<ServicesPage />}
          />

          <Route
            path="about"
            element={<AboutPage />}
          />

<Route
  path="test-get-by-id"
  element={<GetByIdTest />}
/>

          <Route path="bookings" element={<BookingsLayout />}>
            <Route index element={<BookingsPage />} />

            <Route
              path="new"
              element={<BookingCreatePage />}
            />

            <Route
              path=":bookingId"
              element={<BookingDetailsPage />}
            />

            <Route
              path=":bookingId/edit"
              element={<BookingEditPage />}
            />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BookingsProvider>
  )
}
