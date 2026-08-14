import { useAuth } from "@clerk/expo";
import { Redirect, type Href } from "expo-router";

import { useLanguageStore } from "@/store/language";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();
  const hasHydrated = useLanguageStore((state) => state.hasHydrated);
  const selectedLanguageCode = useLanguageStore(
    (state) => state.selectedLanguageCode,
  );

  if (!isLoaded || !hasHydrated) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  if (!selectedLanguageCode) {
    return <Redirect href="/language-selection" />;
  }

  return <Redirect href={"/(tabs)" as Href} />;
}
