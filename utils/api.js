import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://vetti-app.onrender.com';
const TOKEN_URL = 'https://dev-k1n7shfb1jvuxkvz.us.auth0.com/oauth/token';

// Create an axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// Interceptor to add token to every request
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to get a new access token
const getNewToken = async () => {
  try {
    const response = await axios.post(TOKEN_URL, {
      grant_type: 'client_credentials',
      client_id: 'Dgd31Xpn0ppSkXsDV3hWLGWlBoS96Mnr',
      client_secret: 'cpKh3VKN_-trH6OCOUgWMYkQHBu9_C5ywqByFefrdCZjMGFfK8IdxB9gMW63tYS7',
      audience: 'https://dev-k1n7shfb1jvuxkvz.us.auth0.com/api/v2/'
    });

    const { access_token, expires_in } = response.data;
    
    // Store the new access token and its expiration time
    await AsyncStorage.setItem('access_token', access_token);

    return access_token;
  } catch (error) {
    console.error('Error obtaining new token:', error);
    throw error;
  }
};

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If token has expired (401 Unauthorized), request a new one
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await getNewToken();
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default api;
