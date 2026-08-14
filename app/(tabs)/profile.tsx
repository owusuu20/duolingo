import { Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View className="screen items-center justify-center px-6">
      <Text className="h3 text-text-primary">Profile</Text>
      <Text className="body-md mt-2 text-center text-text-secondary">
        Profile and account settings will appear here.
      </Text>
    </View>
  );
}
