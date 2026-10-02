import { useState } from 'react'

export default function useRoomFilters(rooms) {
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

  return {
    query,
    availableOnly,
    visibleRooms,
    setQuery,
    setAvailableOnly,
    resetFilters,
  }
}
