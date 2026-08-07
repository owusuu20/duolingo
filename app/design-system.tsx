import { ScrollView, Text, View } from "react-native";

import { colors } from "@/theme";

const primaryColors = [
  { name: "LINGUA PURPLE", value: colors.brand.purple, className: "bg-lingua-purple" },
  {
    name: "LINGUA DEEP PURPLE",
    value: colors.brand.deepPurple,
    className: "bg-lingua-deep-purple",
  },
  { name: "LINGUA BLUE", value: colors.brand.blue, className: "bg-lingua-blue" },
  { name: "LINGUA GREEN", value: colors.brand.green, className: "bg-lingua-green" },
] as const;

const semanticColors = [
  { name: "SUCCESS", value: colors.semantic.success, className: "bg-success" },
  { name: "WARNING", value: colors.semantic.warning, className: "bg-warning" },
  { name: "STREAK", value: colors.semantic.streak, className: "bg-streak" },
  { name: "ERROR", value: colors.semantic.error, className: "bg-error" },
  { name: "INFO", value: colors.semantic.info, className: "bg-info" },
] as const;

const neutralColors = [
  {
    name: "TEXT / PRIMARY",
    value: colors.neutral.textPrimary,
    className: "bg-text-primary",
  },
  {
    name: "TEXT / SECONDARY",
    value: colors.neutral.textSecondary,
    className: "bg-text-secondary",
  },
  { name: "BORDER", value: colors.neutral.border, className: "bg-border" },
  { name: "SURFACE", value: colors.neutral.surface, className: "bg-surface" },
  { name: "BACKGROUND", value: colors.neutral.background, className: "bg-background" },
] as const;

export default function DesignSystemScreen() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.neutral.background }}
      contentContainerStyle={{ padding: 16, paddingBottom: 28, gap: 14 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="card gap-5">
        <Text className="section-title">Brand</Text>
        <View className="divider" />

        <View className="flex-row items-center gap-3">
          <View className="h-14 w-14 items-center justify-center rounded-full bg-lingua-purple/10">
            <Text className="text-[30px]">🦊</Text>
          </View>
          <Text className="text-[54px] leading-[56px] font-poppins-bold text-text-primary">
            lingua
          </Text>
        </View>
      </View>

      <View className="card gap-5">
        <Text className="section-title">Colors</Text>
        <View className="divider" />

        <View className="gap-4">
          <Text className="caption font-poppins-semibold uppercase tracking-[0.8px]">
            Primary
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {primaryColors.map((color) => (
              <View key={color.name} className="w-19.5">
                <View className={`h-19.5 w-19.5 rounded-[10px] ${color.className}`} />
                <Text className="chip-label">{color.name}</Text>
                <Text className="chip-value">{color.value}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="gap-4">
          <Text className="caption font-poppins-semibold uppercase tracking-[0.8px]">
            Semantic
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {semanticColors.map((color) => (
              <View key={color.name} className="w-16">
                <View className={`h-16 w-16 rounded-[10px] ${color.className}`} />
                <Text className="chip-label">{color.name}</Text>
                <Text className="chip-value">{color.value}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="gap-4">
          <Text className="caption font-poppins-semibold uppercase tracking-[0.8px]">
            Neutrals
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {neutralColors.map((color) => (
              <View key={color.name} className="w-16">
                <View
                  className={`h-16 w-16 rounded-[10px] border border-neutral-border ${color.className}`}
                />
                <Text className="chip-label">{color.name}</Text>
                <Text className="chip-value">{color.value}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View className="card gap-5">
        <Text className="section-title">Typography</Text>
        <View className="divider" />

        <View className="gap-2">
          <Text className="caption font-poppins-semibold uppercase tracking-[0.8px]">
            Font Family
          </Text>
          <Text className="h1">Poppins</Text>
          <Text className="body-md text-text-secondary">
            Poppins is a modern, geometric sans-serif typeface that provides excellent
            readability and a friendly personality.
          </Text>
        </View>

        <View className="gap-2">
          <Text className="h1">H1 - Page / Screen Title</Text>
          <Text className="h2">H2 - Section Title</Text>
          <Text className="h3">H3 - Card / Module Title</Text>
          <Text className="h4">H4 - Subheading</Text>
          <Text className="body-lg">Body Large - Important content</Text>
          <Text className="body-md">Body Medium - Body text</Text>
          <Text className="body-sm">Body Small - Supporting text</Text>
          <Text className="caption">Caption - Labels, meta text</Text>
        </View>
      </View>
    </ScrollView>
  );
}
