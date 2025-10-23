import type {
  LoginFormData,
  RegisterFormData,
  WeddingSiteFormData,
} from './validations';

// Auth Services
export const authService = {
  async login(data: LoginFormData) {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Login failed');
    }

    return result;
  },

  async register(data: RegisterFormData) {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Registration failed');
    }

    return result;
  },

  async logout() {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    return response.json();
  },
};

// Wedding Site Services
export const weddingSiteService = {
  async get() {
    const response = await fetch('/api/wedding/site');

    if (!response.ok) {
      throw new Error('Failed to fetch wedding site');
    }

    return response.json();
  },

  async save(data: WeddingSiteFormData) {
    const response = await fetch('/api/wedding/site', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        weddingDate: data.weddingDate?.toISOString(),
        events: data.events.map((e) => ({
          ...e,
          date: e.date.toISOString(),
        })),
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to save wedding site');
    }

    return result;
  },
};

// RSVP Services
export const rsvpService = {
  async getList() {
    const response = await fetch('/api/rsvp/list');

    if (!response.ok) {
      throw new Error('Failed to fetch RSVPs');
    }

    return response.json();
  },

  async exportCSV() {
    const response = await fetch('/api/rsvp/export');

    if (!response.ok) {
      throw new Error('Failed to export RSVPs');
    }

    return response.blob();
  },
};
