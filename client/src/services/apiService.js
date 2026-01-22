// apiService.js
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

console.log('API Base URL configured as:', API_BASE_URL);
console.log('Environment:', process.env.NODE_ENV);

// Helper function to safely parse JSON response
const safeJsonParse = async (response) => {
  const contentType = response.headers.get("content-type");
  
  if (contentType && contentType.includes("application/json")) {
    try {
      const data = await response.json();
      console.log('Successfully parsed JSON response:', data);
      return data;
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      // Return text content if JSON parsing fails
      const text = await response.text();
      console.log('Raw response text:', text);
      return { message: `Parse error: ${text.substring(0, 200)}`, error: parseError.message, rawText: text };
    }
  } else {
    // If not JSON, return text content
    const text = await response.text();
    console.log('Non-JSON response text:', text);
    return { message: text.substring(0, 500), contentType: contentType, rawText: text };
  }
};

export const authService = {
  login: async (credentials) => {
    console.log('Making login request to:', `${API_BASE_URL}/auth/login`);
    console.log('Credentials:', { ...credentials, password: '[REDACTED]' });
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      
      console.log('Login response received:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      // Use the safe parser
      const data = await safeJsonParse(response);
      console.log('Parsed response data:', data);
      
      // Store the original response status and data
      response.parsedData = data;
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
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      console.log('Register response received:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      // Use the safe parser
      const data = await safeJsonParse(response);
      console.log('Parsed response data:', data);
      
      // Store the original response status and data
      response.parsedData = data;
      return response;
    } catch (error) {
      console.error('Register request failed:', error);
      throw error;
    }
  }
};

export const eventService = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/events`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    return await safeJsonParse(response);
  },
  create: async (eventData) => {
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(eventData)
    });
    if (!response.ok) {
      throw new Error('Failed to create event');
    }
    return await safeJsonParse(response);
  },
  // ... other methods
};

export const projectService = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    return await safeJsonParse(response);
  },
  create: async (projectData) => {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(projectData)
    });
    if (!response.ok) {
      throw new Error('Failed to create project');
    }
    return await safeJsonParse(response);
  },
  // ... other methods
};