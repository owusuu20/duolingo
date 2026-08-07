/**
 * Auth helpers for email verification.
 * Placeholder until Clerk email verification is wired up.
 */
export async function verifyEmailCode(
  code: string,
  _email: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  // Simulate a network round-trip to an auth service.
  await new Promise((resolve) => setTimeout(resolve, 250));

  if (!/^\d{6}$/.test(code)) {
    return { ok: false, error: "Enter a valid 6-digit code." };
  }

  // Accept any well-formed 6-digit code in this teaching build.
  return { ok: true };
}
