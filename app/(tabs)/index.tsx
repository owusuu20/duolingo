import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="screen items-center justify-center px-6">
      <Text className="h3 text-text-primary">Home</Text>
      <Text className="body-md mt-2 text-center text-text-secondary">
        Your daily plan and progress will appear here.
      </Text>
    </View>
  );
}
