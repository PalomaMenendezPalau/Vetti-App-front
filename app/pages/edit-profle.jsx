import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import { fetchUserDetails, updateUserDetails } from '../../utils/users_api'; // Replace with your actual API functions

const EditProfile = () => {
  const [user, setUser] = useState({
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    location: '',
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigation = useNavigation();

  // Fetch user details when the component mounts
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const userDetails = await fetchUserDetails();
        setUser({
          name: userDetails.name || '',
          lastName: userDetails.lastName || '',
          email: userDetails.email || '',
          phoneNumber: userDetails.phoneNumber || '',
          location: userDetails.location || '',
        });
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      } finally {
        setLoading(false);
      }
    };

    getUserDetails();
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
      await updateUserDetails(user); // Replace with your actual API function
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
          <Text className="text-2xl font-pbold text-white">Editar Perfil</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="text-lg font-psemibold  text-blue-200">Cancelar</Text>
          </TouchableOpacity>
        </View>

        {/* Input fields for user details */}
        <View className="space-y-4">
          <View>
            <Text className="text-lg font-psemibold text-white">Nombre</Text>
            <TextInput
              value={user.name}
              onChangeText={(text) => handleChange('name', text)}
              placeholder="Enter your name"
              className="bg-gray-100 p-3 rounded-lg font-plight text-white"
            />
          </View>

          <View>
            <Text className="text-lg font-psemibold text-white">Apellido</Text>
            <TextInput
              value={user.lastName}
              onChangeText={(text) => handleChange('lastName', text)}
              placeholder="Enter your last name"
              className="bg-gray-100 p-3 rounded-lg font-plight text-white"
            />
          </View>

          <View>
            <Text className="text-lg font-psemibold text-white">Email</Text>
            <TextInput
              value={user.email}
              onChangeText={(text) => handleChange('email', text)}
              placeholder="Enter your email"
              keyboardType="email-address"
              className="bg-gray-100 p-3 rounded-lg font-plight text-white"
            />
          </View>

          <View>
            <Text className="text-lg font-psemibold text-white">Número de Teléfono</Text>
            <TextInput
              value={user.phoneNumber}
              onChangeText={(text) => handleChange('phoneNumber', text)}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              className="bg-gray-100 p-3 rounded-lg font-plight text-white"
            />
          </View>

          <View>
            <Text className="text-lg font-psemibold text-white">Barrio</Text>
            <TextInput
              value={user.location}
              onChangeText={(text) => handleChange('location', text)}
              placeholder="Enter your location"
              className="bg-gray-100 p-3 rounded-lg font-plight text-white"
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
