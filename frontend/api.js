const API_BASE = window.location.origin + '/api';

function getToken() {
  return localStorage.getItem('token');
}

function setToken(token) {
  localStorage.setItem('token', token);
}

function clearAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('loggedIn');
}

function authHeaders() {
  const t = getToken();
  return t ? { 'Authorization': 'Bearer ' + t } : {};
}

async function apiFetch(path, options = {}) {
  const url = API_BASE + path;
  const headers = {
    'Content-Type': 'application/json',
    ...authHeaders(),
    ...(options.headers || {})
  };
  const res = await fetch(url, { ...options, headers });
  if (res.status === 401) {
    clearAuth();
    window.location.replace('login.html');
    throw new Error('Unauthorized');
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Terjadi kesalahan' }));
    throw new Error(err.detail || 'Terjadi kesalahan');
  }
  if (res.status === 204) return null;
  return res.json();
}

const api = {
  login: (data) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  register: (data) => apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(data) }),

  getDashboard: () => apiFetch('/dashboard/'),

  getServices: (params = '') => apiFetch('/services/' + (params ? '?' + params : '')),
  getService: (id) => apiFetch('/services/' + id),
  createService: (data) => apiFetch('/services/', { method: 'POST', body: JSON.stringify(data) }),
  updateService: (id, data) => apiFetch('/services/' + id, { method: 'PUT', body: JSON.stringify(data) }),
  deleteService: (id) => apiFetch('/services/' + id, { method: 'DELETE' }),

  getCustomers: (params = '') => apiFetch('/customers/' + (params ? '?' + params : '')),
  getCustomer: (id) => apiFetch('/customers/' + id),
  createCustomer: (data) => apiFetch('/customers/', { method: 'POST', body: JSON.stringify(data) }),
  deleteCustomer: (id) => apiFetch('/customers/' + id, { method: 'DELETE' }),

  getSpareparts: (params = '') => apiFetch('/spareparts/' + (params ? '?' + params : '')),
  getSparepart: (id) => apiFetch('/spareparts/' + id),
  createSparepart: (data) => apiFetch('/spareparts/', { method: 'POST', body: JSON.stringify(data) }),
  updateSparepart: (id, data) => apiFetch('/spareparts/' + id, { method: 'PUT', body: JSON.stringify(data) }),
  deleteSparepart: (id) => apiFetch('/spareparts/' + id, { method: 'DELETE' }),

  getUsers: (params = '') => apiFetch('/users/' + (params ? '?' + params : '')),
  getUser: (id) => apiFetch('/users/' + id),
  createUser: (data) => apiFetch('/users/', { method: 'POST', body: JSON.stringify(data) }),
  updateUser: (id, data) => apiFetch('/users/' + id, { method: 'PUT', body: JSON.stringify(data) }),
  deleteUser: (id) => apiFetch('/users/' + id, { method: 'DELETE' }),
  getUserLogs: (id) => apiFetch('/users/' + id + '/logs'),
};
