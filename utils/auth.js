import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://vetti-app.onrender.com';
const TOKEN_URL = `https://dev-k1n7shfb1jvuxkvz.us.auth0.com/oauth/token`;

export const getToken = async (email, password) => {
  try {
    const response = await axios.post(TOKEN_URL, {
      grant_type: 'client_credentials',     
      client_id: 'Dgd31Xpn0ppSkXsDV3hWLGWlBoS96Mnr',
      client_secret: 'cpKh3VKN_-trH6OCOUgWMYkQHBu9_C5ywqByFefrdCZjMGFfK8IdxB9gMW63tYS7',
      audience: 'https://dev-k1n7shfb1jvuxkvz.us.auth0.com/api/v2/'
    });

    // Assuming the response contains access_token and refresh_token
    const { access_token, refresh_token } = response.data;

    // Store tokens securely
    await AsyncStorage.setItem('access_token', access_token);
    await AsyncStorage.setItem('refresh_token', refresh_token);

    return access_token;
  } catch (error) {
    console.error('Error obtaining token:', error);
    throw error;
  }
};