import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserData } from './storage'; 

export const createUser = async (name, lastName, dni, email, phoneNumber, password, role) => {
  try {
    const response = await api.post('/user/register', {
      name,
      lastName,
      dni,
      email,
      phoneNumber,
      password,
      role,
    });

    console.log('User created successfully:', response.data);
    return response.data; 
  } catch (error) {
    console.error('Error creating user:', error.response ? error.response.data : error.message);
    throw error; 
  }
};

export const signInUser = async (email, password) => {
  try {
    const response = await api.post('/user/login', {
      email,
      password,
    });

    console.log('API response:', response.data);

    if (response.data.statusCode === 200) {
      const { id, role , email } = response.data;
     
      await AsyncStorage.setItem('user_id', JSON.stringify(id));
      if (role && email) {
        await AsyncStorage.setItem('user_role', role);
        await AsyncStorage.setItem('user_email', email);
      }

      return { id, role , email };
    } else {
      throw new Error('Login failed: Invalid credentials or response format');
    }
  } catch (error) {
    console.error('Error logging in user:', error.response ? error.response.data : error.message);
    throw error; 
  }
};

export const fetchUserDetails = async () => {
  try {
    const { userId } = await getUserData();

    if (!userId) {
      throw new Error('User ID not found in storage.');
    }

    const response = await api.get(`/user/searchUserById/${userId}`);

    console.log('User details fetched successfully:', response.data);

    return response.data;
  } catch (error) {
    console.error(
      'Error fetching user details:',
      error.response ? error.response.data : error.message
    );
    throw error; 
  }
};

export const updateUser = async (userId, updatedData) => {
  try {
    const response = await api.patch(`/user/updateUser/${userId}`, updatedData);

    console.log('User updated successfully:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error updating user:', error.response ? error.response.data : error.message);
    throw error; 
  }
};


export const addPet = async (name, type , birthday) => {
  try {
    const { userId } = await getUserData();

    if (!userId) {
      throw new Error('User ID not found in storage.');
    }

    const response = await api.post(`/pets/addPet/${userId}`, {
      name,
      type,
      birthday
    });


    console.log('Pet added successfully:', response.data);


    return response.data;
  } catch (error) {
    console.error('Error adding pet:', error.response ? error.response.data : error.message);
    throw error; 
  }
};


export const getActiveAppointments = async () => {
  try {
    const { userEmail } = await getUserData();

    if (!userEmail) {
      throw new Error('User email not found in storage.');
    }

    const endpoint = `/calendly/user/appointments/${userEmail}?status=active`;
    const response = await api.get(endpoint);

    console.log('Active Appointments:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching active appointments:', error.response ? error.response.data : error.message);
    throw error; 
  }
};

export const deletePet = async (petId) => {
  try {
    if (!petId) {
      throw new Error('Pet ID is required.');
    }
    const response = await api.delete(`/pets/delete/${petId}`);

    console.log('Pet deleted successfully:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error deleting pet:', error.response ? error.response.data : error.message);
    throw error; 
  }
};

export const cancelEvent = async (eventId, reason) => {
  try {
    const response = await api.post('/calendly/scheduled_events/cancellation', {
      eventId,
      reason,
    });

    console.log('Event canceled successfully:', response.data);

    return response.data; 
  } catch (error) {
    console.error('Error canceling event:', error.response ? error.response.data : error.message);
    throw error; 
  }
};

export const requestPasswordReset = async (email) => {
  try {
    const response = await api.post('/api/password/request/email', {
      email,
    });

    console.log('Password reset request sent successfully:', response.data);

    return response.data; 
  } catch (error) {
    console.error('Error sending password reset request:', error.response ? error.response.data : error.message);
    throw error; 
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
    return response.data; 
  } catch (error) {
    console.error('Error resetting password:', error.response ? error.response.data : error.message);
    throw error; 
  }
};
