import AppLayout from './components/layout/AppLayout.jsx'
import RoomsContainer from './pages/RoomsContainer.jsx'
import BookingContainer from './pages/BookingContainer.jsx'
import RoomSelectionProvider from './providers/RoomSelectionProvider.jsx'

const navigationLinks = [
  { href: '#about', label: 'Про готель' },
  { href: '#rooms', label: 'Номери' },
  { href: '#booking', label: 'Підготовка бронювання' },
]

export default function App() {
  return (
    <AppLayout title="Готельний комплекс" links={navigationLinks}>
      <RoomSelectionProvider>
        <RoomsContainer />
        <BookingContainer />
      </RoomSelectionProvider>
    </AppLayout>
  )
}
