import RoomCard from './RoomCard.jsx'
import EmptyState from '../ui/EmptyState.jsx'

export default function RoomList({
  rooms,
  selectedId,
  onSelect,
  emptyTitle = 'Номери ще не додано.',
}) {
  if (rooms.length === 0) {
    return <EmptyState title={emptyTitle} />
  }

  return (
    <div className="rooms">
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
          selected={room.id === selectedId}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}
