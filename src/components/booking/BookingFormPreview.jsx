
import { ArrowUpRight, RotateCcw } from 'lucide-react'

export default function BookingFormPreview({
  idPrefix,
  roomName,
  draft,
  onFieldChange,
  onReset,
  onSubmit,
  errors = {},
  isSaving = false,
  maxGuests,
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
    <form
      className="booking-modern-form"
      noValidate
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit?.()
      }}
    >
      <div className="booking-fields-grid">
        <div className="booking-field">
          <label htmlFor={fieldId('guestName')}>
            Ім’я гостя *
          </label>

          <input
            id={fieldId('guestName')}
            type="text"
            autoComplete="name"
            placeholder="Введіть ваше ім’я"
            value={draft.guestName ?? ''}
            onChange={(event) =>
              onFieldChange('guestName', event.target.value)
            }
            aria-invalid={Boolean(errors.guestName)}
          />

          {renderError('guestName')}
        </div>

        <div className="booking-field">
          <label htmlFor={fieldId('phone')}>
            Номер телефону *
          </label>

          <input
            id={fieldId('phone')}
            type="tel"
            autoComplete="tel"
            placeholder="+380XXXXXXXXX"
            value={draft.phone ?? ''}
            onChange={(event) =>
              onFieldChange('phone', event.target.value)
            }
            aria-invalid={Boolean(errors.phone)}
          />

          {renderError('phone')}
        </div>

        <div className="booking-field booking-field-full">
          <label htmlFor={fieldId('email')}>
            Електронна пошта *
          </label>

          <input
            id={fieldId('email')}
            type="email"
            autoComplete="email"
            placeholder="example@gmail.com"
            required
            value={draft.email ?? ''}
            onChange={(event) =>
              onFieldChange('email', event.target.value)
            }
            aria-invalid={Boolean(errors.email)}
          />

          {renderError('email')}
        </div>

        <div className="booking-field booking-field-full">
          <label htmlFor={fieldId('room')}>
            Обраний номер
          </label>

          <input
            id={fieldId('room')}
            type="text"
            value={roomName}
            readOnly
          />
        </div>

        <div className="booking-field">
          <label htmlFor={fieldId('checkIn')}>
            Дата заїзду *
          </label>

          <input
            id={fieldId('checkIn')}
            type="date"
            value={draft.checkIn ?? ''}
            onChange={(event) =>
              onFieldChange('checkIn', event.target.value)
            }
            aria-invalid={Boolean(errors.checkIn)}
          />

          {renderError('checkIn')}
        </div>

        <div className="booking-field">
          <label htmlFor={fieldId('checkOut')}>
            Дата виїзду *
          </label>

          <input
            id={fieldId('checkOut')}
            type="date"
            value={draft.checkOut ?? ''}
            onChange={(event) =>
              onFieldChange('checkOut', event.target.value)
            }
            aria-invalid={Boolean(errors.checkOut)}
          />

          {renderError('checkOut')}
        </div>

        <div className="booking-field booking-field-full">
          <label htmlFor={fieldId('guestsCount')}>
            Кількість гостей *
          </label>

          <input
            id={fieldId('guestsCount')}
            type="number"
            min="1"
            max={maxGuests}
            step="1"
            value={draft.guestsCount ?? '1'}
            onChange={(event) =>
              onFieldChange('guestsCount', event.target.value)
            }
            aria-invalid={Boolean(errors.guestsCount)}
          />

          {renderError('guestsCount')}
        </div>

        <div className="booking-field booking-field-full">
          <label htmlFor={fieldId('comment')}>
            Додаткові побажання
          </label>

          <textarea
            id={fieldId('comment')}
            rows={4}
            maxLength={300}
            placeholder="Наприклад, раннє заселення або особливі побажання..."
            value={draft.comment ?? ''}
            onChange={(event) =>
              onFieldChange('comment', event.target.value)
            }
          />

          {renderError('comment')}
        </div>
      </div>

      <label className="booking-help-checkbox">
        <input
          id={fieldId('needsHelp')}
          type="checkbox"
          checked={Boolean(draft.needsHelp)}
          onChange={(event) =>
            onFieldChange('needsHelp', event.target.checked)
          }
        />

        <span>Потрібна допомога адміністратора</span>
      </label>

      <div className="booking-form-actions">
        <button
          type="button"
          className="booking-reset-button"
          onClick={onReset}
          disabled={isSaving}
        >
          <RotateCcw size={17} />
          Очистити форму
        </button>

        <button
          type="submit"
          className="booking-submit-button"
          disabled={isSaving}
        >
          {isSaving
            ? 'Зберігаємо...'
            : 'Зберегти бронювання'}

          {!isSaving && <ArrowUpRight size={18} />}
        </button>
      </div>
    </form>
  )
}
