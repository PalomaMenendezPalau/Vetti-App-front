import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { fetchAndSaveCombinedVetData } from "../../utils/vets_api";
import { getEventDetails } from "../../utils/storage"; // Import the function to get event details
import { Picker } from "@react-native-picker/picker";
import { Link, useRouter } from "expo-router";

const ViewAvailableServices = () => {
    const [vetData, setVetData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEventDetails, setSelectedEventDetails] = useState(null); // Store selected event details
    const [districts, setDistricts] = useState([]); // Store districts for the selected event
    const [selectedDistrict, setSelectedDistrict] = useState(""); // Store selected district for filter
    const router = useRouter();

    useEffect(() => {
        const loadVetData = async () => {
            try {
                setLoading(true);
                // Retrieve the saved event details from AsyncStorage
                const savedEventDetails = await getEventDetails();
                setSelectedEventDetails(savedEventDetails);

                if (savedEventDetails) {
                    // Fetch all the veterinarian data
                    const combinedData = await fetchAndSaveCombinedVetData();

                    // Filter the data to only include veterinarians with the matching event
                    const filteredData = combinedData.filter((vet) => {
                        return vet.events.some(event => event.eventName === savedEventDetails.eventName);
                    });

                    setVetData(filteredData);

                    // Extract unique districts based on the selected event's district
                    const uniqueDistricts = [
                        ...new Set(
                            filteredData
                                .filter(vet => vet.events.some(event => event.eventName === savedEventDetails.eventName))
                                .map((vet) => vet.district)
                        ),
                    ];
                    setDistricts(uniqueDistricts); // Update the districts based on matching event
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

    // Filter by selected district
    const filteredData = selectedDistrict
        ? vetData.filter((vet) => vet.district === selectedDistrict)
        : vetData;

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-800">
                <ActivityIndicator size="large" color="#ffffff" />
                <Text className="text-white mt-4">Loading vet data...</Text>
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-gray-800 p-4">
            <Text className="text-2xl font-semibold text-white text-center mb-4"></Text>

            <View className="flex-row items-center justify-between px-4 ">
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

            {/* Display filtered vet data */}
            {filteredData.length > 0 ? (
                filteredData.map((vet, index) => (
                    <View key={index} className="bg-gray-600 rounded-lg p-4 mb-4 shadow-md">
                        <Text className="text-lg font-psemibold text-white mb-2 text-center">{vet.name}</Text>
                        <Text className="text-white mb-1">Direccion: {vet.address}</Text>
                        <Text className="text-white mb-1">Barrio: {vet.district}</Text>
                        <Text className="text-white mb-1">Telefono: {vet.phoneNumber}</Text>
                        <TouchableOpacity className="mt-4">
                            <Link href="pages/request-appointment">
                                <Text className="text-blue-400 text-center font-pbold">
                                    Solicitar turno
                                </Text>
                            </Link>
                        </TouchableOpacity>
                    </View>
                ))
            ) : (
                <Text className="text-white text-center">No hay veterinarias disponibles para este evento</Text>
            )}
        </ScrollView>
    );
};

export default ViewAvailableServices;
