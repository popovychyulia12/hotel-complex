
import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'

import BookingPage from '../pages/BookingPage.jsx'

// Підміняємо тільки доступність номерів.
// Саму форму та її обробник залишаємо справжніми.
vi.mock('../contexts/useBookings.js', () => ({
  useBookings: () => ({
    getAvailableRooms: () => 6,
  }),
}))

const room = {
  id: 1,
  name: 'Стандарт',
  quantity: 6,
  guests: 2,
  price: 1500,
}

const initialDraft = {
  guestName: 'Тестовий гість',
  phone: '+380991234567',
  checkIn: '2026-11-10',
  checkOut: '2026-11-12',
  guestsCount: '2',
  comment: 'Раннє заселення',
  needsHelp: false,
}

function renderBookingPage(onSave) {
  return render(
    <MemoryRouter>
      <BookingPage
        room={room}
        title="Створення бронювання"
        initialDraft={initialDraft}
        onSave={onSave}
      />
    </MemoryRouter>
  )
}

describe('Асинхронне збереження бронювання', () => {
  it('показує очікування та блокує повторне подання', async () => {
    const user = userEvent.setup()

    let finishSaving

    const onSave = vi.fn(
      () =>
        new Promise((resolve) => {
          finishSaving = resolve
        })
    )

    renderBookingPage(onSave)

    await user.click(
      screen.getByRole('button', {
        name: 'Зберегти бронювання',
      })
    )

    expect(
      screen.getByRole('button', { name: 'Зберігаємо...' })
    ).toBeDisabled()

    expect(onSave).toHaveBeenCalledTimes(1)

    finishSaving({
      success: false,
      error: 'Імітована помилка збереження.',
    })

    await waitFor(() => {
      expect(
        screen.getByText('Імітована помилка збереження.')
      ).toBeInTheDocument()
    })

    expect(
      screen.getByRole('button', {
        name: 'Зберегти бронювання',
      })
    ).toBeEnabled()
  })

  it('зберігає чернетку після відмови сервісу', async () => {
    const user = userEvent.setup()

    const onSave = vi.fn().mockResolvedValue({
      success: false,
      error: 'Сервіс тимчасово недоступний.',
    })

    renderBookingPage(onSave)

    await user.click(
      screen.getByRole('button', {
        name: 'Зберегти бронювання',
      })
    )

    expect(
      await screen.findByText('Сервіс тимчасово недоступний.')
    ).toBeInTheDocument()

    expect(
      screen.getByLabelText(/Ім’я гостя/i)
    ).toHaveValue('Тестовий гість')

    expect(
      screen.getByLabelText(/Номер телефону/i)
    ).toHaveValue('+380991234567')

    expect(
      screen.getByLabelText(/Додаткові побажання/i)
    ).toHaveValue('Раннє заселення')
  })

  it('не викликає сервіс для некоректної форми', async () => {
    const user = userEvent.setup()
    const onSave = vi.fn()

    render(
      <MemoryRouter>
        <BookingPage
          room={room}
          initialDraft={{
            ...initialDraft,
            guestName: 'А',
            phone: '123',
          }}
          onSave={onSave}
        />
      </MemoryRouter>
    )

    await user.click(
      screen.getByRole('button', {
        name: 'Зберегти бронювання',
      })
    )

    expect(
      screen.getByText('Вкажіть ім’я від 2 до 60 символів.')
    ).toBeInTheDocument()

    expect(
      screen.getByText('Введіть телефон у форматі +380XXXXXXXXX.')
    ).toBeInTheDocument()

    expect(onSave).not.toHaveBeenCalled()
  })
})
