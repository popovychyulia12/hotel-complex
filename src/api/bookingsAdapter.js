
import { mockBookingsAdapter } from './mockBookingsAdapter.js'
import { apiBookingsAdapter } from './apiBookingsAdapter.js'
import { firebaseBookingsAdapter } from './firebaseBookingsAdapter.js'

const requestedMode = import.meta.env.VITE_DATA_MODE || 'mock'

if (!['mock', 'api', 'firebase'].includes(requestedMode)) {
  throw new Error(
    `Невідомий режим даних: ${requestedMode}`
  )
}

export const dataMode = requestedMode

export const bookingsAdapter =
  dataMode === 'firebase'
    ? firebaseBookingsAdapter
    : dataMode === 'api'
      ? apiBookingsAdapter
      : mockBookingsAdapter
