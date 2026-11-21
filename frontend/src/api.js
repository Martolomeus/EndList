const BASE_URL = '/api/tasks'

async function request(path = '', options = {}) {
  const response = await fetch(BASE_URL + path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }
  // 204 No Content (delete) has no body to parse
  return response.status === 204 ? null : response.json()
}

export const api = {
  list: () => request(),
  create: (task) => request('', { method: 'POST', body: JSON.stringify(task) }),
  update: (id, task) => request(`/${id}`, { method: 'PUT', body: JSON.stringify(task) }),
  complete: (id) => request(`/${id}/complete`, { method: 'POST' }),
  uncomplete: (id) => request(`/${id}/uncomplete`, { method: 'POST' }),
  remove: (id) => request(`/${id}`, { method: 'DELETE' }),
}
