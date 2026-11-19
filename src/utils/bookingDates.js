
export function getBookingDates(checkIn, checkOut) {
  if (!checkIn || !checkOut || checkIn >= checkOut) {
    return []
  }

  const dates = []
  const current = new Date(`${checkIn}T00:00:00`)
  const end = new Date(`${checkOut}T00:00:00`)

  while (current < end) {
    const year = current.getFullYear()
    const month = String(current.getMonth() + 1).padStart(2, '0')
    const day = String(current.getDate()).padStart(2, '0')

    dates.push(`${year}-${month}-${day}`)

    current.setDate(current.getDate() + 1)
  }

  return dates
}
