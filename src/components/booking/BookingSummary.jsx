export default function BookingSummary({ roomName, draft }) {
  return (
    <div className="booking-summary">
      <h3>Підсумок бронювання</h3>

      <p>
        Номер: <strong>{roomName}</strong>
      </p>

      <p>
        Гість: <strong>{draft.guestName || 'Не вказано'}</strong>
      </p>

      <p>
        Побажання: <strong>{draft.comment || 'Немає'}</strong>
      </p>

      <p>
        Допомога адміністратора:{' '}
        <strong>{draft.needsHelp ? 'Так' : 'Ні'}</strong>
      </p>

      <p>Це лише попередній перегляд. Бронювання ще не створюється.</p>
    </div>
  )
}
