/**
 * API Helper Functions
 */

const API_BASE_URL = '/backend/api/v1';

// Get auth token from localStorage
function getAuthToken() {
  return localStorage.getItem('auth_token');
}

// Set auth token
function setAuthToken(token) {
  localStorage.setItem('auth_token', token);
}

// Remove auth token
function removeAuthToken() {
  localStorage.removeItem('auth_token');
}

// Make API request
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  if (token) {
    defaultOptions.headers['Authorization'] = `Bearer ${token}`;
  }
  
  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(options.headers || {}),
    },
  };
  
  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      if (response.status === 401) {
        // Unauthorized - redirect to login
        removeAuthToken();
        if (window.location.pathname !== '/admin/login.html') {
          window.location.href = '/admin/login.html';
        }
      }
      throw new Error(data.message || 'An error occurred');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// API Methods
const API = {
  // Authentication
  login: async (email, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  
  logout: async () => {
    const result = await apiRequest('/auth/logout', {
      method: 'POST',
    });
    removeAuthToken();
    return result;
  },
  
  // Dealers (Super Admin)
  getDealers: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/dealers${query ? '?' + query : ''}`);
  },
  
  getDealer: async (id) => {
    return apiRequest(`/dealers/${id}`);
  },
  
  createDealer: async (data) => {
    return apiRequest('/dealers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  updateDealer: async (id, data) => {
    return apiRequest(`/dealers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  deleteDealer: async (id) => {
    return apiRequest(`/dealers/${id}`, {
      method: 'DELETE',
    });
  },
  
  suspendDealer: async (id) => {
    return apiRequest(`/dealers/${id}/suspend`, {
      method: 'PATCH',
    });
  },
  
  activateDealer: async (id) => {
    return apiRequest(`/dealers/${id}/activate`, {
      method: 'PATCH',
    });
  },
  
  // Dealer Profile (Dealer Admin)
  getDealerProfile: async () => {
    return apiRequest('/dealer/profile');
  },
  
  updateDealerProfile: async (data) => {
    return apiRequest('/dealer/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  uploadDealerLogo: async (file) => {
    const formData = new FormData();
    formData.append('logo', file);
    
    return apiRequest('/dealer/logo', {
      method: 'POST',
      headers: {}, // Let browser set Content-Type for FormData
      body: formData,
    });
  },
  
  // Cars
  getCars: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/cars${query ? '?' + query : ''}`);
  },
  
  getCar: async (id) => {
    return apiRequest(`/cars/${id}`);
  },
  
  createCar: async (data) => {
    return apiRequest('/cars', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  updateCar: async (id, data) => {
    return apiRequest(`/cars/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  deleteCar: async (id) => {
    return apiRequest(`/cars/${id}`, {
      method: 'DELETE',
    });
  },
  
  toggleCarStatus: async (id) => {
    return apiRequest(`/cars/${id}/toggle`, {
      method: 'PATCH',
    });
  },
  
  uploadCarImages: async (carId, files) => {
    const formData = new FormData();
    Array.from(files).forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });
    
    return apiRequest(`/cars/${carId}/images`, {
      method: 'POST',
      headers: {},
      body: formData,
    });
  },
  
  deleteCarImage: async (imageId) => {
    return apiRequest(`/cars/images/${imageId}`, {
      method: 'DELETE',
    });
  },
  
  // Public API (No Auth)
  getPublicDealerInfo: async (subdomain) => {
    return fetch(`${API_BASE_URL}/public/${subdomain}/info`).then(res => res.json());
  },
  
  getPublicCars: async (subdomain, params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetch(`${API_BASE_URL}/public/${subdomain}/cars${query ? '?' + query : ''}`)
      .then(res => res.json());
  },
  
  getPublicCar: async (subdomain, carId) => {
    return fetch(`${API_BASE_URL}/public/${subdomain}/car/${carId}`)
      .then(res => res.json());
  },
  
  // Subscriptions
  checkSubscription: async (dealerId) => {
    return apiRequest(`/subscriptions/check/${dealerId}`);
  },
  
  renewSubscription: async (data) => {
    return apiRequest('/subscriptions/renew', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  getSubscriptionLogs: async (dealerId) => {
    return apiRequest(`/subscriptions/logs/${dealerId}`);
  },
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = API;
} else {
  window.API = API;
}
