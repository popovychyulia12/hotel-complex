import { useContext } from 'react'
import { BookingsContext } from './BookingsContextValue.js'

export function useBookings() {
  const context = useContext(BookingsContext)

  if (!context) {
    throw new Error(
      'useBookings потрібно використовувати всередині BookingsProvider'
    )
  }

  return context
}