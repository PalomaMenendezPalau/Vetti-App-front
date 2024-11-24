import React from 'react';
import { View, Text, Button, Linking } from 'react-native';

const RequestAppointment = () => {
  const openCalendly = () => {
    Linking.openURL('https://calendly.com/luzzijuanma');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Solicitar Turno</Text>
      <Button title="Abrir Calendly" onPress={openCalendly} />
    </View>
  );
};

export default RequestAppointment;
