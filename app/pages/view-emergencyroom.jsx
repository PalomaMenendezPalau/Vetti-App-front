import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { fetchVets } from '../../utils/vets_api';
import { Picker } from '@react-native-picker/picker';

const ViewEmergencyroom = () => {
  const [vets, setVets] = useState([]);
  const [filteredVets, setFilteredVets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false); // State for pull-to-refresh

  useEffect(() => {
    const loadVets = async () => {
      try {
        const vetData = await fetchVets();
        const emergencyVets = vetData.filter((vet) => vet.isEmergencyVet);
        const uniqueDistricts = [...new Set(emergencyVets.map((vet) => vet.district))];
        setDistricts(uniqueDistricts);

        setVets(emergencyVets);
        setFilteredVets(emergencyVets); // Set initial filtered list
      } catch (error) {
        console.error('Error loading vets:', error);
      } finally {
        setLoading(false);
        setIsRefreshing(false); // Stop refreshing once data is loaded
      }
    };

    loadVets();
  }, []);

  // Handle district filter change
  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
    if (district) {
      setFilteredVets(vets.filter((vet) => vet.district === district));
    } else {
      setFilteredVets(vets);
    }
  };

  // Handle pull-to-refresh
  const onRefresh = () => {
    setIsRefreshing(true);
    const loadVets = async () => {
      try {
        const vetData = await fetchVets();
        const emergencyVets = vetData.filter((vet) => vet.isEmergencyVet);
        const uniqueDistricts = [...new Set(emergencyVets.map((vet) => vet.district))];
        setDistricts(uniqueDistricts);

        setVets(emergencyVets);
        setFilteredVets(emergencyVets); // Set initial filtered list
      } catch (error) {
        console.error('Error loading vets:', error);
      } finally {
        setIsRefreshing(false); // Stop refreshing once data is loaded
      }
    };

    loadVets();
  };

  // Render vet item in the list
  const renderVetItem = ({ item }) => (
    <View className="bg-gray-600 shadow-md rounded-lg p-4 mb-4">
      <Text className="text-lg text-white font-psemibold mb-2">{item.name}</Text>
      <Text className="text-sm text-white font-pregular mb-1">Barrio: {item.district}</Text>
      <Text className="text-sm text-white font-pregular mb-1">Dirección: {item.address}</Text>
      <Text className="text-sm text-white font-pregular mb-1">Correo electrónico: {item.email}</Text>
      <Text className="text-sm text-white font-pregular mb-1">Teléfono: {item.phoneNumber}</Text>
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-800">
        <ActivityIndicator size="large" color="#ffffff" />
        <Text className="text-white mt-4">Loading vets...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-800">
      <Text className="text-2xl font-psemibold text-center text-white py-4 bg-gray-800">
        Guardias 24/hrs
      </Text>
      <View className="bg-gray-800 px-4 mb-4 items-center">
        <Text className="text-lg text-white font-pmedium mb-2">Buscar por Barrio:</Text>
        <View className="bg-gray-700 rounded-lg justify-center border border-gray-500 w-80 h-24">
          <Picker
            selectedValue={selectedDistrict}
            onValueChange={(value) => handleDistrictChange(value)}
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
            {districts.map((district) => (
              <Picker.Item key={district} label={district} value={district} />
            ))}
          </Picker>
        </View>
      </View>

      {/* FlatList with pull-to-refresh */}
      <FlatList
        data={filteredVets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderVetItem}
        contentContainerStyle={{ padding: 10 }}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />} // Add refresh control here
      />
    </View>
  );
};

export default ViewEmergencyroom;
