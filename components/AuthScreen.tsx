import Ionicons from "@expo/vector-icons/Ionicons";
import { useSignIn, useSignUp } from "@clerk/expo";
import { useSSO } from "@clerk/expo/experimental";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { VerificationModal } from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { getClerkErrorMessage } from "@/lib/auth";
import { createNavigateAfterAuth } from "@/lib/clerk";
import { colors } from "@/theme";

type AuthMode = "sign-up" | "sign-in";

type AuthScreenProps = {
  mode: AuthMode;
};

type FieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  showPasswordToggle?: boolean;
  passwordVisible?: boolean;
  onTogglePassword?: () => void;
  autoCapitalize?: "none" | "words" | "sentences" | "characters";
  keyboardType?: "default" | "email-address";
  autoComplete?: "email" | "name" | "password" | "new-password";
  textContentType?:
    | "emailAddress"
    | "name"
    | "password"
    | "newPassword";
};

function BackButton() {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.back()}
      activeOpacity={0.7}
      className="mt-1 h-10 w-10 items-start justify-center"
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Ionicons name="chevron-back" size={26} color={colors.neutral.textPrimary} />
    </TouchableOpacity>
  );
}

function AuthField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  showPasswordToggle = false,
  passwordVisible = false,
  onTogglePassword,
  autoCapitalize = "none",
  keyboardType = "default",
  autoComplete,
  textContentType,
}: FieldProps) {
  const labelId = `${label.toLowerCase().replace(/\s+/g, "-")}-label`;

  return (
    <View className="rounded-2xl border border-border px-4 pb-3 pt-2.5">
      <Text
        nativeID={labelId}
        className="font-poppins text-[12px] leading-[16px] text-text-secondary"
      >
        {label}
      </Text>
      <View className="mt-0.5 flex-row items-center">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={secureTextEntry && !passwordVisible}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          keyboardType={keyboardType}
          autoComplete={autoComplete}
          textContentType={textContentType}
          accessibilityLabel={label}
          accessibilityLabelledBy={Platform.OS === "android" ? labelId : undefined}
          style={{
            flex: 1,
            padding: 0,
            fontFamily: "Poppins-Medium",
            fontSize: 16,
            lineHeight: 24,
            color: colors.neutral.textPrimary,
          }}
        />
        {showPasswordToggle ? (
          <TouchableOpacity
            onPress={onTogglePassword}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            className="pl-3"
            accessibilityRole="button"
            accessibilityLabel={passwordVisible ? "Hide password" : "Show password"}
          >
            <Ionicons
              name={passwordVisible ? "eye-off-outline" : "eye-outline"}
              size={22}
              color={colors.neutral.textSecondary}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

function PrimaryButton({
  label,
  onPress,
  loading = false,
}: {
  label: string;
  onPress: () => void;
  loading?: boolean;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={loading}
      accessibilityState={{ disabled: loading, busy: loading }}
      className="h-14 w-full items-center justify-center rounded-2xl bg-lingua-deep-purple"
      style={{
        opacity: loading ? 0.75 : 1,
        shadowColor: colors.brand.deepPurple,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.28,
        shadowRadius: 10,
        elevation: 6,
      }}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text className="font-poppins-semibold text-[17px] text-white">{label}</Text>
      )}
    </TouchableOpacity>
  );
}

function AuthError({ message }: { message: string | null }) {
  if (!message) {
    return null;
  }

  return (
    <Text className="font-poppins text-[13px] text-error" accessibilityLiveRegion="polite">
      {message}
    </Text>
  );
}

function AuthFooter({
  prompt,
  action,
  href,
}: {
  prompt: string;
  action: string;
  href: "/sign-in" | "/sign-up";
}) {
  const router = useRouter();

  return (
    <View className="mt-auto flex-row items-center justify-center pt-8">
      <Text className="font-poppins text-[14px] text-text-secondary">{prompt} </Text>
      <TouchableOpacity activeOpacity={0.7} onPress={() => router.replace(href)}>
        <Text className="font-poppins-semibold text-[14px] text-lingua-deep-purple">
          {action}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function SignUpContent({
  email,
  password,
  passwordVisible,
  error,
  loading,
  googleLoading,
  appleLoading,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onSubmit,
  onGooglePress,
  onApplePress,
}: {
  email: string;
  password: string;
  passwordVisible: boolean;
  error: string | null;
  loading: boolean;
  googleLoading: boolean;
  appleLoading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
  onSubmit: () => void;
  onGooglePress: () => void;
  onApplePress: () => void;
}) {
  const socialBusy = googleLoading || appleLoading || loading;

  return (
    <>
      <Text className="mt-2 font-poppins-bold text-[28px] leading-[36px] text-text-primary">
        Create your account
      </Text>
      <Text className="mt-1.5 font-poppins text-[15px] leading-[24px] text-text-secondary">
        Start your language journey today ✨
      </Text>

      <View className="mt-5 items-center justify-center py-2">
        <View className="relative items-center justify-center">
          <Text className="absolute -left-1 top-4 text-[16px] text-[#FFB020]">✦</Text>
          <Text className="absolute -right-2 top-2 text-[14px] text-[#7DD3FC]">✦</Text>
          <Text className="absolute bottom-6 -right-4 text-[12px] text-[#FACC15]">✦</Text>

          <Image
            source={images.mascotAuth}
            style={{ width: 140, height: 140 }}
            resizeMode="contain"
          />
        </View>
      </View>

      <View className="mt-2 gap-3.5">
        <AuthField
          label="Email"
          value={email}
          onChangeText={onEmailChange}
          placeholder="alex@gmail.com"
          keyboardType="email-address"
          autoComplete="email"
          textContentType="emailAddress"
        />
        <AuthField
          label="Password"
          value={password}
          onChangeText={onPasswordChange}
          placeholder="••••••••"
          secureTextEntry
          showPasswordToggle
          passwordVisible={passwordVisible}
          onTogglePassword={onTogglePassword}
          autoComplete="new-password"
          textContentType="newPassword"
        />
        <AuthError message={error} />
        <PrimaryButton label="Create Account" onPress={onSubmit} loading={loading} />
      </View>

      <View className="mt-6 flex-row items-center gap-3">
        <View className="divider flex-1" />
        <Text className="font-poppins text-[13px] text-text-secondary">or continue with</Text>
        <View className="divider flex-1" />
      </View>

      <View className="mt-5 gap-3">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onGooglePress}
          disabled={socialBusy}
          accessibilityRole="button"
          accessibilityLabel="Continue with Google"
          accessibilityState={{ disabled: socialBusy, busy: googleLoading }}
          className="relative h-14 w-full items-center justify-center rounded-2xl border border-border bg-background"
          style={{ opacity: googleLoading ? 0.75 : 1 }}
        >
          {googleLoading ? (
            <ActivityIndicator color={colors.brand.deepPurple} />
          ) : (
            <>
              <View className="absolute left-5">
                <Ionicons name="logo-google" size={22} color="#4285F4" />
              </View>
              <Text className="font-poppins-medium text-[15px] text-text-primary">
                Continue with Google
              </Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onApplePress}
          disabled={socialBusy}
          accessibilityRole="button"
          accessibilityLabel="Continue with Apple"
          accessibilityState={{ disabled: socialBusy, busy: appleLoading }}
          className="relative h-14 w-full items-center justify-center rounded-2xl border border-border bg-background"
          style={{ opacity: appleLoading ? 0.75 : 1 }}
        >
          {appleLoading ? (
            <ActivityIndicator color={colors.brand.deepPurple} />
          ) : (
            <>
              <View className="absolute left-5">
                <Ionicons name="logo-apple" size={22} color="#000000" />
              </View>
              <Text className="font-poppins-medium text-[15px] text-text-primary">
                Continue with Apple
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Required for Clerk bot protection on sign-up */}
      <View nativeID="clerk-captcha" />

      <AuthFooter
        prompt="Already have an account?"
        action="Log In"
        href="/sign-in"
      />
    </>
  );
}

function SignInContent({
  email,
  password,
  passwordVisible,
  error,
  loading,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onSubmit,
}: {
  email: string;
  password: string;
  passwordVisible: boolean;
  error: string | null;
  loading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
  onSubmit: () => void;
}) {
  return (
    <>
      <View className="mt-2 flex-row items-center justify-between gap-4">
        <View className="flex-1">
          <View className="self-start rounded-full bg-lingua-deep-purple/10 px-3 py-1">
            <Text className="font-poppins-medium text-[12px] text-lingua-deep-purple">
              Welcome back
            </Text>
          </View>
          <Text className="mt-3 font-poppins-bold text-[28px] leading-[36px] text-text-primary">
            Log in to{"\n"}continue
          </Text>
          <Text className="mt-2 font-poppins text-[15px] leading-[24px] text-text-secondary">
            Pick up where you left off.
          </Text>
        </View>

        <View className="h-24 w-24 items-center justify-center rounded-3xl bg-surface">
          <Image
            source={images.mascotAuth}
            style={{ width: 78, height: 78 }}
            resizeMode="contain"
          />
        </View>
      </View>

      <View className="mt-8 gap-3.5 rounded-3xl bg-surface p-4">
        <AuthField
          label="Email"
          value={email}
          onChangeText={onEmailChange}
          placeholder="alex@gmail.com"
          keyboardType="email-address"
          autoComplete="email"
          textContentType="emailAddress"
        />
        <AuthField
          label="Password"
          value={password}
          onChangeText={onPasswordChange}
          placeholder="••••••••"
          secureTextEntry
          showPasswordToggle
          passwordVisible={passwordVisible}
          onTogglePassword={onTogglePassword}
          autoComplete="password"
          textContentType="password"
        />

        <AuthError message={error} />
        <PrimaryButton label="Log In" onPress={onSubmit} loading={loading} />
      </View>

      <AuthFooter
        prompt="Don't have an account?"
        action="Sign Up"
        href="/sign-up"
      />
    </>
  );
}

export function AuthScreen({ mode }: AuthScreenProps) {
  const router = useRouter();
  const navigateAfterAuth = createNavigateAfterAuth(router);
  const { signUp, errors: signUpErrors, fetchStatus: signUpFetchStatus } = useSignUp();
  const { signIn, errors: signInErrors, fetchStatus: signInFetchStatus } = useSignIn();
  const { startSSOFlow } = useSSO();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationKind, setVerificationKind] = useState<"sign-up" | "client-trust">(
    "sign-up",
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);

  const clerkFieldError =
    mode === "sign-up"
      ? signUpErrors.fields.emailAddress?.message ||
        signUpErrors.fields.password?.message ||
        signUpErrors.fields.code?.message
      : signInErrors.fields.identifier?.message ||
        signInErrors.fields.password?.message ||
        signInErrors.fields.code?.message;

  const displayedError = error ?? clerkFieldError ?? null;
  const isBusy =
    loading ||
    googleLoading ||
    appleLoading ||
    signUpFetchStatus === "fetching" ||
    signInFetchStatus === "fetching";

  async function handleSignUp() {
    const { error: passwordError } = await signUp.password({
      emailAddress: email.trim(),
      password,
    });

    if (passwordError) {
      setError(getClerkErrorMessage(passwordError, "Unable to create your account."));
      return;
    }

    const { error: sendError } = await signUp.verifications.sendEmailCode();
    if (sendError) {
      setError(getClerkErrorMessage(sendError, "Unable to send verification code."));
      return;
    }

    setVerificationKind("sign-up");
    setShowVerification(true);
  }

  async function handleSignIn() {
    const { error: passwordError } = await signIn.password({
      emailAddress: email.trim(),
      password,
    });

    if (passwordError) {
      setError(getClerkErrorMessage(passwordError, "Invalid email or password."));
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({ navigate: navigateAfterAuth });
      return;
    }

    if (signIn.status === "needs_client_trust") {
      const emailFactor = signIn.supportedSecondFactors?.find(
        (factor) => factor.strategy === "email_code",
      );

      if (emailFactor) {
        const { error: sendError } = await signIn.mfa.sendEmailCode();
        if (sendError) {
          setError(getClerkErrorMessage(sendError, "Unable to send verification code."));
          return;
        }

        setVerificationKind("client-trust");
        setShowVerification(true);
        return;
      }
    }

    if (signIn.status === "needs_second_factor") {
      setError("Additional verification is required for this account.");
      return;
    }

    setError("Unable to complete sign in. Please try again.");
  }

  async function handlePrimaryPress() {
    if (isBusy) {
      return;
    }

    setError(null);
    setLoading(true);

    try {
      if (mode === "sign-up") {
        await handleSignUp();
        return;
      }

      await handleSignIn();
    } catch (err) {
      setError(
        getClerkErrorMessage(
          err,
          mode === "sign-up"
            ? "Unable to create your account. Please try again."
            : "Unable to sign in. Please try again.",
        ),
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleGooglePress() {
    if (isBusy) {
      return;
    }

    setError(null);
    setGoogleLoading(true);

    try {
      const { createdSessionId } = await startSSOFlow({
        strategy: "oauth_google",
      });

      if (createdSessionId) {
        router.replace("/");
      }
    } catch (err) {
      setError(getClerkErrorMessage(err, "Google sign-in failed. Please try again."));
    } finally {
      setGoogleLoading(false);
    }
  }

  async function handleApplePress() {
    if (isBusy) {
      return;
    }

    setError(null);
    setAppleLoading(true);

    try {
      const { createdSessionId } = await startSSOFlow({
        strategy: "oauth_apple",
      });

      if (createdSessionId) {
        router.replace("/");
      }
    } catch (err) {
      setError(getClerkErrorMessage(err, "Apple sign-in failed. Please try again."));
    } finally {
      setAppleLoading(false);
    }
  }

  async function handleVerifyCode(code: string) {
    try {
      if (verificationKind === "sign-up") {
        const { error: verifyError } = await signUp.verifications.verifyEmailCode({
          code,
        });

        if (verifyError) {
          return {
            ok: false as const,
            error: getClerkErrorMessage(verifyError, "Invalid verification code."),
          };
        }

        if (signUp.status === "complete") {
          await signUp.finalize({ navigate: navigateAfterAuth });
          return { ok: true as const };
        }

        return {
          ok: false as const,
          error: "Verification is incomplete. Please try again.",
        };
      }

      const { error: verifyError } = await signIn.mfa.verifyEmailCode({ code });

      if (verifyError) {
        return {
          ok: false as const,
          error: getClerkErrorMessage(verifyError, "Invalid verification code."),
        };
      }

      if (signIn.status === "complete") {
        await signIn.finalize({ navigate: navigateAfterAuth });
        return { ok: true as const };
      }

      return {
        ok: false as const,
        error: "Verification is incomplete. Please try again.",
      };
    } catch (err) {
      return {
        ok: false as const,
        error: getClerkErrorMessage(err, "Verification failed. Please try again."),
      };
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.neutral.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingBottom: 24,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <BackButton />

          {mode === "sign-up" ? (
            <SignUpContent
              email={email}
              password={password}
              passwordVisible={passwordVisible}
              error={displayedError}
              loading={loading || signUpFetchStatus === "fetching"}
              googleLoading={googleLoading}
              appleLoading={appleLoading}
              onEmailChange={(value) => {
                setEmail(value);
                setError(null);
              }}
              onPasswordChange={(value) => {
                setPassword(value);
                setError(null);
              }}
              onTogglePassword={() => setPasswordVisible((prev) => !prev)}
              onSubmit={handlePrimaryPress}
              onGooglePress={handleGooglePress}
              onApplePress={handleApplePress}
            />
          ) : (
            <SignInContent
              email={email}
              password={password}
              passwordVisible={passwordVisible}
              error={displayedError}
              loading={loading || signInFetchStatus === "fetching"}
              onEmailChange={(value) => {
                setEmail(value);
                setError(null);
              }}
              onPasswordChange={(value) => {
                setPassword(value);
                setError(null);
              }}
              onTogglePassword={() => setPasswordVisible((prev) => !prev)}
              onSubmit={handlePrimaryPress}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      <VerificationModal
        visible={showVerification}
        email={email.trim()}
        onClose={() => setShowVerification(false)}
        onVerifyCode={handleVerifyCode}
      />
    </SafeAreaView>
  );
}
