import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Picker } from 'react-native';
import { fetchVets } from '../../utils/vets_api'; // Assuming the API function is in user_api.js

const VetListView = () => {
  const [vets, setVets] = useState([]);
  const [filteredVets, setFilteredVets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');

  useEffect(() => {
    const loadVets = async () => {
      try {
        const vetData = await fetchVets();
        // Filter only vets with isEmergencyVet as true
        const emergencyVets = vetData.filter((vet) => vet.isEmergencyVet);

        // Extract unique districts
        const uniqueDistricts = [...new Set(emergencyVets.map((vet) => vet.district))];
        setDistricts(uniqueDistricts);

        setVets(emergencyVets);
        setFilteredVets(emergencyVets); // Set initial filtered list
      } catch (error) {
        console.error('Error loading vets:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVets();
  }, []);

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
    if (district) {
      // Filter vets by selected district
      setFilteredVets(vets.filter((vet) => vet.district === district));
    } else {
      // Show all vets if no district is selected
      setFilteredVets(vets);
    }
  };

  const renderVetItem = ({ item }) => (
    <View className="bg-gray-600 shadow-md rounded-lg p-4 mb-4">
      <Text className="text-lg text-white font-semibold mb-2">{item.name}</Text>
      <Text className="text-sm text-white">District: {item.district}</Text>
      <Text className="text-sm text-white">Address: {item.address}</Text>
      <Text className="text-sm text-white">Email: {item.email}</Text>
      <Text className="text-sm text-white">Phone: {item.phoneNumber}</Text>
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="text-blue-500 mt-4">Loading vets...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-200">
      <Text className="text-2xl font-semibold text-center text-white py-4 bg-gray-800">
        Guardias 24/hrs
      </Text>
      <View className="bg-white px-4 py-3">
        <Text className="text-lg font-medium mb-2">Filter by District:</Text>
        <Picker
          selectedValue={selectedDistrict}
          onValueChange={(value) => handleDistrictChange(value)}
          style={{ height: 50, borderColor: 'gray', borderWidth: 1 }}
        >
          <Picker.Item label="All Districts" value="" />
          {districts.map((district) => (
            <Picker.Item key={district} label={district} value={district} />
          ))}
        </Picker>
      </View>
      <FlatList
        data={filteredVets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderVetItem}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
};

export default VetListView;