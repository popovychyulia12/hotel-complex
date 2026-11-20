
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'

import RoomSelectionProvider from '../providers/RoomSelectionProvider.jsx'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router'

import {
  act,
  render,
  screen,
  waitFor,
} from '@testing-library/react'

import { BookingsProvider } from '../contexts/BookingsContext.jsx'
import BookingsPage from '../pages/BookingsPage.jsx'
import BookingDetailsPage from '../pages/BookingDetailsPage.jsx'
import BookingCreatePage from '../pages/BookingCreatePage.jsx'

const adapter = vi.hoisted(() => ({
  getAll: vi.fn(),
  getById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
}))

vi.mock('../api/bookingsAdapter.js', () => ({
  bookingsAdapter: adapter,
}))

const booking = {
  id: 'test-booking-1',
  guestName: 'Тестовий гість',
  phone: '+380991234567',
  email: 'test@example.com',
  roomId: 1,
  roomName: 'Стандарт двомісний',
  checkIn: '2026-12-10',
  checkOut: '2026-12-12',
  guestsCount: 2,
  comment: '',
  needsHelp: false,
}

function renderApp(initialPath = '/bookings') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <RoomSelectionProvider>
        <BookingsProvider>
          <Routes>
            <Route
              path="/bookings"
              element={<BookingsPage />}
            />
            <Route
              path="/bookings/new"
              element={<BookingCreatePage />}
            />
            <Route
              path="/bookings/:bookingId"
              element={<BookingDetailsPage />}
            />
            <Route
              path="/rooms"
              element={<h1>Каталог номерів</h1>}
            />
            <Route
              path="*"
              element={<h1>Сторінку не знайдено</h1>}
            />
          </Routes>
        </BookingsProvider>
      </RoomSelectionProvider>
    </MemoryRouter>
  )
}

describe('Інтеграція бронювань', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    adapter.getAll.mockResolvedValue([booking])
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('завантажує бронювання через провайдер', async () => {
    renderApp()

    expect(
      await screen.findByText('Тестовий гість')
    ).toBeInTheDocument()

    expect(adapter.getAll).toHaveBeenCalled()
  })

  it('не показує записи до завершення завантаження', async () => {
    let finishLoading

    adapter.getAll.mockImplementation(
      () =>
        new Promise((resolve) => {
          finishLoading = resolve
        })
    )

    renderApp()

    await waitFor(() => {
      expect(adapter.getAll).toHaveBeenCalled()
    })

    expect(
      screen.queryByText('Тестовий гість')
    ).not.toBeInTheDocument()

    expect(
      screen.queryByText(/У вас поки немає бронювань/i)
    ).not.toBeInTheDocument()

    await act(async () => {
      finishLoading([booking])
    })

    expect(
      await screen.findByText('Тестовий гість')
    ).toBeInTheDocument()
  })

  it('показує помилку та дозволяє повторити запит', async () => {
    const user = userEvent.setup()

    adapter.getAll
      .mockRejectedValueOnce(
        new Error('Тестова помилка завантаження')
      )
      .mockResolvedValueOnce([booking])

    renderApp()

    expect(
      await screen.findByText(
        'Тестова помилка завантаження'
      )
    ).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', {
        name: 'Спробувати ще раз',
      })
    )

    expect(
      await screen.findByText('Тестовий гість')
    ).toBeInTheDocument()

    expect(adapter.getAll).toHaveBeenCalledTimes(2)
  })

  it('показує порожній список після завантаження', async () => {
    adapter.getAll.mockResolvedValue([])

    renderApp()

    expect(
      await screen.findByText(
        /У вас поки немає бронювань/i
      )
    ).toBeInTheDocument()
  })

  it('показує відсутній запис для невідомого ID', async () => {
    renderApp('/bookings/unknown-id')

    expect(
      await screen.findByText(
        /Бронювання не знайдено/i
      )
    ).toBeInTheDocument()
  })

  it('показує сторінку 404 для невідомого маршруту', async () => {
    renderApp('/unknown-page')

    expect(
      screen.getByText('Сторінку не знайдено')
    ).toBeInTheDocument()

    await waitFor(() => {
      expect(adapter.getAll).toHaveBeenCalledTimes(1)
    })
  })

  it('відкриває деталі бронювання зі списку', async () => {
    const user = userEvent.setup()

    renderApp()

    await screen.findByText('Тестовий гість')

    await user.click(
      screen.getByRole('link', {
        name: 'Детальніше',
      })
    )

    expect(
      await screen.findByRole('heading', {
        name: /ДЕТАЛІ ВАШОГО/i,
      })
    ).toBeInTheDocument()
  })

  it('створює бронювання через форму та відображає його у списку', async () => {
    const user = userEvent.setup()

    adapter.getAll.mockResolvedValue([])

    adapter.create.mockImplementation(async (data) => ({
      ...data,
      id: 'new-test-booking',
    }))

    renderApp('/bookings/new?roomId=1')

    await screen.findByRole('heading', {
      name: /ВАШ ІДЕАЛЬНИЙ/i,
    })

    await user.type(
      screen.getByLabelText(/Ім’я гостя/i),
      'Марія Тестова'
    )

    await user.type(
      screen.getByLabelText(/Номер телефону/i),
      '+380991234567'
    )

    await user.type(
      screen.getByLabelText(/Електронна пошта/i),
      'maria@example.com'
    )

    await user.type(
      screen.getByLabelText(/Дата заїзду/i),
      '2026-12-10'
    )

    await user.type(
      screen.getByLabelText(/Дата виїзду/i),
      '2026-12-12'
    )

    await user.click(
      screen.getByRole('button', {
        name: 'Зберегти бронювання',
      })
    )

    await waitFor(() => {
      expect(adapter.create).toHaveBeenCalledTimes(1)
    })

    expect(
      await screen.findByText('Марія Тестова')
    ).toBeInTheDocument()
  })
})
