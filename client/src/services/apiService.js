// apiService.js
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

console.log('API Base URL configured as:', API_BASE_URL);
console.log('Environment:', process.env.NODE_ENV);

export const authService = {
  login: async (credentials) => {
    console.log('Making login request to:', `${API_BASE_URL}/auth/login`);
    console.log('Credentials:', { ...credentials, password: '[REDACTED]' });
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      console.log('Login response received:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      return response;
    } catch (error) {
      console.error('Login request failed:', error);
      throw error;
    }
  },
  register: async (userData) => {
    console.log('Making register request to:', `${API_BASE_URL}/auth/register`);
    console.log('User data:', { ...userData, password: '[REDACTED]' });
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      console.log('Register response received:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      return response;
    } catch (error) {
      console.error('Register request failed:', error);
      throw error;
    }
  }
};

export const eventService = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/events`);
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    return response.json();
  },
  create: async (eventData) => {
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData)
    });
    if (!response.ok) {
      throw new Error('Failed to create event');
    }
    return response.json();
  },
  update: async (id, eventData) => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData)
    });
    if (!response.ok) {
      throw new Error('Failed to update event');
    }
    return response.json();
  },
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete event');
    }
    return response.json();
  }
};

export const projectService = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/projects`);
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    return response.json();
  },
  create: async (projectData) => {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData)
    });
    if (!response.ok) {
      throw new Error('Failed to create project');
    }
    return response.json();
  },
  update: async (id, projectData) => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData)
    });
    if (!response.ok) {
      throw new Error('Failed to update project');
    }
    return response.json();
  },
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete project');
    }
    return response.json();
  }
};