import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://vetti-app.onrender.com';

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

// Function to refresh token if expired
const refreshToken = async () => {
  const refresh_token = await AsyncStorage.getItem('refresh_token');
  
  if (refresh_token) {
    const response = await axios.post(`${BASE_URL}/oauth/token`, {
      grant_type: 'client_credentials',
      client_id: 'Dgd31Xpn0ppSkXsDV3hWLGWlBoS96Mnr',
      client_secret: 'cpKh3VKN_-trH6OCOUgWMYkQHBu9_C5ywqByFefrdCZjMGFfK8IdxB9gMW63tYS7',
      audience: 'https://dev-k1n7shfb1jvuxkvz.us.auth0.com/api/v2/',
      refresh_token,
    });

    const { access_token } = response.data;
    await AsyncStorage.setItem('access_token', access_token);

    return access_token;
  }
  throw new Error('No refresh token available');
};

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if token has expired and try to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshToken();
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default api;
