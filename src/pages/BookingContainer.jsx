import BookingPage from './BookingPage.jsx'
import useRoomSelection from '../hooks/useRoomSelection.js'

export default function BookingContainer() {
  const {
    selectedId,
    selectedRoom,
    clearSelection,
  } = useRoomSelection()

  return (
    <BookingPage
      key={selectedId ?? 'empty'}
      room={selectedRoom}
      onClearSelection={clearSelection}
    />
  )
}
