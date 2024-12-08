import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton, FormField, images } from '../../constants';
import { Link, useRouter } from 'expo-router'; 
import { resetPassword } from '../../utils/users_api'; // Import resetPassword API
import { getEmailForPasswordReset } from '../../utils/storage'; // Import the function to get the saved email

const RecoverOTP = () => {
  const [form, setForm] = useState({
    password: '',
    otp: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // To navigate after successful reset

  // Function to handle form submission
  const submit = async () => {
    if (!form.password || !form.otp) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      setIsLoading(true);
      
      // Retrieve the saved email for password reset
      const email = await getEmailForPasswordReset();
      if (!email) {
        Alert.alert('Error', 'No email found for password reset.');
        setIsLoading(false);
        return;
      }

      // Call resetPassword API with the saved email, OTP, and new password
      const response = await resetPassword(email, form.otp, form.password); 
      console.log('Password reset successfully:', response);
      
      Alert.alert('Success', 'Your password has been reset successfully.');
      router.push('/sign-in'); // Redirect to the sign-in page after success
    } catch (error) {
      console.error('Error resetting password:', error);
      Alert.alert('Error', 'There was an issue resetting your password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-slate-400 h-full">
      <ScrollView>
        <View className="w-full flex justify-center min-h-[85vh] px-4 -mt-32">
          <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35pc]" />
          <Text className="text-2xl text-white text-semibold -mb-4 font-psemibold">Recuperar tu cuenta</Text>

          {/* Password Field */}
          <FormField
            title="Introduce tu nueva Contraseña"
            placeholder="•••••••••••"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-4 font-pregular"
            secureTextEntry={true}
          />

          {/* OTP Field */}
          <FormField
            title="Codigo de validacion"
            placeholder=""
            value={form.otp}
            handleChangeText={(e) => setForm({ ...form, otp: e })}
            otherStyles="mt-4 font-pregular"
          />

          {/* Submit Button */}
          <CustomButton
            title="Siguiente"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isLoading}
          />

          {/* Sign In Link */}
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-base text-white font-pregular">¿Ya tienes una cuenta? </Text>
            <Link href="/sign-in" className="text-base text-sky-800 font-psemibold">Inicia sesión</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecoverOTP;
