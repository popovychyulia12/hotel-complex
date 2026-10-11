
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
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

export default function BookingPage({
  room,
  onClearSelection,
  title = 'Підготовка бронювання',
  initialDraft,
  onCancel,
  cancelLabel = 'Скасувати вибір номера',
}) {
  const [draft, setDraft] = useState(() => ({
    ...createEmptyDraft(),
    ...(initialDraft ?? {}),
  }))

  const pageTitle = room
    ? `${title}: ${room.name}`
    : title

  useEffect(() => {
    const previousTitle = document.title
    document.title = `Готельний комплекс: ${pageTitle}`

    return () => {
      document.title = previousTitle
    }
  }, [pageTitle])

  function resetDraft() {
    setDraft({
      ...createEmptyDraft(),
      ...(initialDraft ?? {}),
    })
  }

  const handleCancel = onCancel ?? onClearSelection

  return (
    <Section id="booking" title={title}>
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
              setDraft((previous) => ({
                ...previous,
                guestName,
              }))
            }
            onCommentChange={(comment) =>
              setDraft((previous) => ({
                ...previous,
                comment,
              }))
            }
            onNeedsHelpChange={(needsHelp) =>
              setDraft((previous) => ({
                ...previous,
                needsHelp,
              }))
            }
            onReset={resetDraft}
          />

          <BookingSummary
            roomName={room.name}
            draft={draft}
          />

          <AppButton
            variant="secondary"
            onClick={handleCancel}
          >
            {cancelLabel}
          </AppButton>
        </>
      ) : (
        <EmptyState title="Номер для бронювання не вибрано">
          <p>
            <Link to="/rooms">Переглянути номери</Link>
          </p>
        </EmptyState>
      )}
    </Section>
  )
}
