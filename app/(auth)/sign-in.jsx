import { View, Text, ScrollView ,Image} from 'react-native'
import {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { CustomButton, FormField, images } from '../../constants'
import { Link } from 'expo-router'
const SignIn = () => {

  const [form, setForm] = useState({
    email: '',
    password:''
  })

  const [isLoading, setIsLoading] = useState(false)

  const submit = () => {

  }

  return (
    <SafeAreaView className="bg-slate-400 h-full">
        <ScrollView>
            <View className="w-full flex justify-center min-h-[85vh] px-4 -mt-6">
                <Image
                    source={images.logo}
                    resizeMode='contain'
                    className="w-[115px] h-[35pc]"
                />
                <Text className="text-2xl text-white text-semibold -mb-4  font-psemibold">Accede a tu cuenta</Text>
                <FormField
                    title="Email"
                    value={form.email}
                    placeholder="tu.email@email.com"
                    handleChangeText={(e) => setForm({...form,email: e })}
                    otherStyles ="mt-7"
                    keybordType="email-address"
                />

                <FormField
                    title="Contraseña"
                    placeholder="•••••••••••"
                    value={form.password}
                    handleChangeText={(e) => setForm({...form,password: e })}
                    otherStyles ="mt-4"
                    
                />

                <CustomButton
                    title="Iniciar sesión"
                    handlePress={submit}
                    containerStyles="mt-7"
                    isLoading={isLoading}
                />
                  <View className="justify-center pt-5 flex-row gap-2">
                  <Link href="/recover-pass" className='text-base text-sky-800 font-psemibold'>¿Olvidaste tu Contraseña?</Link>
                </View>
                <View className="justify-center pt-5 flex-row gap-2 mt-44">
                  <Text className="text-xl text-white font-pregular">
                  ¿No tienes una cuenta? 
                  </Text>
                  <Link href="/sign-up" className='text-xl text-sky-800 font-psemibold'>Regístrate</Link>
                </View>

            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn