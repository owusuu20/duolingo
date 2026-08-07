import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View className="screen items-center justify-center px-6">
      <View className=" w-full max-w-105 items-center gap-3">
        <Text className="h2 text-center text-lingua-purple">Lingua</Text>

        <TouchableOpacity
          onPress={() => router.push("/design-system")}
          activeOpacity={0.8}
        ></TouchableOpacity>
      </View>
    </View>
  );
}
