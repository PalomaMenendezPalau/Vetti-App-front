import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getActiveAppointments, cancelEvent } from '../../utils/users_api'; 

const Appointment = () => {
  const navigation = useNavigation();
  const [appointments, setAppointments] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [isRefreshing, setIsRefreshing] = useState(false); 

  const fetchAppointments = async () => {
    try {
      setLoading(true); 
      const data = await getActiveAppointments();
      setAppointments(data); 
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to load appointments. Please try again later.');
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchAppointments(); 
  }, []);

  const onRefresh = async () => {
    setIsRefreshing(true); 
    await fetchAppointments(); 
    setIsRefreshing(false); 
  };


  const handleCancelAppointment = (eventId) => {
    Alert.alert(
      'Cancelar Turno', // Title
      '¿Estás seguro de que quieres cancelar este turno?', // Message
      [
        {
          text: 'No',
          onPress: () => console.log('Cancelación abortada'),
          style: 'cancel',
        },
        {
          text: 'Sí, Cancelar',
          onPress: async () => {
            try {
              const reason = "Cancelado por usuario"; 
              const response = await cancelEvent(eventId, reason);
              console.log('Appointment canceled:', response);
              Alert.alert("Éxito", "Tu turno fue cancelado");
              setAppointments(appointments.filter((appt) => appt.eventId !== eventId));
            } catch (error) {
              console.error('Error canceling appointment:', error);
              Alert.alert("Error", "Error al cancelar tu turno, por favor intente nuevamente.");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

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

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-800">
        <ActivityIndicator size="large" color="#ffffff" />
        <Text className="text-white mt-4">Cargando turnos...</Text>
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
