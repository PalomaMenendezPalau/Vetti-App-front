import { View, Text, ScrollView ,Image} from 'react-native'
import {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { CustomButton, FormField, images } from '../../constants'
import { Link } from 'expo-router'
const RecoverPass = () => {

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
            <View className="w-full flex justify-center min-h-[85vh] px-4 -mt-44">
                <Image
                    source={images.logo}
                    resizeMode='contain'
                    className="w-[115px] h-[35pc]"
                />
                <Text className="text-2xl text-white text-semibold -mb-4  font-psemibold">Recuperar tu cuenta</Text>
                <FormField
                    title="Introduce tu email"
                    value={form.email}
                    placeholder="tu.email@email.com"
                    handleChangeText={(e) => setForm({...form,email: e })}
                    otherStyles ="mt-7"
                    keybordType="email-address"
                />

                <CustomButton
                    title="Siguiente"
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

export default RecoverPass