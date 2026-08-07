import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="screen items-center justify-center px-6">
      <View className="w-full max-w-105 items-center gap-4">
        <Text className="h2 text-center text-lingua-purple">Lingua</Text>

        <Link href="/onboarding" asChild>
          <Pressable>
            <Text className="font-poppins-semibold text-[16px] text-lingua-deep-purple">
              Open Onboarding
            </Text>
          </Pressable>
        </Link>

        <Link href="/design-system" asChild>
          <Pressable>
            <Text className="font-poppins-medium text-[14px] text-text-secondary">
              Design System
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
