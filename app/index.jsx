import {  Image,Text, View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { images, CustomButton } from '../constants'

 

export default function Index() {
  return (
    <SafeAreaView className="bg-slate-400 h-full">
        <ScrollView contentContainerStyle={{ height: '100%'}}>
          <View className="w-full flex justify-center items-center min-h-[85vh] px-4 pt-48">
            <Image
              source={images.logo}
              className="w-[180px] h-[94px] absolute inset-x-30 top-0 "
              resizeMode="contain"
            />
            <Image
              source={images.cards}
              className="max-w-[380px] w-full h[300px] absolute mt-6  -bottom-24"
              resizeMode="contain"
            />
              <View className="relative mt-9 pt-8">
                <Text className="text-3xl text-white font-bold text-center">
              Cuida a tu mascota{"\n"}
              de la mejor forma con{" "}
                <Text className="text-blue-800">Vetti</Text>
               </Text>

                 <Image
                   source={images.path}
                    className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
                    resizeMode="contain"
                  />
              </View>

            
                <CustomButton
                   title="Acceder a mi cuenta"
                   handlePress={() => router.push("/sign-in")}
                   containerStyles="w-full mt-10"
                />
                 <Text className="text-sm font-pregular text-white mt-2 text-center"> o </Text>
                 <CustomButton
                   title="Crear Cuenta"
                   handlePress={() => router.push("/sign-up")}
                   containerStyles="w-full mt-2"
                />
            
          </View>
          <Text className="text-sm font-pregular text-white mt-2 text-center"> © 2024 Vetii App. Todos los derechos reservados. </Text>
        </ScrollView>
        <StatusBar backgroundColor="#161622" style="light"/>
    </SafeAreaView>
  );
}


