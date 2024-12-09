import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import { fetchAndSaveCombinedVetData } from "../../utils/vets_api";
import { saveEventDetails, getEventDetails } from "../../utils/storage"; 
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";

const ViewLabtests = () => {
    const [vetData, setVetData] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false); 
    const router = useRouter();

    const loadVetData = async () => {
        try {
            setLoading(true);
            const combinedData = await fetchAndSaveCombinedVetData();
            setVetData(combinedData);

            const districtsWithEvents = [
                ...new Set(
                    combinedData
                        .filter((vet) =>
                            vet.events.some(
                                (event) =>
                                    event.eventName === "Análisis de laboratorio"
                            )
                        )
                        .map((vet) => vet.district)
                ),
            ];

            setDistricts(districtsWithEvents);
        } catch (error) {
            console.error("Error loading vet data:", error);
        } finally {
            setLoading(false);
            setIsRefreshing(false); 
        }
    };

    const onRefresh = () => {
        setIsRefreshing(true);
        loadVetData(); 
    };

    const filteredData = selectedDistrict
        ? vetData.filter((vet) => vet.district === selectedDistrict)
        : vetData;

    const transformedData = filteredData.flatMap((vet) =>
        vet.events
            .filter((event) => event.eventName === "Análisis de laboratorio")
            .map((event) => ({ ...event, vetName: vet.vetName, vet }))
    );

    const handleRequestAppointment = (eventName, schedulingUrl) => {
        console.log("Saving event details:", { eventName, schedulingUrl });

        // Save the event details to storage
        saveEventDetails(eventName, schedulingUrl);

        // Retrieve the saved event details
        getEventDetails().then((data) => {
            console.log("Retrieved saved event details:", data);
        }).catch((error) => {
            console.error("Error retrieving saved event details:", error);
        });

        console.log(`Event details saved: Event - ${eventName}, URL - ${schedulingUrl}`);
        // Navigate to the appointment page
        router.push('pages/request-appointment'); 
    };

    useEffect(() => {
        loadVetData();
    }, []);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-800">
                <ActivityIndicator size="large" color="#ffffff" />
                <Text className="text-white mt-4">Cargando Veterinarias...</Text>
            </View>
        );
    }

    return (
        <ScrollView
            className="flex-1 bg-gray-800 p-4"
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        >
            <Text className="text-2xl font-psemibold text-white text-center mb-4">
                Análisis de laboratorio
            </Text>

            <View className="bg-gray-700 rounded-lg overflow-hidden justify-center border border-gray-500 mb-6 h-24">
                <Picker
                    selectedValue={selectedDistrict}
                    onValueChange={(value) => setSelectedDistrict(value)}
                    className="text-white"
                    dropdownIconColor="white"
                    style={{
                        color: 'white',
                        backgroundColor: 'transparent',
                        textAlign: 'center', 
                        textAlignVertical: 'center', 
                    }}
                    itemStyle={{
                        textAlign: 'center', 
                        color: 'white', 
                        fontSize: 16, 
                    }}
                >
                    <Picker.Item label="Todos los Barrios" value="" />
                    {districts.map((district, index) => (
                        <Picker.Item key={index} label={district} value={district} />
                    ))}
                </Picker>
            </View>

            {transformedData.length > 0 ? (
                transformedData.map((data, index) => (
                    <View key={index} className="bg-gray-600 rounded-lg p-4 mb-4 shadow-md">
                        <Text className="text-xl font-psemibold text-center text-white mb-2">
                            {data.eventName}
                        </Text>
                        <Text className="text-sm font-pregular text-white">
                            Veterinaria: {data.vet.name}
                        </Text>
                        <Text className="text-sm font-pregular text-white">
                            Dirección: {data.vet.address}
                        </Text>
                        <Text className="text-sm font-pregular text-white">
                            Barrio: {data.vet.district}
                        </Text>
                        <Text className="text-sm font-pregular text-white">
                            Número de teléfono: {data.vet.phoneNumber}
                        </Text>
                        <TouchableOpacity 
                            className="mt-4"
                            onPress={() => handleRequestAppointment(data.eventName, data.schedulingUrl)} 
                        >
                            <Text className="text-blue-400 text-center font-pbold">
                                Solicitar turno
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))
            ) : (
                <Text className="text-center text-sm text-white">
                    No se encontraron Veterinarias con turnos para Análisis de laboratorio.
                </Text>
            )}
        </ScrollView>
    );
};

export default ViewLabtests;
