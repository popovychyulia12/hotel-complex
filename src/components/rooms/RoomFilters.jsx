import AppButton from '../ui/AppButton.jsx'
import FormField from '../ui/FormField.jsx'

export default function RoomFilters({
  query,
  availableOnly,
  onQueryChange,
  onAvailableOnlyChange,
  onReset,
}) {
  return (
    <div className="room-filters">
      <FormField id="room-query" label="Пошук за назвою">
        <input
          id="room-query"
          type="search"
          name="query"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </FormField>

      <label className="checkbox-field">
        <input
          type="checkbox"
          checked={availableOnly}
          onChange={(event) => onAvailableOnlyChange(event.target.checked)}
        />
        Лише доступні
      </label>

      <AppButton variant="secondary" onClick={onReset}>
        Скинути фільтри
      </AppButton>
    </div>
  )
}
