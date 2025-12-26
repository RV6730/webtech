// API Configuration
const API_BASE_URL = window.location.origin;

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to set auth token
const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

// Helper function to remove auth token
const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

// Helper function to get user data
const getUserData = () => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

// Helper function to set user data
const setUserData = (user) => {
  localStorage.setItem('userData', JSON.stringify(user));
};

// Helper function to remove user data
const removeUserData = () => {
  localStorage.removeItem('userData');
};

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Add authorization token if available
  const token = getAuthToken();
  if (token) {
    defaultOptions.headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Authentication API
const authAPI = {
  register: async (userData) => {
    const data = await apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (data.token) {
      setAuthToken(data.token);
      setUserData(data.user);
    }
    
    return data;
  },

  login: async (credentials) => {
    const data = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (data.token) {
      setAuthToken(data.token);
      setUserData(data.user);
    }
    
    return data;
  },

  logout: () => {
    removeAuthToken();
    removeUserData();
    window.location.href = '/index.html';
  },

  getProfile: async () => {
    return await apiRequest('/api/auth/profile');
  },

  isAuthenticated: () => {
    return !!getAuthToken();
  }
};

// Candidates API
const candidatesAPI = {
  getAll: async (category = null) => {
    const query = category && category !== 'all' ? `?category=${category}` : '';
    return await apiRequest(`/api/candidates${query}`);
  },

  getById: async (id) => {
    return await apiRequest(`/api/candidates/${id}`);
  },

  create: async (candidateData) => {
    return await apiRequest('/api/candidates', {
      method: 'POST',
      body: JSON.stringify(candidateData),
    });
  },

  update: async (id, candidateData) => {
    return await apiRequest(`/api/candidates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(candidateData),
    });
  },

  delete: async (id) => {
    return await apiRequest(`/api/candidates/${id}`, {
      method: 'DELETE',
    });
  }
};

// Elections API
const electionsAPI = {
  getAll: async (status = null, category = null) => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (category && category !== 'all') params.append('category', category);
    const query = params.toString() ? `?${params.toString()}` : '';
    return await apiRequest(`/api/elections${query}`);
  },

  getById: async (id) => {
    return await apiRequest(`/api/elections/${id}`);
  },

  create: async (electionData) => {
    return await apiRequest('/api/elections', {
      method: 'POST',
      body: JSON.stringify(electionData),
    });
  },

  update: async (id, electionData) => {
    return await apiRequest(`/api/elections/${id}`, {
      method: 'PUT',
      body: JSON.stringify(electionData),
    });
  },

  delete: async (id) => {
    return await apiRequest(`/api/elections/${id}`, {
      method: 'DELETE',
    });
  }
};

// Votes API
const votesAPI = {
  submit: async (voteData) => {
    return await apiRequest('/api/votes', {
      method: 'POST',
      body: JSON.stringify(voteData),
    });
  },

  getMyVotes: async () => {
    return await apiRequest('/api/votes/my-votes');
  },

  checkVoteStatus: async (electionId) => {
    return await apiRequest(`/api/votes/check/${electionId}`);
  },

  getResults: async (electionId) => {
    return await apiRequest(`/api/votes/results/${electionId}`);
  }
};

// Utility functions
const showMessage = (message, type = 'info') => {
  // Create a simple notification
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
    ${type === 'success' ? 'background-color: #4CAF50;' : ''}
    ${type === 'error' ? 'background-color: #f44336;' : ''}
    ${type === 'info' ? 'background-color: #2196F3;' : ''}
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
};

// Check authentication on protected pages
const checkAuth = () => {
  const protectedPages = ['main.html', 'candidates.html', 'vott.html', 'ongoing-elections.html'];
  const currentPage = window.location.pathname.split('/').pop();
  
  if (protectedPages.includes(currentPage) && !authAPI.isAuthenticated()) {
    window.location.href = '/login.html';
  }
};

// Display user info on pages
const displayUserInfo = () => {
  const userDisplay = document.getElementById('userDisplay');
  if (userDisplay) {
    const user = getUserData();
    if (user) {
      userDisplay.textContent = `Welcome, ${user.fullname || user.sen}!`;
    }
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  displayUserInfo();
});
