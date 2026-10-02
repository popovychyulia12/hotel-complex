import AppButton from '../ui/AppButton.jsx'
import FormField from '../ui/FormField.jsx'

export default function BookingFormPreview({
  idPrefix,
  roomName,
  draft,
  onGuestNameChange,
  onCommentChange,
  onNeedsHelpChange,
  onReset,
}) {
  const nameId = `${idPrefix}-name`
  const commentId = `${idPrefix}-comment`
  const helpId = `${idPrefix}-help`

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <p>Це макет форми бронювання. Дані поки не зберігаються.</p>

      <FormField id={nameId} label="Ім’я гостя">
        <input
          id={nameId}
          name="guestName"
          type="text"
          value={draft.guestName}
          onChange={(event) => onGuestNameChange(event.target.value)}
        />
      </FormField>

      <FormField id={`${idPrefix}-room`} label="Номер">
        <input
          id={`${idPrefix}-room`}
          name="room"
          type="text"
          value={roomName}
          readOnly
        />
      </FormField>

      <FormField
        id={commentId}
        label="Побажання"
        hint="Наприклад, побажання щодо часу заселення."
      >
        <textarea
          id={commentId}
          name="comment"
          rows={3}
          value={draft.comment}
          onChange={(event) => onCommentChange(event.target.value)}
          aria-describedby={`${commentId}-hint`}
        />
      </FormField>

      <label htmlFor={helpId}>
        <input
          id={helpId}
          type="checkbox"
          checked={draft.needsHelp}
          onChange={(event) => onNeedsHelpChange(event.target.checked)}
        />
        Потрібна допомога адміністратора
      </label>

      <div className="form-actions">
        <AppButton
          type="button"
          variant="secondary"
          onClick={onReset}
        >
          Очистити форму
        </AppButton>

        <AppButton disabled>
          Бронювання буде доступне пізніше
        </AppButton>
      </div>
    </form>
  )
}
