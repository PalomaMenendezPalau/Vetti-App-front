import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton, FormField, images } from '../../constants';
import { Link } from 'expo-router';
import { createUser } from '../../src/users_api'; // Adjust the path according to your project structure

const SignUp = () => {
  // State for form fields
  const [form, setForm] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  // State for loading and error handling
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const submit = async () => {
    const { name, lastName, email, password, phoneNumber } = form;

    if (!name || !lastName || !email || !password || !phoneNumber) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    try {
      setIsLoading(true); // Set loading state to true
      // Call the createUser function with form data
      const response = await createUser(name, lastName, password, email, phoneNumber)

      // Show success message to the user
      Alert.alert('Éxito', 'Usuario creado exitosamente');
      setForm({
        name: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber:'',
      }); // Reset form
    } catch (error) {
      // Handle error and show message to the user
      Alert.alert('Error', 'No se pudo crear el usuario. Inténtalo de nuevo.');
      console.error('User creation error:', error);
    } finally {
      setIsLoading(false); // Reset loading state
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
          <Text className="text-2xl text-white text-semibold -mb-2 -mt-12 font-psemibold">
            Crea tu cuenta
          </Text>

          <FormField
            title="Nombre/s"
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            otherStyles="mt-4"
          />

          <FormField
            title="Apellido/s"
            value={form.lastName}
            handleChangeText={(e) => setForm({ ...form, lastName: e })}
            otherStyles="mt-2"
          />

          <FormField
            title="Email"
            value={form.email}
            placeholder="tu.email@email.com"
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-2"
            keybordType="email-address"
          />

          <FormField
            title="Numero de Telefono"
            placeholder="54 1123457890"
            value={form.phoneNumber}
            handleChangeText={(e) => setForm({ ...form, phoneNumber: e })}
            otherStyles="mt-2"
          />      

          <FormField
            title="Contraseña"
            placeholder="•••••••••••"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-2"
          />

          <CustomButton
            title="Crear Cuenta"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isLoading}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-base text-white font-pregular">
              ¿Ya tienes una cuenta?
            </Text>
            <Link href="/sign-in" className="text-base text-sky-800 font-psemibold">
              Inicia sesión
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
