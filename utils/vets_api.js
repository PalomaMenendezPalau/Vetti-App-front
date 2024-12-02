import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserData } from './storage'; // Import function to retrieve user data

export const fetchVets = async () => {
    try {
      // Sending a GET request to the specified endpoint
      const response = await api.get('/vet/searchVets');
  
      // Log the API response for debugging
      console.log('Vets fetched successfully:', response.data);
  
      // Return the list of vets
      return response.data;
    } catch (error) {
      console.error('Error fetching vets:', error.response ? error.response.data : error.message);
      throw error; // Handle or throw the error for further action
    }
  };