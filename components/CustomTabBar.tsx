import Ionicons from "@expo/vector-icons/Ionicons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useCallback, useEffect, useRef } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "@/theme";

const CIRCLE_SIZE = 52;
const TAB_BAR_HEIGHT = 64;

type TabItemConfig = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconFocused: keyof typeof Ionicons.glyphMap;
};

const TAB_CONFIG: Record<string, TabItemConfig> = {
  index: {
    label: "Home",
    icon: "home-outline",
    iconFocused: "home",
  },
  learn: {
    label: "Learn",
    icon: "book-outline",
    iconFocused: "book",
  },
  "ai-teacher": {
    label: "AI Teacher",
    icon: "happy-outline",
    iconFocused: "happy",
  },
  chat: {
    label: "Chat",
    icon: "chatbubble-outline",
    iconFocused: "chatbubble",
  },
  profile: {
    label: "Profile",
    icon: "person-outline",
    iconFocused: "person",
  },
};

const springConfig = {
  damping: 20,
  stiffness: 240,
  mass: 0.8,
};

export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const tabLayouts = useRef<{ x: number; width: number }[]>([]);
  const circleX = useSharedValue(0);
  const circleOpacity = useSharedValue(0);

  const tabCount = state.routes.length;
  const fallbackTabWidth = screenWidth / tabCount;

  const moveCircleToIndex = useCallback(
    (index: number) => {
      const layout = tabLayouts.current[index];
      if (layout) {
        circleX.value = withSpring(
          layout.x + layout.width / 2 - CIRCLE_SIZE / 2,
          springConfig,
        );
        circleOpacity.value = withSpring(1, springConfig);
        return;
      }

      circleX.value = withSpring(
        index * fallbackTabWidth + fallbackTabWidth / 2 - CIRCLE_SIZE / 2,
        springConfig,
      );
      circleOpacity.value = withSpring(1, springConfig);
    },
    [circleOpacity, circleX, fallbackTabWidth],
  );

  useEffect(() => {
    moveCircleToIndex(state.index);
  }, [moveCircleToIndex, state.index]);

  const circleStyle = useAnimatedStyle(() => ({
    opacity: circleOpacity.value,
    transform: [{ translateX: circleX.value }],
  }));

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, 10),
          height: TAB_BAR_HEIGHT + Math.max(insets.bottom, 10),
        },
      ]}
    >
      <Animated.View
        pointerEvents="none"
        style={[
          styles.activeCircle,
          { top: (TAB_BAR_HEIGHT - CIRCLE_SIZE) / 2 },
          circleStyle,
        ]}
      />

      <View style={styles.tabsRow}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const config = TAB_CONFIG[route.name] ?? {
            label: options.title ?? route.name,
            icon: "ellipse-outline" as const,
            iconFocused: "ellipse" as const,
          };
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={config.label}
              onPress={onPress}
              onLongPress={onLongPress}
              onLayout={(event) => {
                const { x, width } = event.nativeEvent.layout;
                tabLayouts.current[index] = { x, width };
                if (index === state.index) {
                  moveCircleToIndex(index);
                }
              }}
              style={styles.tabItem}
            >
              {isFocused ? (
                <View style={styles.activeIconSlot}>
                  <Ionicons
                    name={config.iconFocused}
                    size={24}
                    color="#FFFFFF"
                  />
                </View>
              ) : (
                <View style={styles.inactiveContent}>
                  <Ionicons
                    name={config.icon}
                    size={22}
                    color={colors.neutral.textSecondary}
                  />
                  <Text style={styles.inactiveLabel}>{config.label}</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.background,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.border,
    ...Platform.select({
      ios: {
        shadowColor: "#0D132B",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  tabsRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: TAB_BAR_HEIGHT,
  },
  activeCircle: {
    position: "absolute",
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: colors.brand.purple,
    ...Platform.select({
      ios: {
        shadowColor: colors.brand.deepPurple,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.28,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  activeIconSlot: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  inactiveContent: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingTop: 2,
  },
  inactiveLabel: {
    fontFamily: "Poppins-Medium",
    fontSize: 11,
    lineHeight: 14,
    color: colors.neutral.textSecondary,
  },
});
