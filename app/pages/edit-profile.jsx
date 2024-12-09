
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import { fetchUserDetails, updateUser } from '../../utils/users_api'; 
import { getUserData } from '../../utils/storage'; 

const EditProfile = () => {
  const [user, setUser] = useState({
    district: '',
    address: '',
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState(null); 
  const navigation = useNavigation();


  useEffect(() => {
    const initializeUserDetails = async () => {
      try {
        const { userId } = await getUserData();
        setUserId(userId); 

        if (!userId) {
          Alert.alert('Error', 'User ID not found.');
          setLoading(false);
          return;
        }

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
        Alert.alert('Error', 'Error al mostrar los datos del usuario.');
      } finally {
        setLoading(false);
      }
    };

    initializeUserDetails();
  }, []);

  const handleChange = (field, value) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!user.name || !user.email) {
      Alert.alert('Error', 'Porfavor complete todos los datos requeridos');
      return;
    }

    try {
      setIsSubmitting(true);

      if (!userId) {
        Alert.alert('Error', 'No se encontro el usuario');
        setIsSubmitting(false);
        return;
      }

      const updatedData = {
        district: user.district, 
        address: user.address, 
      };

      console.log(`User ID sent to updateUser endpoint: ${userId}`); 
      console.log('Payload sent to updateUser:', updatedData);

      await updateUser(userId, updatedData); 
      Alert.alert('Éxito', 'Su perfil fue actualizado.');
      navigation.goBack();
    } catch (error) {
      console.error('Failed to update profile:', error);
      Alert.alert('Error', 'Error al actualizar el perfil del usuario.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando datos del usuario...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-gray-800 h-full">
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}>
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
                         className="bg-gray-100 p-3 rounded-lg font-plight text-white"
                       />
                 </View>
                 <View>
                  <Text className="text-lg font-psemibold text-white">📍   Dirección</Text>
                      <TextInput
                         value={user.address}
                         onChangeText={(text) => handleChange('address', text)}
                         placeholder="Enter your address"
                         className="bg-gray-100 p-3 rounded-lg font-plight text-white"
                       />
                 </View>
             </View>

             
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

