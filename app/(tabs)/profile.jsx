import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Button, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import Pets from '../pages/pets';
import { fetchUserDetails } from '../../utils/users_api';
import { images, icons } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { clearUserData } from '../../utils/storage';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personalInfo');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false); // State to handle pull to refresh
  const navigation = useNavigation();

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await clearUserData(); // Clear session data
      Alert.alert('Saliste de la cuenta', 'Has cerrado sesión con éxito.');
      navigation.replace('index'); // Navigate to the login screen
    } catch (error) {
      console.error('Error al salir de tu cuenta:', error);
      Alert.alert('Error', 'A ocurrido un error al salir de tu cuenta.');
    }
  };

  // Fetch user details when the component mounts
  const getUserDetails = async () => {
    try {
      const userDetails = await fetchUserDetails();
      setUser(userDetails);
    } catch (error) {
      console.error('Error al obtener la información del usuario:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails(); // Initial data load
  }, []);

  // Pull-to-refresh handler
  const onRefresh = async () => {
    setIsRefreshing(true);
    await getUserDetails(); // Re-fetch user details
    setIsRefreshing(false); // Stop refreshing
  };

  // Handle error state
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando información del usuario...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-gray-800 flex-1">
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 25, paddingBottom: 10 }}
        refreshControl={
          <RefreshControl  refreshing={isRefreshing} onRefresh={onRefresh} /> // Add pull-to-refresh
        }
      >
        {/* Header */}
        <View className="flex-row justify-between items-center  mb-2">
          <Text className="text-2xl font-psemibold text-white">Mi Perfil</Text>
          <Link href="../pages/edit-profile" className="px-4 py-2 rounded-full bg-gray-200">
            <Text className="font-pmedium text-gray-600">Editar</Text>
          </Link>
        </View>

        {/* Profile Picture and Name */}
        <View className="items-center mb-6">
          <Image
            source={images.profile}
            className="w-24 h-24 rounded-full bg-gray-200"
            resizeMode="cover"
          />
          <Text className="mt-4 text-2xl font-psemibold text-white">
            {user ? `${user.name} ${user.lastName}` : 'User'}
          </Text>
          <View className="size-1 mt-2 font-pbold border rounded-full border-amber-950 bg-red-900">
            <Button title="Cerrar sesión" onPress={handleLogout} color="#FF4D4D" />
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row justify-center mb-2 space-x-2">
          <TouchableOpacity
            onPress={() => setActiveTab('personalInfo')}
            className={`px-4 py-2 rounded-full ${activeTab === 'personalInfo' ? 'bg-blue-100' : 'bg-gray-200'}`}
          >
            <Text className={`font-medium ${activeTab === 'personalInfo' ? 'text-blue-700' : 'text-gray-600'}`}>
              Mis datos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('pets')}
            className={`px-4 py-2 rounded-full ${activeTab === 'pets' ? 'bg-blue-100' : 'bg-gray-200'}`}
          >
            <Text className={`font-medium ${activeTab === 'pets' ? 'text-blue-700' : 'text-gray-600'}`}>
              Mascotas
            </Text>
          </TouchableOpacity>
        </View>

        {/* Conditional Content */}
        <View className="space-y-4">
          {activeTab === 'personalInfo' ? (
            <View className="space-y-4">
              {user && [
                { label: 'Nombre', value: user.name, icon: '👤' },
                { label: 'Apellido', value: user.lastName, icon: '👥' },
                { label: 'Correo electrónico', value: user.email, icon: '✉️' },
                { label: 'Número de teléfono', value: user.phoneNumber, icon: '📞' },
                { label: 'Barrio', value: user.district || 'N/a', icon: '📍' },
                { label: 'Dirección', value: user.address || 'N/a', icon: '📍' }
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
          ) : (
            <Pets />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
