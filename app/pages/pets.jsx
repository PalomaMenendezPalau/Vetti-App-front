import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';
import { fetchUserDetails, deletePet } from '../../utils/users_api'; // Ensure the path is correct
import { images, icons } from '../../constants'; // Assume you have dog, cat, and animal images in this module

const Pets = () => {
  const router = useRouter();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPets = async () => {
      try {
        setLoading(true);
        const userDetails = await fetchUserDetails(); // Fetch user details including pets
        setPets(userDetails.pets || []); // Set the pets data
      } catch (error) {
        console.error('Error fetching pets:', error.message);
      } finally {
        setLoading(false);
      }
    };

    loadPets();
  }, []);

  const handleDeletePet = async (petId) => {
    Alert.alert(
      "Eliminar Mascota",
      "¿Estás seguro de que deseas eliminar esta mascota?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true); // Show loader while deleting
              await deletePet(petId); // Call the delete API
              setPets((prevPets) => prevPets.filter((pet) => pet.id !== petId)); // Update the state
              Alert.alert("Éxito", "Mascota eliminada correctamente.");
            } catch (error) {
              console.error("Error deleting pet:", error.message);
              Alert.alert("Error", "No se pudo eliminar la mascota. Inténtalo de nuevo.");
            } finally {
              setLoading(false); // Hide loader
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-800">
        <ActivityIndicator size="large" color="#ffffff" />
        <Text className="text-white mt-4">Cargando mascotas...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-gray-800 h-full -mt-2">
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 1 }}>
        {/* Header */}
        <View className="w-full px-4 flex-row justify-between items-center">
          <Text className="text-xl font-semibold text-white">Mis Mascotas</Text>
          <Link href="../pages/pets" className="px-4 py-2 rounded-full bg-gray-200">
            <Text className="font-pmedium text-gray-600">Ver</Text>
          </Link>
        </View>

        {/* Pets List */}
        <View className="w-full mt-4 px-1 space-y-3">
          {pets.map((pet, index) => (
            <View
              key={index}
              className="flex-row items-center bg-gray-100 rounded-lg p-3 shadow-sm justify-between"
            >
              <View className="flex-row items-center">
                {/* Conditional Image based on Pet Type */}
                <Image
                  source={
                    pet.type.toLowerCase() === 'perro'
                      ? images.dog
                      : pet.type.toLowerCase() === 'gato'
                      ? images.cat
                      : images.animal // Default image for 'Otro' or other types
                  }
                  className="w-14 h-14 rounded-full bg-gray-300"
                  resizeMode="cover"
                />
                <View className="ml-3">
                  <Text className="text-base font-psemibold text-white">{pet.name}</Text>
                  <Text className="text-white text-xs font-pregular">Especie: {pet.type}</Text>
                  <Text className="text-white  text-xs font-pregular">
                    Cumpleaños: {pet.birthday || 'No proporcionado'}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                className="ml-4"
                onPress={() => handleDeletePet(pet.id)}
              >
               <Image source={icons.trash} 
                className="w-5 h-5 mt-3" 
                resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          ))}

          {/* Bottom Button */}
          <View className="p-4">
            <TouchableOpacity
              className="bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center"
              onPress={() => router.push('pages/add-pets')}
            >
              <Text className="text-white font-bold text-lg">Agregar Mascota</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Pets;
