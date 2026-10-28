
const API_URL = import.meta.env.VITE_API_URL

async function request(path, options = {}) {
  if (!API_URL) {
    throw new Error(
      'Не задано VITE_API_URL для підключення API.'
    )
  }

  let response

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })
  } catch {
    throw new Error(
      'Не вдалося підключитися до сервера.'
    )
  }

  if (response.status === 404) {
    if (options.method === undefined || options.method === 'GET') {
      if (path !== '/bookings') {
        return null
      }
    }

    throw new Error('Запис або ресурс API не знайдено.')
  }

  if (!response.ok) {
    throw new Error(
      `Помилка API: ${response.status}`
    )
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export const apiBookingsAdapter = {
  getAll() {
    return request('/bookings')
  },

  getById(id) {
    return request(`/bookings/${encodeURIComponent(id)}`)
  },

  create(data) {
    return request('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  update(id, data) {
    return request(`/bookings/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  async delete(id) {
    const result = await request(
      `/bookings/${encodeURIComponent(id)}`,
      { method: 'DELETE' }
    )

    return result ?? { success: true, id }
  },
}
