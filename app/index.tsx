import {  Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Href, Link } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-pblack" >Vetti App!</Text>
      <StatusBar style="auto" />
      <Link href={"/home" as Href<string | object>}>
        Home
      </Link>
    </View>
  );
}


