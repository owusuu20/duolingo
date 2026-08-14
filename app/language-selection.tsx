import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image as RnImage,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { LANGUAGES } from "@/data/languages";
import { useLanguageStore } from "@/store/language";
import { colors } from "@/theme";
import type { Language, LanguageCode } from "@/types/learning";

const CONTENT_PADDING_X = 20;

function LanguageRow({
  language,
  selected,
  onPress,
}: {
  language: Language;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={`${language.name}, ${language.learners} learners`}
      className={`flex-row items-center rounded-2xl border px-3.5 py-3.5 ${
        selected
          ? "border-lingua-purple bg-[#F3EFFF]"
          : "border-transparent bg-background"
      }`}
    >
      <View className="h-12 w-12 overflow-hidden rounded-full border border-border bg-surface">
        <Image
          source={{ uri: language.flag }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
        />
      </View>

      <View className="ml-3.5 flex-1">
        <Text className="font-poppins-semibold text-[16px] leading-5.5 text-text-primary">
          {language.name}
        </Text>
        <Text className="mt-0.5 font-poppins text-[13px] leading-4.5 text-text-secondary">
          {language.learners} learners
        </Text>
      </View>

      {selected ? (
        <View className="h-7 w-7 items-center justify-center rounded-full bg-lingua-purple">
          <Ionicons name="checkmark" size={16} color="#FFFFFF" />
        </View>
      ) : (
        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors.neutral.textSecondary}
        />
      )}
    </TouchableOpacity>
  );
}

export default function LanguageSelectionScreen() {
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();
  const storedLanguageCode = useLanguageStore(
    (state) => state.selectedLanguageCode,
  );
  const setSelectedLanguage = useLanguageStore(
    (state) => state.setSelectedLanguage,
  );
  const [query, setQuery] = useState("");
  const [selectedCode, setSelectedCode] = useState<LanguageCode>(
    storedLanguageCode ?? LANGUAGES[0]?.code ?? "es",
  );

  const filteredLanguages = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return LANGUAGES;
    }

    return LANGUAGES.filter(
      (language) =>
        language.name.toLowerCase().includes(normalized) ||
        language.nativeName.toLowerCase().includes(normalized),
    );
  }, [query]);

  const selectedLanguage = LANGUAGES.find(
    (language) => language.code === selectedCode,
  );

  const handleConfirm = () => {
    if (!selectedLanguage) {
      return;
    }

    setSelectedLanguage(selectedLanguage.code);
    router.replace("/");
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.neutral.background }}
      edges={["top", "left", "right"]}
    >
      <View className="screen">
        <View className="flex-row items-center px-4 pt-1">
          <TouchableOpacity
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
                return;
              }
              router.replace("/");
            }}
            activeOpacity={0.7}
            className="h-10 w-10 items-start justify-center"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons
              name="chevron-back"
              size={26}
              color={colors.neutral.textPrimary}
            />
          </TouchableOpacity>

          <Text className="flex-1 text-center font-poppins-semibold text-[18px] leading-[24px] text-text-primary">
            Choose a language
          </Text>

          <View className="h-10 w-10" />
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: CONTENT_PADDING_X,
            paddingTop: 12,
            paddingBottom: 0,
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row items-center rounded-full border border-border bg-background px-4 py-3">
            <Ionicons
              name="search"
              size={18}
              color={colors.neutral.textSecondary}
            />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search languages"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
              autoCorrect={false}
              accessibilityLabel="Search languages"
              style={{
                flex: 1,
                marginLeft: 10,
                padding: 0,
                fontFamily: "Poppins-Regular",
                fontSize: 15,
                lineHeight: 22,
                color: colors.neutral.textPrimary,
              }}
            />
            {query.length > 0 ? (
              <TouchableOpacity
                onPress={() => setQuery("")}
                activeOpacity={0.7}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                accessibilityRole="button"
                accessibilityLabel="Clear search"
              >
                <Ionicons
                  name="close-circle"
                  size={18}
                  color={colors.neutral.textSecondary}
                />
              </TouchableOpacity>
            ) : null}
          </View>

          <Text className="mt-6 font-poppins-semibold text-[18px] leading-[24px] text-text-primary">
            Popular
          </Text>

          <View className="mt-3 gap-1.5">
            {filteredLanguages.map((language) => (
              <LanguageRow
                key={language.code}
                language={language}
                selected={language.code === selectedCode}
                onPress={() => setSelectedCode(language.code)}
              />
            ))}

            {filteredLanguages.length === 0 ? (
              <Text className="body-md py-6 text-center text-text-secondary">
                No languages match “{query.trim()}”
              </Text>
            ) : null}
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleConfirm}
            disabled={!selectedLanguage}
            accessibilityRole="button"
            accessibilityLabel={
              selectedLanguage
                ? `Confirm ${selectedLanguage.name}`
                : "Confirm language"
            }
            className="mt-5 h-14 w-full items-center justify-center rounded-2xl bg-lingua-deep-purple"
            style={{
              opacity: selectedLanguage ? 1 : 0.5,
              shadowColor: colors.brand.deepPurple,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.28,
              shadowRadius: 10,
              elevation: 6,
            }}
          >
            <Text className="font-poppins-semibold text-[17px] text-white">
              {selectedLanguage
                ? `Confirm ${selectedLanguage.name}`
                : "Confirm"}
            </Text>
          </TouchableOpacity>

          <View
            style={{
              marginTop: 24,
              marginHorizontal: -CONTENT_PADDING_X,
              width: screenWidth,
              aspectRatio: 1,
            }}
          >
            <RnImage
              source={images.earth}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
              accessibilityLabel="World landmarks illustration"
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
