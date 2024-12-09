import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserData = async () => {
  try {
    const userId = await AsyncStorage.getItem('user_id');
    const userRole = await AsyncStorage.getItem('user_role');
    const userEmail = await AsyncStorage.getItem('user_email');
    
    return { userId, userRole, userEmail }; 
  } catch (error) {
    console.error('Error retrieving user data:', error);
  }
};

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

export const saveVetData = async (vetData) => {
  try {
    await AsyncStorage.setItem('vet_data', JSON.stringify(vetData));
    console.log('Vet data saved successfully.');
  } catch (error) {
    console.error('Error saving vet data:', error);
  }
};

export const getVetData = async () => {
  try {
    const vetData = await AsyncStorage.getItem('vet_data');
    return vetData ? JSON.parse(vetData) : null; 
  } catch (error) {
    console.error('Error retrieving vet data:', error);
    return null;
  }
};


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
    await AsyncStorage.setItem('selected_event_details', JSON.stringify(eventDetails));
    console.log('Selected event details saved successfully.');
  } catch (error) {
    console.error('Error saving selected event details:', error);
  }
};


export const getEventDetails = async () => {
  try {
    const eventDetails = await AsyncStorage.getItem('selected_event_details');
    
    if (eventDetails) {
      return JSON.parse(eventDetails); 
    }
    return null;
  } catch (error) {
    console.error('Error retrieving selected event details:', error);
    return null;
  }
};

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

export const getEmailForPasswordReset = async () => {
  try {
    const email = await AsyncStorage.getItem('reset_password_email');
    return email; 
  } catch (error) {
    console.error('Error retrieving email for password reset:', error);
    return null;
  }
};

export const clearEmailForPasswordReset = async () => {
  try {
    await AsyncStorage.removeItem('reset_password_email');
    console.log('Email for password reset cleared.');
  } catch (error) {
    console.error('Error clearing email for password reset:', error);
  }
};