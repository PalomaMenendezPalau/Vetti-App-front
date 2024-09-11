import api from './api';

// Function to create a new user
export const createUser = async (name, lastName, password, email, phoneNumber) => {
  try {
    // Sending POST request to create a new user with the provided data
    const response = await api.post('/user/register', {
      name,
      lastName,
      password,
      email,
      phoneNumber,

    });

    // Assuming the response contains the newly created user data or confirmation
    console.log('User created successfully:', response.data);
    return response.data; // Handle or return the response data
  } catch (error) {
    console.error('Error creating user:', error.response ? error.response.data : error.message);
    throw error; // Handle or throw the error for further action
  }
};
