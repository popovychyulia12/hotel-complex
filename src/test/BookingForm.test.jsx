
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookingFormPreview from '../components/booking/BookingFormPreview.jsx'

function TestForm({
  isSaving = false,
  errors = {},
  onSubmit = vi.fn(),
}) {
  const [draft, setDraft] = useState({
    guestName: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guestsCount: '1',
    comment: '',
    needsHelp: false,
  })

  function handleFieldChange(name, value) {
    setDraft((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  return (
    <BookingFormPreview
      idPrefix="test-booking"
      roomName="Стандарт"
      draft={draft}
      errors={errors}
      isSaving={isSaving}
      onFieldChange={handleFieldChange}
      onReset={() =>
        setDraft({
          guestName: '',
          phone: '',
          checkIn: '',
          checkOut: '',
          guestsCount: '1',
          comment: '',
          needsHelp: false,
        })
      }
      onSubmit={onSubmit}
    />
  )
}

describe('Форма бронювання', () => {
  it('дозволяє вводити дані гостя', async () => {
    const user = userEvent.setup()

    render(<TestForm />)

    const nameInput = screen.getByLabelText(/Ім’я гостя/i)
    const phoneInput = screen.getByLabelText(/Номер телефону/i)

    await user.type(nameInput, 'Юлія Попович')
    await user.type(phoneInput, '+380991234567')

    expect(nameInput).toHaveValue('Юлія Попович')
    expect(phoneInput).toHaveValue('+380991234567')
  })

  it('відображає повідомлення про помилки полів', () => {
    render(
      <TestForm
        errors={{
          guestName: 'Вкажіть ім’я від 2 до 60 символів.',
          phone: 'Введіть телефон у форматі +380XXXXXXXXX.',
        }}
      />
    )

    expect(
      screen.getByText('Вкажіть ім’я від 2 до 60 символів.')
    ).toBeInTheDocument()

    expect(
      screen.getByText('Введіть телефон у форматі +380XXXXXXXXX.')
    ).toBeInTheDocument()
  })

  it('блокує кнопки під час збереження', () => {
    render(<TestForm isSaving={true} />)

    expect(
      screen.getByRole('button', { name: /Зберігаємо/i })
    ).toBeDisabled()

    expect(
      screen.getByRole('button', { name: /Очистити форму/i })
    ).toBeDisabled()
  })

  it('зберігає введені дані після повторного рендеру', async () => {
    const user = userEvent.setup()

    const { rerender } = render(<TestForm />)

    const nameInput = screen.getByLabelText(/Ім’я гостя/i)

    await user.type(nameInput, 'Тестовий гість')

    rerender(
      <TestForm
        errors={{
          phone: 'Некоректний номер телефону.',
        }}
      />
    )

    expect(nameInput).toHaveValue('Тестовий гість')
    expect(
      screen.getByText('Некоректний номер телефону.')
    ).toBeInTheDocument()
  })
})
