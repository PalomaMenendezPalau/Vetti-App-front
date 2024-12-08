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

export const saveEventDetails = async (eventName, schedulingUrl) => {
  try {
    const eventDetails = {
      eventName,
      schedulingUrl
    };

    // Save the event details object in AsyncStorage
    await AsyncStorage.setItem('selected_event_details', JSON.stringify(eventDetails));
    console.log('Selected event details saved successfully.');
  } catch (error) {
    console.error('Error saving selected event details:', error);
  }
};

// Function to retrieve the selected eventName and schedulingUrl
export const getEventDetails = async () => {
  try {
    const eventDetails = await AsyncStorage.getItem('selected_event_details');
    
    // If eventDetails is found, parse it into an object
    if (eventDetails) {
      return JSON.parse(eventDetails); // Return the parsed object with both eventName and schedulingUrl
    }
    return null; // If no data found, return null
  } catch (error) {
    console.error('Error retrieving selected event details:', error);
    return null;
  }
};

// Function to clear the selected event details
export const clearEventDetails = async () => {
  try {
    await AsyncStorage.removeItem('selected_event_details');
    console.log('Selected event details cleared.');
  } catch (error) {
    console.error('Error clearing selected event details:', error);
  }
};

export const saveEmailForPasswordReset = async (email) => {
  try {
    await AsyncStorage.setItem('reset_password_email', email);
    console.log('Email for password reset saved successfully.');
  } catch (error) {
    console.error('Error saving email for password reset:', error);
  }
};

// Function to retrieve the saved email for password reset
export const getEmailForPasswordReset = async () => {
  try {
    const email = await AsyncStorage.getItem('reset_password_email');
    return email; // Return the saved email
  } catch (error) {
    console.error('Error retrieving email for password reset:', error);
    return null;
  }
};

// Function to clear the saved email for password reset
export const clearEmailForPasswordReset = async () => {
  try {
    await AsyncStorage.removeItem('reset_password_email');
    console.log('Email for password reset cleared.');
  } catch (error) {
    console.error('Error clearing email for password reset:', error);
  }
};