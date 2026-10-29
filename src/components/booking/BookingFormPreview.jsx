
import AppButton from '../ui/AppButton.jsx'
import FormField from '../ui/FormField.jsx'

export default function BookingFormPreview({
  idPrefix,
  roomName,
  draft,
  onFieldChange,
  onReset,
  onSubmit,
  errors = {},
  isSaving = false,
}) {
  const fieldId = (name) => `${idPrefix}-${name}`

  function renderError(name) {
    return errors[name] ? (
      <p className="field-error" role="alert">
        {errors[name]}
      </p>
    ) : null
  }

  return (
    <form onSubmit={(event) => {
      event.preventDefault()
      onSubmit?.()
    }}>
      <h3>Дані для бронювання</h3>

      <FormField id={fieldId('guestName')} label="Ім’я гостя *">
        <input
          id={fieldId('guestName')}
          type="text"
          value={draft.guestName ?? ''}
          onChange={(e) => onFieldChange('guestName', e.target.value)}
          aria-invalid={Boolean(errors.guestName)}
        />
        {renderError('guestName')}
      </FormField>

      <FormField id={fieldId('phone')} label="Номер телефону *">
        <input
          id={fieldId('phone')}
          type="tel"
          placeholder="+380XXXXXXXXX"
          value={draft.phone ?? ''}
          onChange={(e) => onFieldChange('phone', e.target.value)}
          aria-invalid={Boolean(errors.phone)}
        />
        {renderError('phone')}
      </FormField>

      <FormField id={fieldId('room')} label="Обраний номер">
        <input
          id={fieldId('room')}
          type="text"
          value={roomName}
          readOnly
        />
      </FormField>

      <FormField id={fieldId('checkIn')} label="Дата заїзду *">
        <input
          id={fieldId('checkIn')}
          type="date"
          value={draft.checkIn ?? ''}
          onChange={(e) => onFieldChange('checkIn', e.target.value)}
          aria-invalid={Boolean(errors.checkIn)}
        />
        {renderError('checkIn')}
      </FormField>

      <FormField id={fieldId('checkOut')} label="Дата виїзду *">
        <input
          id={fieldId('checkOut')}
          type="date"
          value={draft.checkOut ?? ''}
          onChange={(e) => onFieldChange('checkOut', e.target.value)}
          aria-invalid={Boolean(errors.checkOut)}
        />
        {renderError('checkOut')}
      </FormField>

      <FormField id={fieldId('guestsCount')} label="Кількість гостей *">
        <input
          id={fieldId('guestsCount')}
          type="number"
          min="1"
          step="1"
          value={draft.guestsCount ?? 1}
          onChange={(e) => onFieldChange('guestsCount', e.target.value)}
          aria-invalid={Boolean(errors.guestsCount)}
        />
        {renderError('guestsCount')}
      </FormField>

      <FormField
        id={fieldId('comment')}
        label="Додаткові побажання"
        hint="Наприклад, раннє заселення або особливі побажання."
      >
        <textarea
          id={fieldId('comment')}
          rows={3}
          maxLength={300}
          value={draft.comment ?? ''}
          onChange={(e) => onFieldChange('comment', e.target.value)}
        />
        {renderError('comment')}
      </FormField>

      <label htmlFor={fieldId('needsHelp')}>
        <input
          id={fieldId('needsHelp')}
          type="checkbox"
          checked={draft.needsHelp ?? false}
          onChange={(e) => onFieldChange('needsHelp', e.target.checked)}
        />
        Потрібна допомога адміністратора
      </label>

      
<div className="form-actions">
  <AppButton
    type="button"
    variant="secondary"
    onClick={onReset}
    disabled={isSaving}
  >
    Очистити форму
  </AppButton>

  <AppButton type="submit" disabled={isSaving}>
  {isSaving ? 'Зберігаємо...' : 'Зберегти бронювання'}
</AppButton>
</div>

    </form>
  )
}
