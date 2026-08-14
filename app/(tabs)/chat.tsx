import { Text, View } from "react-native";

export default function ChatScreen() {
  return (
    <View className="screen items-center justify-center px-6">
      <Text className="h3 text-text-primary">Chat</Text>
      <Text className="body-md mt-2 text-center text-text-secondary">
        Chat with your AI tutor will appear here.
      </Text>
    </View>
  );
}
