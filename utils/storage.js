import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to retrieve the stored user data
export const getUserData = async () => {
  try {
    const userId = await AsyncStorage.getItem('user_id');
    const userRole = await AsyncStorage.getItem('user_role');
    const userEmail = await AsyncStorage.getItem('user_email');
    
    return { userId, userRole ,userEmail }; // Return the retrieved user data
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

