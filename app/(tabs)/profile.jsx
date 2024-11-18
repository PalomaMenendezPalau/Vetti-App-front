import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import Pets from '../pages/pets';
import { fetchUserDetails } from '../../utils/users_api';
import {images, icons } from '../../constants'; 
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personalInfo');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const userDetails = await fetchUserDetails();
        setUser(userDetails);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      } finally {
        setLoading(false);
      }
    };

    getUserDetails();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading user details...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-gray-800 flex-1">
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}>
        {/* Header */}
        <View className="flex-row justify-between items-center mt-4 mb-6">
          <Text className="text-2xl font-psemibold text-white">Mi Perfil</Text>
          <Link href="../pages/edit-profle" className='px-4 py-2 rounded-full bg-gray-200'
            >
            <Text className='font-pmedium text-gray-600'>
              Editar
            </Text>
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
        </View>

        {/* Tabs */}
        <View className="flex-row justify-center mb-6 space-x-2">
          <TouchableOpacity
            onPress={() => setActiveTab('personalInfo')}
            className={`px-4 py-2 rounded-full ${
              activeTab === 'personalInfo' ? 'bg-blue-100' : 'bg-gray-200'
            }`}
          >
            <Text className={`font-medium ${activeTab === 'personalInfo' ? 'text-blue-700' : 'text-gray-600'}`}>
              Mis datos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('pets')}
            className={`px-4 py-2 rounded-full ${
              activeTab === 'pets' ? 'bg-blue-100' : 'bg-gray-200'
            }`}
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
                { label: 'Mail', value: user.email, icon: '✉️' },
                { label: 'Número de teléfono', value: user.phoneNumber, icon: '📞' },
                { label: 'Barrio', value: user.district || 'N/a', icon: '📍' },
                {label: 'Direccion', value: user.address || 'N/a', icon: '📍' }
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
