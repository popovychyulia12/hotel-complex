import { useEffect, useState } from 'react'
import Section from '../components/ui/Section.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import RoomStatus from '../components/rooms/RoomStatus.jsx'
import BookingFormPreview from '../components/booking/BookingFormPreview.jsx'
import BookingSummary from '../components/booking/BookingSummary.jsx'
import AppButton from '../components/ui/AppButton.jsx'

function createEmptyDraft() {
  return {
    guestName: '',
    comment: '',
    needsHelp: false,
  }
}

export default function BookingPage({ room, onClearSelection }) {
  const [draft, setDraft] = useState(createEmptyDraft)

  useEffect(() => {
    const previousTitle = document.title

    document.title = room
      ? `Готельний комплекс: ${room.name}`
      : 'Готельний комплекс'

    return () => {
      document.title = previousTitle
    }
  }, [room])

  function resetDraft() {
    setDraft(createEmptyDraft())
  }

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
            draft={draft}
            onGuestNameChange={(guestName) =>
              setDraft((previous) => ({ ...previous, guestName }))
            }
            onCommentChange={(comment) =>
              setDraft((previous) => ({ ...previous, comment }))
            }
            onNeedsHelpChange={(needsHelp) =>
              setDraft((previous) => ({ ...previous, needsHelp }))
            }
            onReset={resetDraft}
          />

          <BookingSummary
            roomName={room.name}
            draft={draft}
          />

          <AppButton
            variant="secondary"
            onClick={onClearSelection}
          >
            Скасувати вибір номера
          </AppButton>
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
