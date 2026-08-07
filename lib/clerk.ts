import type { Href } from "expo-router";
import { useRouter } from "expo-router";

type NavigateAfterAuthArgs = {
  session?: {
    currentTask?: unknown;
  } | null;
  decorateUrl: (url: string) => string;
};

export function createNavigateAfterAuth(router: ReturnType<typeof useRouter>) {
  return ({ session, decorateUrl }: NavigateAfterAuthArgs) => {
    if (session?.currentTask) {
      return;
    }

    const url = decorateUrl("/");
    if (url.startsWith("http")) {
      return;
    }

    router.replace(url as Href);
  };
}
