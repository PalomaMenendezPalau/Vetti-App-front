import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton, FormField, images } from '../../constants';
import { Link, useRouter } from 'expo-router'; // Import useRouter for navigation
import { signInUser } from '../../utils/users_api';  // Ensure the path to your users_api.js is correct

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // Get the router object from expo-router

  const submit = async () => {
    setIsLoading(true);

    try {
      // Call the signInUser function to authenticate the user
      const { token, user } = await signInUser(form.email, form.password);

      // Log the data for debugging
      console.log('Login successful:', user);
      
      // Navigate to the Home page using expo-router's router.push
      router.push('/home');  // This will redirect the user to the Home screen
      
    } catch (error) {
      // Show an alert in case of an error
      Alert.alert('Error', error.response ? error.response.data.message : 'Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-slate-400 h-full">
      <ScrollView>
        <View className="w-full flex justify-center min-h-[85vh] px-4 -mt-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35pc]"
          />
          <Text className="text-2xl text-white text-semibold -mb-4 font-psemibold">
            Accede a tu cuenta
          </Text>
          <FormField
            title="Email"
            value={form.email}
            placeholder="tu.email@email.com"
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keybordType="email-address"
          />

          <FormField
            title="Contraseña"
            placeholder="•••••••••••"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-4"
            secureTextEntry={true} // Ensure password is masked
          />

          <CustomButton
            title="Iniciar sesión"
            handlePress={submit} // Attach the submit function to the button press
            containerStyles="mt-7"
            isLoading={isLoading} // Disable button while logging in
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Link href="/recover-pass" className="text-base text-sky-800 font-psemibold">
              ¿Olvidaste tu Contraseña?
            </Link>
          </View>
          <View className="justify-center pt-5 flex-row gap-2 mt-44">
            <Text className="text-xl text-white font-pregular">
              ¿No tienes una cuenta?
            </Text>
            <Link href="/sign-up" className="text-xl text-sky-800 font-psemibold">
              Regístrate
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
