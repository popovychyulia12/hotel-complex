import AppButton from '../ui/AppButton.jsx'
import FormField from '../ui/FormField.jsx'

export default function BookingFormPreview({ idPrefix, roomName }) {
  const nameId = `${idPrefix}-name`
  const commentId = `${idPrefix}-comment`

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <p>Це макет форми бронювання. Дані поки не зберігаються.</p>

      <FormField id={nameId} label="Ім’я гостя">
        <input
          id={nameId}
          name="guestName"
          type="text"
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
          defaultValue=""
          aria-describedby={`${commentId}-hint`}
        />
      </FormField>

      <div className="form-actions">
        <AppButton type="reset" variant="secondary">
          Очистити текст
        </AppButton>

        <AppButton disabled>
          Бронювання буде доступне пізніше
        </AppButton>
      </div>
    </form>
  )
}
