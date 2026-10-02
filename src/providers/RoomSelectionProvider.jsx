import { useState } from 'react'
import { rooms } from '../data/rooms.js'
import RoomSelectionContext from '../context/RoomSelectionContext.js'

export default function RoomSelectionProvider({ children }) {
  const [selectedId, setSelectedId] = useState(null)

  const selectedRoom =
    rooms.find((room) => room.id === selectedId) ?? null

  function selectRoom(id) {
    const roomExists = rooms.some((room) => room.id === id)
    setSelectedId(roomExists ? id : null)
  }

  function clearSelection() {
    setSelectedId(null)
  }

  return (
    <RoomSelectionContext.Provider
      value={{
        selectedId,
        selectedRoom,
        selectRoom,
        clearSelection,
      }}
    >
      {children}
    </RoomSelectionContext.Provider>
  )
}
