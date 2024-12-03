
import { View, Text, FlatList, Image, TouchableOpacity , ActivityIndicator} from 'react-native';
import {React , useState, useEffect }from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
// Assuming you have icons for each button
import { icons, images } from '../../constants'; // Assuming your icons are stored here
import { fetchUserDetails } from '../../utils/users_api'; 
import {  useRouter } from 'expo-router'; 

const Home = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation(); 
    const router = useRouter();

      // Fetch user details when the component mounts
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const userDetails = await fetchUserDetails();
        setUser(userDetails);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      } finally {
        setLoading(false);
      }
    };

    getUserDetails();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading user details...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-gray-800 h-full">
      <FlatList 
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text className='text-3xl'>{item.id}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="flex-row justify-between items-start mb-2">
              <View>
                <Text className="font-pmedium text-xl text-gray-100 text-white">
                  Hola!
                </Text>
                <Text className="font-psemibold text-2xl  text-white">
                {user ? user.name : 'User'}
                </Text>
              </View>
              <View className="mt-1.5 items-center justify-center">
                <Image 
                  source={images.logo}
                  className="w-24 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            {/* Button Boxes */}
            <View className="flex-row flex-wrap justify-between mt-5">
              {/* First Row */}
              <TouchableOpacity className="w-[48%] bg-gray-600 rounded-xl p-5 mb-4 items-center shadow-md"
               onPress={() => navigation.jumpTo('vets')}>
                <Text className="text-lg font-psemibold text-white">Solicitar turno</Text>
                <Text className="text-sm font-pmedium text-center text-white">Agendá un turno o estudio a realizar</Text>
                <Image source={icons.plus} 
                className="w-10 h-10 mt-3" 
                resizeMode="contain"
                />
              </TouchableOpacity>

              <TouchableOpacity className="w-[48%] bg-gray-600 rounded-xl p-5 mb-4 items-center shadow-md"
              onPress={() => router.push('../pages/view-emergencyroom')}>
                <Text className="text-lg font-psemibold text-white">Buscar guardia</Text>
                <Text className="text-sm font-pmedium text-center text-white">Consultá las diferentes guardias</Text>
                <Image source={icons.search} 
                className="w-10 h-10 mb-3 mt-3"
                resizeMode="contain" />
              </TouchableOpacity>

              {/* Second Row */}
              <TouchableOpacity className="w-[48%] bg-gray-600 rounded-xl p-5 mb-4 items-center shadow-md"
               onPress={() => navigation.jumpTo('appointment')}>
                <Text className="text-lg font-psemibold text-white">Ver mis turnos</Text>
                <Text className="text-sm  font-pmedium text-center text-white">Administra todos tus turnos agendados</Text>
                <Image source={icons.calendar} 
                className="w-10 h-10 mb-3 mt-3"
                resizeMode="contain" />
              </TouchableOpacity>

              <TouchableOpacity className="w-[48%] bg-gray-600 rounded-xl p-5 mb-4 items-center shadow-md"
               onPress={() => navigation.jumpTo('profile')}>
                <Text className="text-lg font-psemibold text-white">Mascotas</Text>
                <Text className="text-sm font-pmedium text-center text-white">Gestiona a tu/s mascotas</Text>
                <Image source={icons.pets} 
                className="w-12 h-12 mt-6"
                resizeMode="contain" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;