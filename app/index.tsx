import { useAuth, useClerk } from "@clerk/expo";
import { Link, Redirect } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/theme";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();
  const { signOut } = useClerk();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <View className="screen items-center justify-center px-6">
      <View className="w-full max-w-105 items-center gap-4">
        <Text className="h2 text-center text-lingua-purple">Lingua</Text>

        <Text className="font-poppins text-[15px] text-text-secondary">
          {"You're signed in"}
        </Text>

        <Link href="/language-selection" asChild>
          <TouchableOpacity
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Choose a language"
            className="mt-2 h-14 w-full items-center justify-center rounded-2xl bg-lingua-deep-purple"
            style={{
              shadowColor: colors.brand.deepPurple,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.28,
              shadowRadius: 10,
              elevation: 6,
            }}
          >
            <Text className="font-poppins-semibold text-[17px] text-white">
              Choose a language
            </Text>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => signOut()}
          accessibilityLabel="Sign out"
          className="h-14 w-full items-center justify-center rounded-2xl border border-border bg-background"
        >
          <Text className="font-poppins-semibold text-[17px] text-text-primary">
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
