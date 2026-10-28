
import { rooms } from '../data/rooms.js'
import Section from '../components/ui/Section.jsx'
import RoomFilters from '../components/rooms/RoomFilters.jsx'
import RoomList from '../components/rooms/RoomList.jsx'
import useRoomFilters from '../hooks/useRoomFilters.js'
import useRoomSelection from '../hooks/useRoomSelection.js'

export default function RoomsPage() {
  const { selectedId, selectRoom } = useRoomSelection()

  const {
    query,
    availableOnly,
    visibleRooms,
    resetFilters,
  } = useRoomFilters(rooms)

  return (
    <div className="rooms-page">
      <div className="rooms-page-intro">
        <span className="hero-eyebrow">
          ВАШ КОМФОРТНИЙ ВІДПОЧИНОК
        </span>

        <h1>Наші номери</h1>

        <p>
          Оберіть номер, який найкраще відповідає
          вашим побажанням.
        </p>
      </div>

      <Section id="rooms" title="Оберіть свій номер">
        <RoomFilters
          query={query}
          availableOnly={availableOnly}
          onReset={resetFilters}
        />

        <p className="rooms-results">
          Показано категорій номерів: {visibleRooms.length}
        </p>

        <RoomList
          rooms={visibleRooms}
          selectedId={selectedId}
          onSelect={selectRoom}
          emptyTitle={
            rooms.length === 0
              ? 'Номери ще не додано.'
              : 'За цими фільтрами нічого не знайдено.'
          }
        />
      </Section>
    </div>
  )
}
