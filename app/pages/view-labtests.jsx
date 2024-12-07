import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { fetchAndSaveCombinedVetData } from "../../utils/vets_api";
import { Picker } from "@react-native-picker/picker";
import { Link } from "expo-router";

const ViewVaccination = () => {
    const [vetData, setVetData] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");

    useEffect(() => {
        const loadVetData = async () => {
            try {
                const combinedData = await fetchAndSaveCombinedVetData();
                setVetData(combinedData);

                // Extract unique districts from the data
                const uniqueDistricts = [...new Set(combinedData.map((vet) => vet.district))];
                setDistricts(uniqueDistricts);
            } catch (error) {
                console.error("Error loading vet data:", error);
            }
        };

        loadVetData();
    }, []);

    // Filter data by selected district
    const filteredData = selectedDistrict
        ? vetData.filter((vet) => vet.district === selectedDistrict)
        : vetData;

    // Transform data to include only events with "Extracción de sangre"
    const transformedData = filteredData.flatMap((vet) =>
        vet.events
            .filter((event) => event.eventName === "Extracción de sangre" || "Generales") // Filter for specific event name
            .map((event) => ({ ...event, vetName: vet.vetName, vet }))
    );

    return (
        <ScrollView className="flex-1 bg-gray-800 p-4">
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
                    <View
                        key={index}
                        className="bg-gray-600 rounded-lg p-4 mb-4 shadow-md"
                    >
                        <Text className="text-xl font-psemibold text-center text-white mb-2">
                           {data.eventName}
                        </Text>
                        <Text className="text-sm font-pregular text-white ">
                            Veterinaria: {data.vet.name}
                        </Text>
                        <Text className="text-sm font-pregular text-white ">
                            Dirección: {data.vet.address}
                        </Text>
                        <Text className="text-sm font-pregular text-white ">
                            Barrio: {data.vet.district}
                        </Text>
                        <Text className="text-sm font-pregular text-white ">
                        Número de teléfono: {data.vet.phoneNumber}
                        </Text>
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
                <Text className="text-center text-sm text-white">
                    No se encontraron Veterinarias con eventos de Vacunación y/o desparasitación.
                </Text>
            )}
        </ScrollView>
    );
};

export default ViewVaccination;
