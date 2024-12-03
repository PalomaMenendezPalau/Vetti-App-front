import React from 'react';
import { View, Text, ScrollView, Image , TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { useRouter} from 'expo-router';


const Pets = () => {
  const router = useRouter();
  // Example list of pets
  const pets = [
    {
      name: 'Buddy',
      species: 'Dog',
      age: '2 years',
      owner: 'Ragip Diler',
      image: 'https://via.placeholder.com/96',
    },
    {
      name: 'Whiskers',
      species: 'Cat',
      age: '3 years',
      owner: 'Ragip Diler',
      image: 'https://via.placeholder.com/96',
    },
    {
      name: 'Goldie',
      species: 'Fish',
      age: '1 year',
      owner: 'Ragip Diler',
      image: 'https://via.placeholder.com/96',
    },
  ];

  return (
    <SafeAreaView className="bg-gray-800 h-full">
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 1 }}>
        {/* Header */}
        <View className="w-full px-4 flex-row justify-between items-center -mt-">
          <Text className="text-xl font-semibold text-white">Mis Mascotas</Text>
          <Link href="../pages/pets" className='px-4 py-2 rounded-full bg-gray-200'
            >
            <Text className='font-pmedium text-gray-600'>
              Ver
            </Text>
          </Link>
        </View>

        {/* Pets List */}
        <View className="w-full mt-4 px-1 space-y-3">
          {pets.map((pet, index) => (
            <View
              key={index}
              className="flex-row items-center bg-gray-100 rounded-lg p-3 shadow-sm"
            >
              <Image
                source={{ uri: pet.image }}
                className="w-14 h-14 rounded-full bg-gray-300"
                resizeMode="cover"
              />
              <View className="ml-3">
                <Text className="text-lg font-psemibold text-white">{pet.name}</Text>
                <Text className="text-white">{pet.species}</Text>
                <Text className="text-white">{pet.age}</Text>
        
              </View>
            </View>
          ))}

            {/* Bottom Button */}
      <View className="p-4">
        <TouchableOpacity
          className="bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center"
          onPress={() => router.push('pages/add-pets')}
        >
          <Text className="text-white font-bold text-lg">Agregar Mascosta</Text>
        </TouchableOpacity>
      </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Pets;