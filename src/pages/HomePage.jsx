
import { rooms } from '../data/rooms.js'
import Section from '../components/ui/Section.jsx'
import RoomFilters from '../components/rooms/RoomFilters.jsx'
import RoomList from '../components/rooms/RoomList.jsx'
import useRoomFilters from '../hooks/useRoomFilters.js'

export default function HomePage({ selectedId, onSelect }) {
  const {
    query,
    availableOnly,
    visibleRooms,
    resetFilters,
  } = useRoomFilters(rooms)

  return (
    <>
      <Section id="about" title="Про готель">
        <p>
          Комфортний відпочинок та затишні номери для наших гостей.
        </p>
      </Section>

      <Section id="rooms" title="Наші номери">
        <RoomFilters
          query={query}
          availableOnly={availableOnly}
          onReset={resetFilters}
        />

        <p>Показано номерів: {visibleRooms.length}</p>

        <RoomList
          rooms={visibleRooms}
          selectedId={selectedId}
          onSelect={onSelect}
          emptyTitle={
            rooms.length === 0
              ? 'Номери ще не додано.'
              : 'За цими фільтрами нічого не знайдено.'
          }
        />
      </Section>
    </>
  )
}
