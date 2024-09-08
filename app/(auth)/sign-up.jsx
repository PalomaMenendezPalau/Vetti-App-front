import { View, Text, ScrollView ,Image} from 'react-native'
import {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { CustomButton, FormField, images } from '../../constants'
import { Link } from 'expo-router'
const SignUp = () => {

  const [form, setForm] = useState({
    name:'',
    lastName:'',
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
                <Text className="text-2xl text-white text-semibold -mb-2 -mt-6  font-psemibold">Crea tu cuenta</Text>
                <FormField
                    title="Nombre/s"
                    value={form.name}
                    handleChangeText={(e) => setForm({...form,name: e })}
                    otherStyles ="mt-7"
                    
                />
                <FormField
                    title="Apellido/s"
                    value={form.lastName}
                    handleChangeText={(e) => setForm({...form,lastName: e })}
                    otherStyles ="mt-4"
                />
                <FormField
                    title="Email"
                    value={form.email}
                    placeholder="tu.email@email.com"
                    handleChangeText={(e) => setForm({...form,email: e })}
                    otherStyles ="mt-4"
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
                    title="Crear Cuenta"
                    handlePress={submit}
                    containerStyles="mt-7"
                    isLoading={isLoading}
                />
                  <View className="justify-center pt-5 flex-row gap-2">
                  <Text className="text-base text-white font-pregular">
                  ¿Ya tienes una cuenta? 
                  </Text>
                  <Link href="/sign-in" className='text-base text-sky-800 font-psemibold'>Inicia sesión</Link>
                </View>
                

            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp