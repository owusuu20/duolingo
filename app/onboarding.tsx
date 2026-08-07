import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { colors } from "@/theme";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.neutral.background }}
    >
      <View className="screen px-6 pb-6">
        <View className="mt-3 flex-row items-center justify-center gap-2.5">
          <Image
            source={images.mascotLogo}
            style={{ width: 44, height: 44 }}
            resizeMode="contain"
          />
          <Text className="font-poppins-bold text-[20px] leading-[40px] text-text-primary">
            Duolingo
          </Text>
        </View>

        <View className="mt-8">
          <Text className="font-poppins-bold text-[32px] leading-[40px] text-text-primary">
            Your AI language{"\n"}
            <Text className="text-lingua-deep-purple">teacher</Text>
            <Text className="text-text-primary">.</Text>
          </Text>

          <Text className="mt-3 font-poppins text-[15px] leading-[24px] text-text-secondary">
            Real conversations, personalized{"\n"}
            lessons, anytime, anywhere.
          </Text>
        </View>

        <View className="mt-4 flex-1 items-center justify-center">
          <View className="relative h-85 w-full max-w-90 items-center justify-center">
            <View
              className="absolute left-2 top-10 z-10 rounded-2xl bg-[#EAF4FF] px-3.5 py-2"
              style={{ transform: [{ rotate: "-8deg" }] }}
            >
              <Text className="font-poppins-semibold text-[14px] text-text-primary">
                Hello!
              </Text>
            </View>

            <View
              className="absolute right-1 top-6 z-10 rounded-2xl bg-[#F0EBFF] px-3.5 py-2"
              style={{ transform: [{ rotate: "8deg" }] }}
            >
              <Text className="font-poppins-semibold text-[14px] text-lingua-deep-purple">
                ¡Hola!
              </Text>
            </View>

            <View
              className="absolute right-4 top-29.5 z-10 rounded-2xl bg-[#FFE8E4] px-3.5 py-2"
              style={{ transform: [{ rotate: "6deg" }] }}
            >
              <Text className="font-poppins-semibold text-[14px] text-[#E11D2E]">
                你好!
              </Text>
            </View>

            <Image
              source={images.mascotWelcome}
              style={{ width: 280, height: 280 }}
              resizeMode="contain"
            />

            <View className="absolute bottom-6 h-4 w-40 rounded-full bg-black/10" />
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push("/sign-up")}
          className="relative h-15 w-full flex-row items-center justify-center rounded-full bg-lingua-deep-purple"
          style={{
            shadowColor: colors.brand.deepPurple,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.28,
            shadowRadius: 10,
            elevation: 6,
          }}
        >
          <Text className="font-poppins-semibold text-[17px] text-white">
            Get Started
          </Text>
          <View className="absolute right-5">
            <Ionicons name="chevron-forward" size={22} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
