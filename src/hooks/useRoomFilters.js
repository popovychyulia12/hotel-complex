
import { useLocation, useNavigate } from 'react-router'

export default function useRoomFilters(rooms) {
  const location = useLocation()
  const navigate = useNavigate()

  const searchParams = new URLSearchParams(location.search)
  const query = searchParams.get('q') ?? ''
  const availableOnly = searchParams.get('available') === '1'

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
    navigate(
      { pathname: location.pathname, search: '' },
      { replace: true }
    )
  }

  return {
    query,
    availableOnly,
    visibleRooms,
    resetFilters,
  }
}
