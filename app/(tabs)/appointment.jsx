import { View, Text ,  TouchableOpacity, ScrollView  } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


const Appointment = () => {
  const navigation = useNavigation(); 
  return (
    <View className="flex-1 bg-gray-800">
     
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}>
        {[
          {
            title:"Castracion de Gatos",
            date: "Lunes 6 de Enero - 18:40hs",
            location: "Charcas 3391 10° Piso - Palermo",
          },
          {
            title:"Laboratorio",
            date: "Lunes 13 de Enero - 18:20hs",
            location: "Billinghurst 933 - Almagro",
          },
        ].map((appointment, index) => (
          <View
            key={index}
            className=" mb-4 p-4 bg-gray-600 rounded-lg shadow-sm rounded-xl"
          >
            <Text className="text-xl font-psemibold  text-white">{appointment.title}</Text>
            <Text className="text-m font-pmedium  text-white">{appointment.date}</Text>
            <Text className="text-xs text-white">{appointment.location}</Text>
            <TouchableOpacity className="mt-4">
              <Text className="text-red-500 font-pbold shadow">Cancelar turno</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Button */}
      <View className="p-4">
        <TouchableOpacity className="bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center" onPress={() => navigation.jumpTo('request-appointment')}>
          <Text className="text-white font-bold text-lg">Solicitar turno</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};


export default Appointment