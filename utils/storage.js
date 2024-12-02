import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to retrieve the stored user data
export const getUserData = async () => {
  try {
    const userId = await AsyncStorage.getItem('user_id');
    const userRole = await AsyncStorage.getItem('user_role');
    const userEmail = await AsyncStorage.getItem('user_email');
    
    return { userId, userRole, userEmail }; // Return the retrieved user data
  } catch (error) {
    console.error('Error retrieving user data:', error);
  }
};

// Function to clear user data (for logging out, etc.)
export const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem('user_id');
    await AsyncStorage.removeItem('user_role');
    await AsyncStorage.removeItem('user_email');
    console.log('User data cleared.');
  } catch (error) {
    console.error('Error clearing user data:', error);
  }
};

// Function to save vet data into local storage
export const saveVetData = async (vetData) => {
  try {
    // Convert the vet data to a JSON string and save it
    await AsyncStorage.setItem('vet_data', JSON.stringify(vetData));
    console.log('Vet data saved successfully.');
  } catch (error) {
    console.error('Error saving vet data:', error);
  }
};

// Function to retrieve the vet data from local storage
export const getVetData = async () => {
  try {
    const vetData = await AsyncStorage.getItem('vet_data');
    return vetData ? JSON.parse(vetData) : null; // Parse and return the data if found
  } catch (error) {
    console.error('Error retrieving vet data:', error);
    return null;
  }
};

// Function to clear vet data
export const clearVetData = async () => {
  try {
    await AsyncStorage.removeItem('vet_data');
    console.log('Vet data cleared.');
  } catch (error) {
    console.error('Error clearing vet data:', error);
  }
};