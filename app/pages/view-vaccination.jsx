import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import { fetchAndSaveCombinedVetData } from "../../utils/vets_api";

const ViewVaccination = () => {
    const [vetData, setVetData] = useState([]);
    const [neighborhood, setNeighborhood] = useState("");

    useEffect(() => {
        const loadVetData = async () => {
            try {
                const combinedData = await fetchAndSaveCombinedVetData();
                setVetData(combinedData);
            } catch (error) {
                console.error("Error loading vet data:", error);
            }
        };

        loadVetData();
    }, []);

    // Filter data by neighborhood
    const filteredData = neighborhood
        ? vetData.filter((vet) =>
              vet.neighborhood.toLowerCase().includes(neighborhood.toLowerCase())
          )
        : vetData;

    return (
        <ScrollView className="flex-1 bg-white p-4">
            <Text className="text-xl font-bold text-center mb-4">Vaccination Centers</Text>

            {/* Neighborhood Filter */}
            <View className="mb-6">
                <TextInput
                    className="border border-gray-300 rounded-lg p-2 text-base"
                    placeholder="Enter neighborhood"
                    value={neighborhood}
                    onChangeText={setNeighborhood}
                />
            </View>

            {/* Display Filtered Data */}
            {filteredData.length > 0 ? (
                filteredData.map((vet) => (
                    <View
                        key={vet.id}
                        className="bg-gray-100 rounded-lg p-4 mb-4 shadow-md"
                    >
                        <Text className="text-lg font-semibold">{vet.vetName}</Text>
                        <Text className="text-gray-600">Address: {vet.address}</Text>
                        <Text className="text-gray-600">Neighborhood: {vet.neighborhood}</Text>
                        <Text className="text-gray-600">Phone: {vet.phone}</Text>

                        <Text className="text-lg font-semibold mt-4">Available Events:</Text>
                        {vet.events && vet.events.length > 0 ? (
                            vet.events.map((event, index) => (
                                <View
                                    key={index}
                                    className="bg-white p-2 rounded-md mt-2 border border-gray-200"
                                >
                                    <Text className="text-gray-800">Event: {event.title}</Text>
                                    <Text className="text-gray-800">Date: {event.date}</Text>
                                    <Text className="text-gray-800">Time: {event.time}</Text>
                                </View>
                            ))
                        ) : (
                            <Text className="text-gray-600">No events available.</Text>
                        )}
                    </View>
                ))
            ) : (
                <Text className="text-gray-600 text-center">No veterinarians found.</Text>
            )}
        </ScrollView>
    );
};

export default ViewVaccination;
