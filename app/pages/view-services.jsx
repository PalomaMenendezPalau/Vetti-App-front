import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import { fetchVetEvents } from "../../utils/vets_api"; 
import { useRouter } from 'expo-router';
import { saveEventDetails } from "../../utils/storage"; 

const ViewServices = () => {
    const [eventNames, setEventNames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false); 
    const router = useRouter();


    const loadEventNames = async () => {
        try {
            setLoading(true);
            const events = await fetchVetEvents(); 

            const uniqueEvents = events.map((event) => ({
                eventName: event.eventName,
                schedulingUrl: event.schedulingUrl, 
            }));

            const uniqueEventNames = [
                ...new Map(uniqueEvents.map((event) => [event.eventName, event])).values(),
            ];

            setEventNames(uniqueEventNames); 
        } catch (error) {
            console.error("Error loading event names:", error);
        } finally {
            setLoading(false);
            setIsRefreshing(false); 
        }
    };

    const onRefresh = () => {
        setIsRefreshing(true); 
        loadEventNames(); 
    };

    useEffect(() => {
        loadEventNames();
    }, []);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-800">
                <ActivityIndicator size="large" color="#ffffff" />
                <Text className="text-white mt-4">Cargando Servicios...</Text>
            </View>
        );
    }

    return (
        <ScrollView
            className="flex-1 bg-gray-800 p-4"
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        >
            <View className="px-4 mb-4 mt-4">
                <Text className="font-psemibold text-center text-2xl text-gray-100 text-white">Servicios Disponibles</Text> 
            </View>

            {eventNames.length > 0 ? (
                eventNames.map((event, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            saveEventDetails(event.eventName, event.schedulingUrl); 
                            console.log('Saved event details:',event.eventName, event.schedulingUrl)
                            router.push(`pages/view-available-services`);  
                        }}
                        className="flex-row items-center justify-between rounded-lg p-4 mb-4 shadow-md bg-gray-600"
                    >
                        <Text className="text-lg font-pmedium text-white">{event.eventName}</Text>
                        <Text className="text-lg font-pmedium text-white">{'>'}</Text>
                    </TouchableOpacity>
                ))
            ) : (
                <Text className="text-white text-center">No hay servicios disponibles</Text>
            )}
        </ScrollView>
    );
};

export default ViewServices;
