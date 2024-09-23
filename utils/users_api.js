import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to create a new user
export const createUser = async (name, lastName, password, email, phoneNumber,role) => {
  try {
    // Sending POST request to create a new user with the provided data
    const response = await api.post('/user/register', {
      name,
      lastName,
      password,
      email,
      phoneNumber,
      role,
    });

    // Assuming the response contains the newly created user data or confirmation
    console.log('User created successfully:', response.data);
    return response.data; // Handle or return the response data
  } catch (error) {
    console.error('Error creating user:', error.response ? error.response.data : error.message);
    throw error; // Handle or throw the error for further action
  }
};

// Function to log in a user
export const signInUser = async (email, password) => {
  try {
    // Sending POST request to log in the user with the provided email and password
    const response = await api.post('/user/login', {
      email,
      password,
    });

    // Log the API response for debugging
    console.log('API response:', response.data);

    // Check if the response is successful based on the message or statusCode
    if (response.data.message === 'Success' && response.data.statusCode === 200) {
      // You may want to store other user data like the user ID if token is not available
      const { id, role } = response.data;

      // Store the user data or other info if needed
      await AsyncStorage.setItem('user_id', JSON.stringify(id));
      if (role) {
        await AsyncStorage.setItem('user_role', role);
      }

      // Return the user data or other response info
      return { id, role };
    } else {
      throw new Error('Login failed: Invalid credentials or response format');
    }
  } catch (error) {
    console.error('Error logging in user:', error.response ? error.response.data : error.message);
    throw error; // Handle or throw the error for further action
  }
};