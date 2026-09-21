import RoomCard from './RoomCard.jsx'
import EmptyState from '../ui/EmptyState.jsx'

export default function RoomList({ rooms }) {
  if (rooms.length === 0) {
    return (
      <EmptyState title="Номери відсутні">
        <p>Після додавання номерів вони з’являться в цьому розділі.</p>
      </EmptyState>
    )
  }

  return (
    <div className="rooms">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  )
}
