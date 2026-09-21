export default function RoomStatus({ status }) {
  const isAvailable = status === 'Доступний'
  const className = isAvailable ? 'status available' : 'status'

  return (
    <span className={className}>
      {status}
    </span>
  )
}
