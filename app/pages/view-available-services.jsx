import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { fetchAndSaveCombinedVetData } from "../../utils/vets_api";
import { getEventDetails , saveEventDetails} from "../../utils/storage"; 
import { Picker } from "@react-native-picker/picker";
import { Link, useRouter } from "expo-router";

const ViewAvailableServices = () => {
    const [vetData, setVetData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEventDetails, setSelectedEventDetails] = useState(null); 
    const [districts, setDistricts] = useState([]); 
    const [selectedDistrict, setSelectedDistrict] = useState(""); 
    const router = useRouter();

    useEffect(() => {
        const loadVetData = async () => {
            try {
                setLoading(true);
                const combinedData = await fetchAndSaveCombinedVetData(); // Fetch combined vet data

                // Fetch the event details from AsyncStorage (saved earlier)
                const savedEventDetails = await getEventDetails();
                setSelectedEventDetails(savedEventDetails);

                if (savedEventDetails) {
                    // Filter data based on the selected eventName
                    const filteredData = combinedData.filter((vet) => 
                        vet.events.some(event => event.eventName === savedEventDetails.eventName)
                    );

                    setVetData(filteredData);

                    // Set unique districts based on the filtered data
                    const uniqueDistricts = [
                        ...new Set(
                            filteredData
                                .map((vet) => vet.district)
                        ),
                    ];
                    setDistricts(uniqueDistricts); 
                } else {
                    console.log("No event details found in AsyncStorage.");
                }
            } catch (error) {
                console.error("Error loading vet data:", error);
            } finally {
                setLoading(false);
            }
        };

        loadVetData();
    }, []);

    const handleRequestAppointment = (eventName, schedulingUrl) => {
        // Save the event details to AsyncStorage when the user clicks "Solicitar Turno"
        if (eventName && schedulingUrl) {
            saveEventDetails(eventName, schedulingUrl);
            console.log("Event details saved:", { eventName, schedulingUrl });
            router.push('pages/request-appointment'); // Navigate to the appointment page
        } else {
            console.error("Event details are missing.");
        }
    };

    const filteredData = selectedDistrict
        ? vetData.filter((vet) => vet.district === selectedDistrict)
        : vetData;

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-800">
                <ActivityIndicator size="large" color="#ffffff" />
                <Text className="text-white mt-4">Cargando Veterinarias...</Text>
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-gray-800 p-4">
            <Text className="text-2xl font-semibold text-white text-center mb-4">
                {selectedEventDetails?.eventName || "Evento no seleccionado"}
            </Text>

            <View className="flex-row items-center justify-between px-4 mb-4 mt-4">
                <TouchableOpacity onPress={() => router.push('pages/view-services')}>
                    <Text className="text-base font-pmedium text-white">{'<'}</Text>
                </TouchableOpacity>
                <Text className="font-pregular text-center text-xl text-gray-100 text-white mb-4">
                    {selectedEventDetails?.eventName || "No event selected"}
                </Text>
            </View>

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

            {/* Display filtered vet data */}
            {filteredData.length > 0 ? (
                filteredData.map((vet, index) => (
                    <View key={index} className="bg-gray-600 rounded-lg p-4 mb-4 shadow-md">
                        <Text className="text-lg font-psemibold text-white mb-2 text-center">{vet.name}</Text>
                        <Text className="text-white mb-1">Dirección: {vet.address}</Text>
                        <Text className="text-white mb-1">Barrio: {vet.district}</Text>
                        <Text className="text-white mb-1">Teléfono: {vet.phoneNumber}</Text>
                        {/* Filter events and display only the one matching the eventName */}
                        {vet.events.filter(event => event.eventName === selectedEventDetails?.eventName).map((event, index) => (
                            <TouchableOpacity
                                key={index}
                                className="mt-4"
                                onPress={() => handleRequestAppointment(event.eventName, event.schedulingUrl)} // Pass event details
                            >
                                <Text className="text-blue-400 text-center font-pbold">
                                    Solicitar turno
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))
            ) : (
                <Text className="text-white text-center">No hay veterinarias disponibles para este evento</Text>
            )}
        </ScrollView>
    );
};

export default ViewAvailableServices;
