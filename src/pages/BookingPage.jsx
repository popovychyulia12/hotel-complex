import Section from '../components/ui/Section.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import RoomStatus from '../components/rooms/RoomStatus.jsx'
import BookingFormPreview from '../components/booking/BookingFormPreview.jsx'

export default function BookingPage({ room }) {
  return (
    <Section id="booking" title="Підготовка бронювання">
      {room ? (
        <>
          <p>
            Обраний номер: <strong>{room.name}</strong>
          </p>

          <p>
            Статус: <RoomStatus status={room.status} />
          </p>

          <BookingFormPreview
            idPrefix="booking-preview"
            roomName={room.name}
          />
        </>
      ) : (
        <EmptyState title="Номер для бронювання не вибрано">
          <p>
            <a href="#rooms">Переглянути номери</a>
          </p>
        </EmptyState>
      )}
    </Section>
  )
}
