
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import { fetchUserDetails, updateUser } from '../../utils/users_api'; // Adjust import paths if needed
import { getUserData } from '../../utils/storage'; // Adjust import paths if needed

const EditProfile = () => {
  const [user, setUser] = useState({
    district: '',
    address: '',
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState(null); // State to store user ID
  const navigation = useNavigation();

  // Fetch user details and user ID when the component mounts
  useEffect(() => {
    const initializeUserDetails = async () => {
      try {
        // Get the user ID from AsyncStorage
        const { userId } = await getUserData();
        setUserId(userId); // Store userId in state

        if (!userId) {
          Alert.alert('Error', 'User ID not found.');
          setLoading(false);
          return;
        }

        // Fetch user details from API
        const userDetails = await fetchUserDetails();
        setUser({
          name: userDetails.name || '',
          lastName: userDetails.lastName || '',
          email: userDetails.email || '',
          phoneNumber: userDetails.phoneNumber || '',
          district: userDetails.district || '',
          address: userDetails.address || '',
        });
      } catch (error) {
        console.error('Failed to fetch user details:', error);
        Alert.alert('Error', 'Failed to load user details.');
      } finally {
        setLoading(false);
      }
    };

    initializeUserDetails();
  }, []);

  // Handle form input changes
  const handleChange = (field, value) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle form submission to update user details
  const handleSubmit = async () => {
    if (!user.name || !user.email || !user.phoneNumber) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    try {
      setIsSubmitting(true);

      if (!userId) {
        Alert.alert('Error', 'User ID is missing.');
        setIsSubmitting(false);
        return;
      }

      const updatedData = {
        district: user.district, // Assuming 'district' maps to 'address'
        address: user.address, // Assuming 'district' maps to 'address'
      };

      console.log(`User ID sent to updateUser endpoint: ${userId}`); // Log the userId in the terminal
      console.log('Payload sent to updateUser:', updatedData);

      await updateUser(userId, updatedData); // Use the retrieved user ID
      Alert.alert('Success', 'Your profile has been updated.');
      navigation.goBack(); // Navigate back to the profile screen
    } catch (error) {
      console.error('Failed to update profile:', error);
      Alert.alert('Error', 'Failed to update your profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading user details...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-gray-800 h-full">
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}>
        {/* Header */}
        <View className="flex-row justify-between items-center mt-4 mb-6">
          <Text className="text-2xl font-bold text-white">Editar Perfil</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="text-lg font-semibold text-blue-200">Cancelar</Text>
          </TouchableOpacity>
        </View>

        <View className="space-y-4">
              {user && [
                { label: 'Nombre', value: user.name, icon: '👤' },
                { label: 'Apellido', value: user.lastName, icon: '👥' },
                { label: 'Mail', value: user.email, icon: '✉️' },
                { label: 'Número de teléfono', value: user.phoneNumber, icon: '📞' }
              ].map((item, index) => (
                <View key={index} className="flex-row items-center">
                  <Text className="text-gray-400 mr-4">{item.icon}</Text>
                  <View>
                    <Text className="text-lg font-psemibold text-white">{item.label}</Text>
                    <Text className="font-plight text-white">{item.value}</Text>
                  </View>
                </View>
              ))}
            </View>

       
            <View >
                <View>
                  <Text className="text-lg font-psemibold text-white">📍   Barrio</Text>
                      <TextInput
                         value={user.district}
                         onChangeText={(text) => handleChange('district', text)}
                         placeholder="Enter your district"
                         className="bg-gray-100 p-3 rounded-lg text-black"
                       />
                 </View>
             </View>

             


        {/* Submit button */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isSubmitting}
          className={`bg-blue-500 py-3 rounded-lg mt-6 ${isSubmitting ? 'opacity-50' : ''}`}
        >
          <Text className="text-white text-center font-medium">
            {isSubmitting ? 'Updating...' : 'Guardar Cambios'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

