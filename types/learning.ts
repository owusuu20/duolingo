/**
 * Shared types for the hardcoded learning content system.
 * Keep these flat and easy to extend as new languages/units/lessons are added.
 */

export type LanguageCode = "es" | "fr" | "ja" | "ko" | "de" | "zh";

export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

/** How a lesson activity is practiced in the app. */
export type ActivityType =
  | "listen"
  | "speak"
  | "match"
  | "fill"
  | "translate"
  | "review";

export type Language = {
  /** ISO-ish short code used across units/lessons. */
  code: LanguageCode;
  /** Display name in English (e.g. "Spanish"). */
  name: string;
  /** Native name (e.g. "Español"). */
  nativeName: string;
  /** Flag image URL (e.g. flagcdn). */
  flag: string;
  /** Accent color for UI chips/cards. */
  color: string;
  /** Learner count shown on the language selection screen (e.g. "28.4M"). */
  learners: string;
};

export type Unit = {
  id: string;
  languageCode: LanguageCode;
  /** 1-based unit order within a language. */
  number: number;
  title: string;
  description: string;
  level: CefrLevel;
  /** Optional key for a future image asset in constants/images. */
  imageKey?: string;
};

export type VocabularyItem = {
  id: string;
  /** Word or short term in the target language. */
  term: string;
  /** English meaning. */
  translation: string;
  /** Optional romanization for non-Latin scripts. */
  romanization?: string;
  /** Optional tip for pronunciation or usage. */
  tip?: string;
};

export type Phrase = {
  id: string;
  /** Full phrase in the target language. */
  target: string;
  /** English translation. */
  english: string;
  /** Optional romanization for non-Latin scripts. */
  romanization?: string;
};

export type Activity = {
  id: string;
  type: ActivityType;
  /** Short instruction shown to the learner. */
  prompt: string;
  /** Optional vocabulary ids this activity focuses on. */
  vocabularyIds?: string[];
  /** Optional phrase ids this activity focuses on. */
  phraseIds?: string[];
};

export type Lesson = {
  id: string;
  unitId: string;
  languageCode: LanguageCode;
  /** 1-based lesson order within a unit. */
  number: number;
  title: string;
  description: string;
  /** One clear speaking/learning goal for the lesson. */
  goal: string;
  xpReward: number;
  estimatedMinutes: number;
  vocabulary: VocabularyItem[];
  phrases: Phrase[];
  activities: Activity[];
  /**
   * Prompt passed to the AI teacher (Vision Agent) for this lesson.
   * Teacher should mostly speak English and teach the target language.
   */
  aiTeacherPrompt: string;
  /** Optional key for a future image asset in constants/images. */
  imageKey?: string;
};
