import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { verifyEmailCode } from "@/lib/auth";

type VerificationModalProps = {
  visible: boolean;
  email: string;
  onClose: () => void;
};

const CODE_LENGTH = 6;

export function VerificationModal({
  visible,
  email,
  onClose,
}: VerificationModalProps) {
  const router = useRouter();
  const inputRef = useRef<TextInput>(null);
  const isVerifyingRef = useRef(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (visible) {
      setCode("");
      setError(null);
      isVerifyingRef.current = false;
      const timer = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  async function handleChange(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, CODE_LENGTH);
    setCode(digits);
    setError(null);

    if (digits.length !== CODE_LENGTH || isVerifyingRef.current) {
      return;
    }

    isVerifyingRef.current = true;

    try {
      const result = await verifyEmailCode(digits, email);

      if (result.ok) {
        router.replace("/");
        return;
      }

      setError(result.error);
    } catch {
      setError("Verification failed. Please try again.");
    } finally {
      isVerifyingRef.current = false;
    }
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Pressable
          onPress={onClose}
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "rgba(13, 19, 43, 0.45)",
            paddingHorizontal: 24,
          }}
        >
          <Pressable
            onPress={(event) => event.stopPropagation()}
            className="rounded-3xl bg-background px-5 pb-6 pt-6"
            style={{
              shadowColor: "#0D132B",
              shadowOffset: { width: 0, height: 12 },
              shadowOpacity: 0.16,
              shadowRadius: 24,
              elevation: 10,
            }}
          >
            <Text className="font-poppins-bold text-[22px] leading-7.5 text-text-primary">
              Check your email
            </Text>
            <Text className="mt-2 font-poppins text-[14px] leading-5.5 text-text-secondary">
              We sent a 6-digit verification code
              {email ? ` to ${email}` : ""}. Enter it below to continue.
            </Text>

            <Pressable
              onPress={() => inputRef.current?.focus()}
              className="relative mt-6"
            >
              <View className="flex-row justify-between gap-2">
                {Array.from({ length: CODE_LENGTH }).map((_, index) => {
                  const digit = code[index] ?? "";
                  const isActive = index === code.length;

                  return (
                    <View
                      key={index}
                      className={`h-13 w-11 items-center justify-center rounded-2xl border ${
                        isActive ? "border-lingua-deep-purple" : "border-border"
                      } bg-surface`}
                    >
                      <Text className="font-poppins-semibold text-[22px] text-text-primary">
                        {digit}
                      </Text>
                    </View>
                  );
                })}
              </View>

              <TextInput
                ref={inputRef}
                value={code}
                onChangeText={handleChange}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                autoComplete="one-time-code"
                maxLength={CODE_LENGTH}
                caretHidden
                accessibilityLabel="Six-digit verification code"
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  opacity: 0.01,
                  color: "transparent",
                }}
              />
            </Pressable>

            {error ? (
              <Text className="mt-3 text-center font-poppins text-[13px] text-error">
                {error}
              </Text>
            ) : null}

            <Pressable onPress={onClose} className="mt-5 items-center py-2">
              <Text className="font-poppins-medium text-[14px] text-text-secondary">
                Cancel
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}
