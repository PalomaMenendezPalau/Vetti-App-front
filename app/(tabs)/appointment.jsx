import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getActiveAppointments } from '../../utils/users_api'; // Import the API function

const Appointment = () => {
  const navigation = useNavigation();
  const [appointments, setAppointments] = useState([]); // State to store appointments
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors

  // Fetch appointments when the component mounts
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getActiveAppointments();
        setAppointments(data); // Set fetched appointments
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError('Failed to load appointments. Please try again later.');
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchAppointments();
  }, []);

  // Handle error state
  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-800">
        <Text className="text-red-500 text-center mb-4">{error}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-white underline">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Handle loading state
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-800">
        <ActivityIndicator size="large" color="#ffffff" />
        <Text className="text-white mt-4">Loading appointments...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-800">
      <Text className="text-2xl font-semibold text-center text-white mt-5 mb-5">Turnos Agendados</Text>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}>
        {appointments.length > 0 ? (
          appointments.map((appointment, index) => (
            <View
              key={index}
              className="mb-4 p-4 bg-gray-600 rounded-lg shadow-sm"
            >
              <Text className="text-xl font-psemibold text-white">{appointment.eventName}</Text>
              <Text className="text-m font-pregular text-white">
                {new Date(appointment.startTime).toLocaleString()} 
              </Text>
              <Text className="text-sm text-white font-pmedium">{appointment.vetName}</Text>
              <Text className="text-xs text-white font-pthin">{appointment.location || 'No location specified'}</Text>
              <TouchableOpacity className="mt-4">
                <Text className="text-red-500 font-pbold">Cancelar turno</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text className="text-center text-white">No active appointments found.</Text>
        )}
      </ScrollView>

      {/* Bottom Button */}
      <View className="p-4">
        <TouchableOpacity
          className="bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center"
          onPress={() => navigation.jumpTo('request-appointment')}
        >
          <Text className="text-white font-bold text-lg">Solicitar turno</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Appointment;
