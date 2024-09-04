import { View, Text, ScrollView ,Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { FormField, images } from '../../constants'
const SignIn = () => {
  return (
    <SafeAreaView className="bg-slate-400 h-full">
        <ScrollView>
            <View className="w-full justify-center h-full px-4 my-6">
                <Image
                    source={images.logo}
                    resizeMode='contain'
                    className="w-[115px] h-[35pc]"
                />
                <Text className="text-2xl text-white text-semibold  font-psemibold">Accede a tu cuenta</Text>
                <FormField
                    
                />
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn