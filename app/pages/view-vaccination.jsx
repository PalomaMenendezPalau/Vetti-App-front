import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import { fetchAndSaveCombinedVetData } from "../../utils/vets_api";
import { saveEventDetails, getEventDetails } from "../../utils/storage"; // Import the saveEventDetails function
import { Link } from "expo-router";
import { Picker } from "@react-native-picker/picker";

const ViewVaccination = () => {
    const [vetData, setVetData] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false); // State to manage pull-to-refresh

    // Function to fetch and load vet data
    const loadVetData = async () => {
        try {
            setLoading(true);
            const combinedData = await fetchAndSaveCombinedVetData();
            setVetData(combinedData);

            // Extract districts that have at least one event with "Extracción de sangre" or "Generales"
            const districtsWithEvents = [
                ...new Set(
                    combinedData
                        .filter((vet) =>
                            vet.events.some(
                                (event) =>
                                    event.eventName === "Extracción de sangre" ||
                                    event.eventName === "Generales"
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
            setIsRefreshing(false); // Stop refreshing after data is loaded
        }
    };

    // Handle pull-to-refresh
    const onRefresh = () => {
        setIsRefreshing(true);
        loadVetData(); // Refetch the data
    };

    // Filter data by selected district
    const filteredData = selectedDistrict
        ? vetData.filter((vet) => vet.district === selectedDistrict)
        : vetData;

    // Transform data to include only events with "Extracción de sangre" or "Generales"
    const transformedData = filteredData.flatMap((vet) =>
        vet.events
            .filter((event) => event.eventName === "Extracción de sangre" || event.eventName === "Generales")
            .map((event) => ({ ...event, vetName: vet.vetName, vet }))
    );

    // Handle event click and save details
    const handleRequestAppointment = (eventName, schedulingUrl) => {
        console.log("Saving event details:", { eventName, schedulingUrl });

        saveEventDetails(eventName, schedulingUrl);

        // Retrieve saved event details to confirm they are saved correctly
        getEventDetails().then((data) => {
            console.log("Retrieved saved event details:", data);
        }).catch((error) => {
            console.error("Error retrieving saved event details:", error);
        });

        console.log(`Event details saved: Event - ${eventName}, URL - ${schedulingUrl}`);
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
                Extracción de Sangre
            </Text>

            {/* District Filter */}
            <View className="bg-gray-700 rounded-lg overflow-hidden justify-center border border-gray-500 mb-6 h-24">
                <Picker
                    selectedValue={selectedDistrict}
                    onValueChange={(value) => setSelectedDistrict(value)}
                    className="text-white"
                    dropdownIconColor="white"
                    style={{
                        color: 'white',
                        backgroundColor: 'transparent',
                        textAlign: 'center', // Center text for Android
                        textAlignVertical: 'center', // Center text vertically for Android
                    }}
                    itemStyle={{
                        textAlign: 'center', // Center text for iOS
                        color: 'white', // Ensure white text
                        fontSize: 16, // Adjust font size for readability
                    }}
                >
                    <Picker.Item label="Todos los Barrios" value="" />
                    {districts.map((district, index) => (
                        <Picker.Item key={index} label={district} value={district} />
                    ))}
                </Picker>
            </View>

            {/* Display Transformed Data */}
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
                            onPress={() => handleRequestAppointment(data.eventName, data.schedulingUrl)} // Pass event details
                        >
                            <Link href="pages/request-appointment">
                                <Text className="text-blue-400 text-center font-pbold">
                                    Solicitar turno
                                </Text>
                            </Link>
                        </TouchableOpacity>
                    </View>
                ))
            ) : (
                <Text className="text-center text-sm text-white">
                    No se encontraron Veterinarias con eventos de Vacunación y/o desparasitación.
                </Text>
            )}
        </ScrollView>
    );
};

export default ViewVaccination;
