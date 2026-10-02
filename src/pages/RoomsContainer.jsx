import HomePage from './HomePage.jsx'
import useRoomSelection from '../hooks/useRoomSelection.js'

export default function RoomsContainer() {
  const { selectedId, selectRoom } = useRoomSelection()

  return (
    <HomePage
      selectedId={selectedId}
      onSelect={selectRoom}
    />
  )
}
