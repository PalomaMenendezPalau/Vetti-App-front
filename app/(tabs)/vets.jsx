import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {  useRouter } from 'expo-router'; 
import { icons } from '../../constants'; 
const Vets = () => {
  const navigation = useNavigation(); 
  const router = useRouter();
  const options = [
    { title: 'Especialidades Veterinarias', icon: icons.pets ,section: '../pages/view-services'},
    { title: 'Estudios', icon: icons.search,section: '../pages/view-labtests' },
    { title: 'Vacunatorios', icon: icons.vaccine, section: '../pages/view-vaccination' },
    { title: 'Guardias', icon: icons.emergencyroom , section: '../pages/view-emergencyroom'},
  ];

  return (
    <SafeAreaView className="bg-gray-800 h-full">
      <View className="flex-row items-center justify-between px-4 -mt-10">
        <TouchableOpacity onPress={() => navigation.jumpTo('home')}>
          <Text className="text-base font-pmedium text-white">{'<'}</Text>
        </TouchableOpacity>
        <Text className="font-pregular text-xl text-gray-100 text-white">Nuevo turno</Text>
        <View />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {options.map((option, index) => (
          <TouchableOpacity onPress={() => router.push(option.section)}
            key={index}
            className="flex-row items-center justify-between rounded-lg p-4 mb-4 shadow-md bg-gray-600"
          >
            <View className="flex-row items-center space-x-4">
            <Image source={option.icon} 
                className="w-10 h-10 mt-2" 
                resizeMode="contain"
                />
              <Text className="text-lg  text-white font-pmedium">{option.title}</Text>
            </View>
            <Text className="text-lg font-pmedium text-white">{'>'}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Vets;