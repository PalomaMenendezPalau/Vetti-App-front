import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton, FormField, images } from '../../constants';
import { Link, useRouter } from 'expo-router'; 
import { signInUser } from '../../utils/users_api';  

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const submit = async () => {
    setIsLoading(true);

    try {
      const { token, user } = await signInUser(form.email, form.password);

      console.log('Login successful:', user);
      
      router.push('/home');  
      
    } catch (error) {
      Alert.alert('Error', error.response ? error.response.data.message : 'Login failed. Please try again.');
      console.error('Login error:', error);
      console.log("Request URL:", url);
      console.log("Request Body:", JSON.stringify(requestBody));
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
            title="Correo electrónico"
            value={form.email}
            placeholder="tu.email@email.com"
            handleChangeText={(e) => setForm({ ...form, email: e.toLowerCase() })}
            otherStyles="mt-7"
            keybordType="email-address"
          />

          <FormField
            title="Contraseña"
            placeholder="•••••••••••"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-4"
            secureTextEntry={true} 
          />

          <CustomButton
            title="Iniciar sesión"
            handlePress={submit} 
            containerStyles="mt-7"
            isLoading={isLoading} 
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Link href="/recover-pass" className="text-base text-sky-800 font-psemibold">
             ¿Olvidaste tu contraseña?
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
