
import AppButton from '../ui/AppButton.jsx'
import FormField from '../ui/FormField.jsx'

export default function RoomFilters({
  query,
  availableOnly,
  onReset,
}) {
  return (
    <form
      key={`${query}-${availableOnly}`}
      className="room-filters"
      method="get"
      action="/rooms"
    >
      <FormField id="room-query" label="Пошук за назвою">
        <input
          id="room-query"
          type="search"
          name="q"
          defaultValue={query}
        />
      </FormField>

      <label className="checkbox-field">
        <input
          type="checkbox"
          name="available"
          value="1"
          defaultChecked={availableOnly}
        />
        Лише доступні
      </label>

      <button type="submit">Застосувати фільтри</button>

      <AppButton
        type="button"
        variant="secondary"
        onClick={onReset}
      >
        Скинути фільтри
      </AppButton>
    </form>
  )
}
