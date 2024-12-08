import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { requestPasswordReset } from '../../utils/users_api'; // Import the requestPasswordReset function
import { images, CustomButton, FormField } from '../../constants';
import { saveEmailForPasswordReset } from '../../utils/storage'; // Import the function to save email

const RecoverPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // State for loading indicator
  const router = useRouter();

  // Handle email input change
  const handleEmailChange = (text) => {
    setEmail(text);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!email) {
      Alert.alert('Error', 'Por favor ingresa tu correo electrónico.');
      return;
    }

    try {
      setLoading(true); // Show loading indicator when starting request

      // Save email for password reset
      await saveEmailForPasswordReset(email);

      console.log('Requesting password reset for:', email);

      // Send password reset request
      await requestPasswordReset(email);

      console.log('Password reset request successful');

      // On success, navigate to the recover-opt page
      router.push('/recover-otp');
    } catch (error) {
      console.error('Error during password reset request:', error);
      Alert.alert('Error', 'Hubo un problema al enviar el correo de recuperación.');
    } finally {
      setLoading(false); // Hide loading indicator after the request
    }
  };

  return (
    <SafeAreaView className="bg-slate-400 h-full">
      <ScrollView>
        <View className="w-full flex justify-center min-h-[85vh] px-4 -mt-44">
          <Image
            source={images.logo}
            resizeMode='contain'
            className="w-[115px] h-[35pc]"
          />
          <Text className="text-2xl text-white text-semibold -mb-4 font-psemibold">Recuperar tu cuenta</Text>
          
          {/* Form for email */}
          <FormField
            title="Introduce tu email"
            value={email}
            placeholder="tu.email@email.com"
            handleChangeText={(text) => handleEmailChange(text.toLowerCase())}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          
          {/* Submit Button */}
          <CustomButton
            title="Siguiente"
            handlePress={handleSubmit}
            containerStyles="mt-7"
            isLoading={loading}
          />
          
          {/* Link to Sign In */}
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-base text-white font-pregular">
              ¿Ya tienes una cuenta? 
            </Text>
            <TouchableOpacity onPress={() => router.push('/sign-in')}>
              <Text className="text-base text-sky-800 font-psemibold">Inicia sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecoverPassword;
