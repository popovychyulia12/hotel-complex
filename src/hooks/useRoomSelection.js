import { useContext } from 'react'
import RoomSelectionContext from '../context/RoomSelectionContext.js'

export default function useRoomSelection() {
  const context = useContext(RoomSelectionContext)

  if (!context) {
    throw new Error(
      'useRoomSelection має використовуватися всередині RoomSelectionProvider'
    )
  }

  return context
}
