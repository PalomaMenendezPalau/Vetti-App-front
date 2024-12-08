import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserData } from './storage'; // Import function to retrieve user data

// Function to create a new user
export const createUser = async (name, lastName, dni, email, phoneNumber, password, role) => {
  try {
    // Sending POST request to create a new user with the provided data
    const response = await api.post('/user/register', {
      name,
      lastName,
      dni,
      email,
      phoneNumber,
      password,
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
    if (response.data.statusCode === 200) {
      // You may want to store other user data like the user ID if token is not available
      const { id, role , email } = response.data;
     

      // Store the user data or other info if needed
      await AsyncStorage.setItem('user_id', JSON.stringify(id));
      if (role && email) {
        await AsyncStorage.setItem('user_role', role);
        await AsyncStorage.setItem('user_email', email);
      }

      // Return the user data or other response info
      return { id, role , email };
    } else {
      throw new Error('Login failed: Invalid credentials or response format');
    }
  } catch (error) {
    console.error('Error logging in user:', error.response ? error.response.data : error.message);
    throw error; // Handle or throw the error for further action
  }
};

// Function to fetch user details using the stored user ID
export const fetchUserDetails = async () => {
  try {
    // Retrieve the user ID from AsyncStorage using getUserData
    const { userId } = await getUserData();

    if (!userId) {
      throw new Error('User ID not found in storage.');
    }

    // Make a GET request to fetch user details by user ID
    const response = await api.get(`/user/searchUserById/${userId}`);

    // Log the API response for debugging
    console.log('User details fetched successfully:', response.data);

    // Return the user details data
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching user details:',
      error.response ? error.response.data : error.message
    );
    throw error; // Handle or throw the error for further action
  }
};

// Function to update a user using PATCH
export const updateUser = async (userId, updatedData) => {
  try {
    // Sending PATCH request to update user data using the user ID
    const response = await api.patch(`/user/updateUser/${userId}`, updatedData);

    // Log the API response for debugging
    console.log('User updated successfully:', response.data);

    // Return the updated user data or confirmation
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error.response ? error.response.data : error.message);
    throw error; // Handle or throw the error for further action
  }
};

// Function to add a pet for a specific user
export const addPet = async (name, type , birthday) => {
  try {
    // Retrieve the user ID from storage
    const { userId } = await getUserData();

    if (!userId) {
      throw new Error('User ID not found in storage.');
    }

    // Sending POST request to add a new pet
    const response = await api.post(`/pets/addPet/${userId}`, {
      name,
      type,
      birthday
    });

    // Log the response for debugging purposes
    console.log('Pet added successfully:', response.data);


    // Return the response data
    return response.data;
  } catch (error) {
    console.error('Error adding pet:', error.response ? error.response.data : error.message);
    throw error; // Handle or propagate the error
  }
};


// Function to fetch active appointments for the logged-in user
export const getActiveAppointments = async () => {
  try {
    // Retrieve the user email from storage
    const { userEmail } = await getUserData();

    if (!userEmail) {
      throw new Error('User email not found in storage.');
    }

    // Construct the endpoint
    const endpoint = `/calendly/user/appointments/${userEmail}?status=active`;

    // Make the GET request to fetch active appointments
    const response = await api.get(endpoint);

    // Log and return the response
    console.log('Active Appointments:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching active appointments:', error.response ? error.response.data : error.message);
    throw error; // Handle or propagate the error
  }
};

// Function to delete a pet by ID
export const deletePet = async (petId) => {
  try {
    if (!petId) {
      throw new Error('Pet ID is required.');
    }

    // Sending DELETE request to remove a pet by its ID
    const response = await api.delete(`/pets/delete/${petId}`);

    // Log the response for debugging purposes
    console.log('Pet deleted successfully:', response.data);

    // Return the response data
    return response.data;
  } catch (error) {
    console.error('Error deleting pet:', error.response ? error.response.data : error.message);
    throw error; // Handle or propagate the error
  }
};

export const cancelEvent = async (eventId, reason) => {
  try {
    // Make POST request to cancel the event
    const response = await api.post('/calendly/scheduled_events/cancellation', {
      eventId,
      reason,
    });

    // Log the response for debugging
    console.log('Event canceled successfully:', response.data);

    return response.data; // Return the response data
  } catch (error) {
    console.error('Error canceling event:', error.response ? error.response.data : error.message);
    throw error; // Handle or propagate the error
  }
};

export const requestPasswordReset = async (email) => {
  try {
    // Sending POST request to request a password reset
    const response = await api.post('/api/password/request/email', {
      email,
    });

    // Log the response for debugging purposes
    console.log('Password reset request sent successfully:', response.data);

    return response.data; // Return the response data (if any)
  } catch (error) {
    console.error('Error sending password reset request:', error.response ? error.response.data : error.message);
    throw error; // Handle or propagate the error
  }
};

export const resetPassword = async (email, code, newPassword) => {
  try {
    const response = await api.post('/api/password/reset', {
      email,
      code,
      newPassword
    });

    console.log('Password reset successfully:', response.data);
    return response.data; // Returning the response data if needed
  } catch (error) {
    console.error('Error resetting password:', error.response ? error.response.data : error.message);
    throw error; // Handle or propagate the error for further action
  }
};
