type ClerkLikeError = {
  message?: string;
  longMessage?: string;
  errors?: Array<{
    message?: string;
    longMessage?: string;
  }>;
};

export function getClerkErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  if (!error) {
    return fallback;
  }

  if (typeof error === "string" && error.trim()) {
    return error;
  }

  const clerkError = error as ClerkLikeError;
  const nested = clerkError.errors?.[0];

  if (nested?.longMessage) {
    return nested.longMessage;
  }

  if (nested?.message) {
    return nested.message;
  }

  if (clerkError.longMessage) {
    return clerkError.longMessage;
  }

  if (clerkError.message) {
    return clerkError.message;
  }

  return fallback;
}
