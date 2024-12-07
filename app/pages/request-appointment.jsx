import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { getEventDetails } from "../../utils/storage"; // Importing the getEventDetails function to get the scheduling URL
import { WebView } from 'react-native-webview';
import { useRouter } from 'expo-router';
import { fetchUserDetails } from "../../utils/users_api"; // Importing fetchUserDetails to get user details

const RequestAppointment = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({ userName: '', userEmail: '', userFullName: '' });
  const [calendlyUrl, setCalendlyUrl] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch user details (this will give the user name and last name)
        const userDetails = await fetchUserDetails();
        const userFullName = `${userDetails.name} ${userDetails.lastName}`; // Concatenate name and last name
        const userEmail = userDetails.email;
        
        setUserData({ userName: userDetails.name, userEmail, userFullName });

        // Fetch event details, including the scheduling URL
        const eventDetails = await getEventDetails();
        if (eventDetails && eventDetails.schedulingUrl) {
          const url = `${eventDetails.schedulingUrl}?name=${userFullName}&email=${userEmail}`; // Prepopulate the Calendly URL with full name and email
          setCalendlyUrl(url); // Save the URL with prepopulated values
        }
      } catch (error) {
        console.error("Error fetching user or event details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-800">
        <ActivityIndicator size="large" color="#ffffff" />
        <Text className="text-white mt-4">Loading Appointment Scheduler...</Text>
      </View>
    );
  }

  if (!calendlyUrl) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-800">
        <Text className="text-white">No scheduling URL found for this event.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-800">
      <WebView source={{ uri: calendlyUrl }} style={{ flex: 1 }} />
    </View>
  );
};

export default RequestAppointment;
