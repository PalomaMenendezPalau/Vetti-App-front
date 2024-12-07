import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { fetchVetEvents } from "../../utils/vets_api"; // Assuming this function is available
import { useRouter } from 'expo-router';
import { saveEventDetails } from "../../utils/storage"; // Import the function

const ViewServices = () => {
    const [eventNames, setEventNames] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter(); // Initialize router for navigation

    useEffect(() => {
        const loadEventNames = async () => {
            try {
                const events = await fetchVetEvents(); // Fetch vet events data

                // Extract unique event names and schedulingUrls from the data
                const uniqueEvents = events.map((event) => ({
                    eventName: event.eventName,
                    schedulingUrl: event.schedulingUrl, // Assuming 'schedulingUrl' exists in the event data
                }));

                // Remove duplicates based on the event name
                const uniqueEventNames = [
                    ...new Map(uniqueEvents.map((event) => [event.eventName, event])).values(),
                ];

                setEventNames(uniqueEventNames); // Set unique event names to the state
            } catch (error) {
                console.error("Error loading event names:", error);
            } finally {
                setLoading(false);
            }
        };

        loadEventNames();
    }, []);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-800">
                <ActivityIndicator size="large" color="#ffffff" />
                <Text className="text-white mt-4">Loading events...</Text>
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-gray-800 p-4">
           <View className="flex-row items-center justify-between px-4 mb-4 mt-4">
             <TouchableOpacity onPress={() => router.push('../(tabs)/vets')}>
                <Text className="text-base font-pmedium text-white">{'<'}</Text>
             </TouchableOpacity>
               <Text className="font-pregular text-justify text-xl text-gray-100 text-white">Servicios Disponibles</Text> 
           </View>
            {/* Display list of unique event names as TouchableOpacity */}
            {eventNames.length > 0 ? (
                eventNames.map((event, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            saveEventDetails(event.eventName, event.schedulingUrl); // Save the selected event name and scheduling URL
                            router.push(`pages/view-available-services`);  // Navigate to event details page
                        }}
                        className="flex-row items-center justify-between rounded-lg p-4 mb-4 shadow-md bg-gray-600"
                    >
                        <Text className="text-lg font-pmedium text-white">{event.eventName}</Text>
                        <Text className="text-lg font-pmedium text-white">{'>'}</Text>
                    </TouchableOpacity>
                ))
            ) : (
                <Text className="text-white text-center">No events available</Text>
            )}
        </ScrollView>
    );
};

export default ViewServices;
