import { useState } from 'react'
import { rooms } from '../data/rooms.js'
import Section from '../components/ui/Section.jsx'
import RoomFilters from '../components/rooms/RoomFilters.jsx'
import RoomList from '../components/rooms/RoomList.jsx'

export default function HomePage({ selectedId, onSelect }) {
  const [query, setQuery] = useState('')
  const [availableOnly, setAvailableOnly] = useState(false)

  const normalizedQuery = query.trim().toLocaleLowerCase('uk')

  const visibleRooms = rooms.filter((room) => {
    const matchesQuery = room.name
      .toLocaleLowerCase('uk')
      .includes(normalizedQuery)

    const matchesAvailability =
      !availableOnly || room.status === 'Доступний'

    return matchesQuery && matchesAvailability
  })

  function resetFilters() {
    setQuery('')
    setAvailableOnly(false)
  }

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
          onQueryChange={setQuery}
          onAvailableOnlyChange={setAvailableOnly}
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
