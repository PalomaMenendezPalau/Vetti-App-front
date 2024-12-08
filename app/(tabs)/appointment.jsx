import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getActiveAppointments, cancelEvent } from '../../utils/users_api'; // Import the cancelEvent API function

const Appointment = () => {
  const navigation = useNavigation();
  const [appointments, setAppointments] = useState([]); // State to store appointments
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors
  const [isRefreshing, setIsRefreshing] = useState(false); // State to handle pull-to-refresh

  // Fetch appointments function
  const fetchAppointments = async () => {
    try {
      setLoading(true); // Set loading to true while fetching data
      const data = await getActiveAppointments();
      setAppointments(data); // Set fetched appointments
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to load appointments. Please try again later.');
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  // Fetch appointments on load and on refresh
  useEffect(() => {
    fetchAppointments(); // Fetch appointments when the component mounts
  }, []);

  // Function to handle pull-to-refresh
  const onRefresh = async () => {
    setIsRefreshing(true); // Set refreshing to true
    await fetchAppointments(); // Refetch appointments on pull-to-refresh
    setIsRefreshing(false); // Stop refreshing once the data is fetched
  };

  // Function to cancel the appointment
  const handleCancelAppointment = async (eventId) => {
    try {
      const reason = " "; // Empty reason as specified in the request
      const response = await cancelEvent(eventId, reason);
      console.log('Appointment canceled:', response);
      Alert.alert("Success", "Your appointment has been canceled.");
      // Optionally, refresh the appointments after cancellation
      setAppointments(appointments.filter((appt) => appt.eventId !== eventId));
    } catch (error) {
      console.error('Error canceling appointment:', error);
      Alert.alert("Error", "Failed to cancel your appointment. Please try again later.");
    }
  };

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
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />} // Add the refresh control
      >
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
              <TouchableOpacity className="mt-4" onPress={() => handleCancelAppointment(appointment.eventId)}>
                <Text className="text-red-500 font-pbold">Cancelar turno</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text className="text-center text-white">No hay turnos agendados.</Text>
        )}
      </ScrollView>

      {/* Bottom Button */}
      <View className="p-4 mb-20">
        <TouchableOpacity
          className="bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center"
          onPress={() => navigation.jumpTo('vets')}
        >
          <Text className="text-white font-bold text-lg">Solicitar turno</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Appointment;
