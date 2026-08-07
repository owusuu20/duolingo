import type { LanguageCode, Unit } from "@/types/learning";

/**
 * Beginner units for a few languages.
 * Spanish Unit 3 ("At the Café") matches the home / learn screen designs.
 */
export const units: Unit[] = [
  // Spanish
  {
    id: "es-unit-1",
    languageCode: "es",
    number: 1,
    title: "First Steps",
    description: "Greet people and introduce yourself in Spanish.",
    level: "A1",
    imageKey: "unitFirstSteps",
  },
  {
    id: "es-unit-2",
    languageCode: "es",
    number: 2,
    title: "Daily Life",
    description: "Talk about everyday routines and simple needs.",
    level: "A1",
    imageKey: "unitDailyLife",
  },
  {
    id: "es-unit-3",
    languageCode: "es",
    number: 3,
    title: "At the Café",
    description: "Order drinks, ask questions, and chat at a café.",
    level: "A1",
    imageKey: "unitCafe",
  },

  // French
  {
    id: "fr-unit-1",
    languageCode: "fr",
    number: 1,
    title: "Bonjour!",
    description: "Learn friendly French greetings and introductions.",
    level: "A1",
    imageKey: "unitFirstSteps",
  },
  {
    id: "fr-unit-2",
    languageCode: "fr",
    number: 2,
    title: "Au Café",
    description: "Order a drink and practice polite café phrases.",
    level: "A1",
    imageKey: "unitCafe",
  },

  // Japanese
  {
    id: "ja-unit-1",
    languageCode: "ja",
    number: 1,
    title: "Hello!",
    description: "Start with basic Japanese greetings and self-intros.",
    level: "A1",
    imageKey: "unitFirstSteps",
  },
  {
    id: "ja-unit-2",
    languageCode: "ja",
    number: 2,
    title: "At the Café",
    description: "Order drinks and practice simple café Japanese.",
    level: "A1",
    imageKey: "unitCafe",
  },
];

export function getUnitsByLanguage(languageCode: LanguageCode): Unit[] {
  return units
    .filter((unit) => unit.languageCode === languageCode)
    .sort((a, b) => a.number - b.number);
}

export function getUnitById(unitId: string): Unit | undefined {
  return units.find((unit) => unit.id === unitId);
}
