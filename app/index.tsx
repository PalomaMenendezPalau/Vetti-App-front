import {  Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Href, Link } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text >Vetti</Text>
      <StatusBar style="auto" />
      <Link href={"/profile" as Href<string | object>}>
        Go to profile
      </Link>
    </View>
  );
}


