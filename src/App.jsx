import AppLayout from './components/layout/AppLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import BookingPage from './pages/BookingPage.jsx'
import { rooms } from './data/rooms.js'

const navigationLinks = [
  { href: '#about', label: 'Про готель' },
  { href: '#rooms', label: 'Номери' },
  { href: '#booking', label: 'Підготовка бронювання' },
]

export default function App() {
  const exampleRoom = rooms.find((room) => room.id === 1)

  return (
    <AppLayout title="Готельний комплекс" links={navigationLinks}>
      <HomePage />
     <BookingPage room={exampleRoom} />
    </AppLayout>
  )
}
