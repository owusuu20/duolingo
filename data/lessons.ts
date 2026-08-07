import { getUnitById } from "@/data/units";
import type { LanguageCode, Lesson } from "@/types/learning";

function compareLessons(a: Lesson, b: Lesson): number {
  const unitA = getUnitById(a.unitId)?.number ?? 0;
  const unitB = getUnitById(b.unitId)?.number ?? 0;
  if (unitA !== unitB) {
    return unitA - unitB;
  }
  return a.number - b.number;
}

/**
 * Beginner-friendly sample lessons.
 * Spanish Unit 3 mirrors the Learn screen design (6 lessons, café theme).
 * French and Japanese include smaller starter sets so other languages stay usable.
 */
export const lessons: Lesson[] = [
  // ── Spanish · Unit 1: First Steps ───────────────────────────────────────
  {
    id: "es-u1-l1",
    unitId: "es-unit-1",
    languageCode: "es",
    number: 1,
    title: "Hello & Goodbye",
    description: "Say hi and bye in everyday Spanish.",
    goal: "Greet someone and say goodbye using hola and adiós.",
    xpReward: 10,
    estimatedMinutes: 5,
    vocabulary: [
      {
        id: "es-u1-l1-v1",
        term: "hola",
        translation: "hello",
        tip: "Friendly and works any time of day.",
      },
      {
        id: "es-u1-l1-v2",
        term: "adiós",
        translation: "goodbye",
      },
      {
        id: "es-u1-l1-v3",
        term: "buenos días",
        translation: "good morning",
      },
    ],
    phrases: [
      {
        id: "es-u1-l1-p1",
        target: "¡Hola!",
        english: "Hello!",
      },
      {
        id: "es-u1-l1-p2",
        target: "¡Adiós!",
        english: "Goodbye!",
      },
      {
        id: "es-u1-l1-p3",
        target: "Buenos días.",
        english: "Good morning.",
      },
    ],
    activities: [
      {
        id: "es-u1-l1-a1",
        type: "listen",
        prompt: "Listen to each greeting and repeat it aloud.",
        phraseIds: ["es-u1-l1-p1", "es-u1-l1-p2", "es-u1-l1-p3"],
      },
      {
        id: "es-u1-l1-a2",
        type: "speak",
        prompt: "Say hello, then say goodbye.",
        phraseIds: ["es-u1-l1-p1", "es-u1-l1-p2"],
      },
      {
        id: "es-u1-l1-a3",
        type: "match",
        prompt: "Match each Spanish greeting to its English meaning.",
        vocabularyIds: ["es-u1-l1-v1", "es-u1-l1-v2", "es-u1-l1-v3"],
      },
    ],
    aiTeacherPrompt:
      "You are a warm, energetic Spanish teacher for absolute beginners. Stay only on greetings: hola, adiós, and buenos días. Mostly speak English. Introduce each Spanish word slowly with its English meaning, keep replies to one or two short sentences, and ask the student to repeat. Encourage gently and do not teach unrelated topics.",
    imageKey: "lessonGreetings",
  },
  {
    id: "es-u1-l2",
    unitId: "es-unit-1",
    languageCode: "es",
    number: 2,
    title: "What's Your Name?",
    description: "Ask for a name and introduce yourself.",
    goal: "Ask someone's name and say your own name in Spanish.",
    xpReward: 10,
    estimatedMinutes: 6,
    vocabulary: [
      {
        id: "es-u1-l2-v1",
        term: "nombre",
        translation: "name",
      },
      {
        id: "es-u1-l2-v2",
        term: "me llamo",
        translation: "my name is",
      },
      {
        id: "es-u1-l2-v3",
        term: "mucho gusto",
        translation: "nice to meet you",
      },
    ],
    phrases: [
      {
        id: "es-u1-l2-p1",
        target: "¿Cómo te llamas?",
        english: "What is your name?",
      },
      {
        id: "es-u1-l2-p2",
        target: "Me llamo Alex.",
        english: "My name is Alex.",
      },
      {
        id: "es-u1-l2-p3",
        target: "Mucho gusto.",
        english: "Nice to meet you.",
      },
    ],
    activities: [
      {
        id: "es-u1-l2-a1",
        type: "listen",
        prompt: "Listen to the name questions and answers.",
        phraseIds: ["es-u1-l2-p1", "es-u1-l2-p2"],
      },
      {
        id: "es-u1-l2-a2",
        type: "speak",
        prompt: "Introduce yourself using Me llamo…",
        phraseIds: ["es-u1-l2-p2", "es-u1-l2-p3"],
      },
      {
        id: "es-u1-l2-a3",
        type: "translate",
        prompt: "Translate the introduction phrases into English.",
        phraseIds: ["es-u1-l2-p1", "es-u1-l2-p2", "es-u1-l2-p3"],
      },
    ],
    aiTeacherPrompt:
      "You are a friendly Spanish teacher helping beginners introduce themselves. Stay only on ¿Cómo te llamas?, Me llamo…, and Mucho gusto. Mostly speak English, introduce Spanish slowly with translations, keep answers short, and ask the student to try saying their own name. Stay encouraging and on-topic.",
    imageKey: "lessonIntroductions",
  },

  // ── Spanish · Unit 2: Daily Life ────────────────────────────────────────
  {
    id: "es-u2-l1",
    unitId: "es-unit-2",
    languageCode: "es",
    number: 1,
    title: "How Are You?",
    description: "Ask and answer simple feeling questions.",
    goal: "Ask cómo estás and reply with estoy bien or estoy cansado.",
    xpReward: 12,
    estimatedMinutes: 6,
    vocabulary: [
      {
        id: "es-u2-l1-v1",
        term: "bien",
        translation: "well / fine",
      },
      {
        id: "es-u2-l1-v2",
        term: "cansado",
        translation: "tired",
        tip: "Use cansada when talking about a woman.",
      },
      {
        id: "es-u2-l1-v3",
        term: "gracias",
        translation: "thank you",
      },
    ],
    phrases: [
      {
        id: "es-u2-l1-p1",
        target: "¿Cómo estás?",
        english: "How are you?",
      },
      {
        id: "es-u2-l1-p2",
        target: "Estoy bien, gracias.",
        english: "I'm fine, thank you.",
      },
      {
        id: "es-u2-l1-p3",
        target: "Estoy un poco cansado.",
        english: "I'm a little tired.",
      },
    ],
    activities: [
      {
        id: "es-u2-l1-a1",
        type: "speak",
        prompt: "Ask how someone is feeling, then answer.",
        phraseIds: ["es-u2-l1-p1", "es-u2-l1-p2"],
      },
      {
        id: "es-u2-l1-a2",
        type: "match",
        prompt: "Match the feeling words to English.",
        vocabularyIds: ["es-u2-l1-v1", "es-u2-l1-v2", "es-u2-l1-v3"],
      },
    ],
    aiTeacherPrompt:
      "You are a cheerful Spanish teacher practicing feelings. Stay only on ¿Cómo estás?, Estoy bien, and Estoy cansado. Mostly speak English, model Spanish slowly, keep replies short, and invite the student to answer how they feel today.",
    imageKey: "lessonFeelings",
  },
  {
    id: "es-u2-l2",
    unitId: "es-unit-2",
    languageCode: "es",
    number: 2,
    title: "Simple Routines",
    description: "Talk about eating, drinking, and going places.",
    goal: "Describe a simple daily action using como, bebo, or voy.",
    xpReward: 12,
    estimatedMinutes: 7,
    vocabulary: [
      {
        id: "es-u2-l2-v1",
        term: "como",
        translation: "I eat",
      },
      {
        id: "es-u2-l2-v2",
        term: "bebo",
        translation: "I drink",
      },
      {
        id: "es-u2-l2-v3",
        term: "voy",
        translation: "I go",
      },
    ],
    phrases: [
      {
        id: "es-u2-l2-p1",
        target: "Como el desayuno.",
        english: "I eat breakfast.",
      },
      {
        id: "es-u2-l2-p2",
        target: "Bebo agua.",
        english: "I drink water.",
      },
      {
        id: "es-u2-l2-p3",
        target: "Voy a casa.",
        english: "I go home.",
      },
    ],
    activities: [
      {
        id: "es-u2-l2-a1",
        type: "fill",
        prompt: "Complete each routine sentence with the right verb.",
        vocabularyIds: ["es-u2-l2-v1", "es-u2-l2-v2", "es-u2-l2-v3"],
      },
      {
        id: "es-u2-l2-a2",
        type: "speak",
        prompt: "Say one thing you do every day.",
        phraseIds: ["es-u2-l2-p1", "es-u2-l2-p2", "es-u2-l2-p3"],
      },
    ],
    aiTeacherPrompt:
      "You are a patient Spanish teacher covering simple routines. Stay only on como, bebo, and voy with the lesson phrases. Mostly speak English, introduce verbs slowly with translations, keep answers short, and ask the student to say one daily action.",
    imageKey: "lessonRoutines",
  },

  // ── Spanish · Unit 3: At the Café (matches Learn screen) ────────────────
  {
    id: "es-u3-l1",
    unitId: "es-unit-3",
    languageCode: "es",
    number: 1,
    title: "Greetings & Introductions",
    description: "Warm up with café-friendly hellos before ordering.",
    goal: "Greet a barista and introduce yourself politely.",
    xpReward: 15,
    estimatedMinutes: 8,
    vocabulary: [
      {
        id: "es-u3-l1-v1",
        term: "buenas tardes",
        translation: "good afternoon",
      },
      {
        id: "es-u3-l1-v2",
        term: "por favor",
        translation: "please",
      },
      {
        id: "es-u3-l1-v3",
        term: "de nada",
        translation: "you're welcome",
      },
    ],
    phrases: [
      {
        id: "es-u3-l1-p1",
        target: "Buenas tardes.",
        english: "Good afternoon.",
      },
      {
        id: "es-u3-l1-p2",
        target: "Me llamo Alex.",
        english: "My name is Alex.",
      },
      {
        id: "es-u3-l1-p3",
        target: "Encantado de conocerte.",
        english: "Nice to meet you.",
      },
    ],
    activities: [
      {
        id: "es-u3-l1-a1",
        type: "listen",
        prompt: "Listen to polite café greetings.",
        phraseIds: ["es-u3-l1-p1", "es-u3-l1-p3"],
      },
      {
        id: "es-u3-l1-a2",
        type: "speak",
        prompt: "Greet the barista and say your name.",
        phraseIds: ["es-u3-l1-p1", "es-u3-l1-p2"],
      },
      {
        id: "es-u3-l1-a3",
        type: "review",
        prompt: "Review please and thank-you words.",
        vocabularyIds: ["es-u3-l1-v2", "es-u3-l1-v3"],
      },
    ],
    aiTeacherPrompt:
      "You are a warm Spanish café-scene teacher. Stay only on greetings and introductions for this lesson: buenas tardes, Me llamo…, Encantado de conocerte, por favor, and de nada. Mostly speak English, introduce Spanish slowly with translations, keep replies to one or two sentences, and ask the student to practice greeting you like a barista.",
    imageKey: "lessonGreetings",
  },
  {
    id: "es-u3-l2",
    unitId: "es-unit-3",
    languageCode: "es",
    number: 2,
    title: "Daily Life",
    description: "Talk about what you usually drink or eat.",
    goal: "Say what you usually order using me gusta and always/never words.",
    xpReward: 15,
    estimatedMinutes: 8,
    vocabulary: [
      {
        id: "es-u3-l2-v1",
        term: "siempre",
        translation: "always",
      },
      {
        id: "es-u3-l2-v2",
        term: "nunca",
        translation: "never",
      },
      {
        id: "es-u3-l2-v3",
        term: "me gusta",
        translation: "I like",
      },
    ],
    phrases: [
      {
        id: "es-u3-l2-p1",
        target: "Me gusta el café.",
        english: "I like coffee.",
      },
      {
        id: "es-u3-l2-p2",
        target: "Siempre pido té.",
        english: "I always order tea.",
      },
      {
        id: "es-u3-l2-p3",
        target: "Nunca bebo refrescos.",
        english: "I never drink soft drinks.",
      },
    ],
    activities: [
      {
        id: "es-u3-l2-a1",
        type: "match",
        prompt: "Match siempre, nunca, and me gusta to English.",
        vocabularyIds: ["es-u3-l2-v1", "es-u3-l2-v2", "es-u3-l2-v3"],
      },
      {
        id: "es-u3-l2-a2",
        type: "speak",
        prompt: "Say one drink you like and one you never order.",
        phraseIds: ["es-u3-l2-p1", "es-u3-l2-p3"],
      },
    ],
    aiTeacherPrompt:
      "You are a friendly Spanish teacher connecting daily habits to café talk. Stay only on me gusta, siempre, and nunca with this lesson's phrases. Mostly speak English, model Spanish slowly, keep answers short, and ask what the student usually drinks.",
    imageKey: "lessonDailyLife",
  },
  {
    id: "es-u3-l3",
    unitId: "es-unit-3",
    languageCode: "es",
    number: 3,
    title: "At the Café",
    description: "Order a drink and ask for the bill.",
    goal: "Order a coffee politely and ask for the check.",
    xpReward: 20,
    estimatedMinutes: 10,
    vocabulary: [
      {
        id: "es-u3-l3-v1",
        term: "café",
        translation: "coffee",
      },
      {
        id: "es-u3-l3-v2",
        term: "té",
        translation: "tea",
      },
      {
        id: "es-u3-l3-v3",
        term: "agua",
        translation: "water",
      },
      {
        id: "es-u3-l3-v4",
        term: "la cuenta",
        translation: "the check / the bill",
      },
    ],
    phrases: [
      {
        id: "es-u3-l3-p1",
        target: "Quisiera un café, por favor.",
        english: "I would like a coffee, please.",
      },
      {
        id: "es-u3-l3-p2",
        target: "¿Me trae un té?",
        english: "Could you bring me a tea?",
      },
      {
        id: "es-u3-l3-p3",
        target: "La cuenta, por favor.",
        english: "The check, please.",
      },
      {
        id: "es-u3-l3-p4",
        target: "¿Cuánto cuesta?",
        english: "How much does it cost?",
      },
    ],
    activities: [
      {
        id: "es-u3-l3-a1",
        type: "listen",
        prompt: "Listen to café order phrases.",
        phraseIds: ["es-u3-l3-p1", "es-u3-l3-p2"],
      },
      {
        id: "es-u3-l3-a2",
        type: "speak",
        prompt: "Order a drink, then ask for the check.",
        phraseIds: ["es-u3-l3-p1", "es-u3-l3-p3"],
      },
      {
        id: "es-u3-l3-a3",
        type: "translate",
        prompt: "Translate the café phrases into English.",
        phraseIds: ["es-u3-l3-p1", "es-u3-l3-p3", "es-u3-l3-p4"],
      },
      {
        id: "es-u3-l3-a4",
        type: "review",
        prompt: "Review drink vocabulary.",
        vocabularyIds: [
          "es-u3-l3-v1",
          "es-u3-l3-v2",
          "es-u3-l3-v3",
          "es-u3-l3-v4",
        ],
      },
    ],
    aiTeacherPrompt:
      "You are an energetic Spanish teacher role-playing a café. Stay only on ordering drinks and asking for the bill using this lesson's vocabulary and phrases (café, té, agua, la cuenta, Quisiera un café, La cuenta por favor). Mostly speak English, introduce Spanish slowly with translations, keep replies to one or two conversational sentences, listen to the student, and ask them to order again if needed. Celebrate small wins.",
    imageKey: "lessonCafe",
  },
  {
    id: "es-u3-l4",
    unitId: "es-unit-3",
    languageCode: "es",
    number: 4,
    title: "Travel & Directions",
    description: "Ask where places are near the café.",
    goal: "Ask where something is and understand left, right, and straight.",
    xpReward: 15,
    estimatedMinutes: 8,
    vocabulary: [
      {
        id: "es-u3-l4-v1",
        term: "izquierda",
        translation: "left",
      },
      {
        id: "es-u3-l4-v2",
        term: "derecha",
        translation: "right",
      },
      {
        id: "es-u3-l4-v3",
        term: "recto",
        translation: "straight",
      },
    ],
    phrases: [
      {
        id: "es-u3-l4-p1",
        target: "¿Dónde está el baño?",
        english: "Where is the bathroom?",
      },
      {
        id: "es-u3-l4-p2",
        target: "Está a la derecha.",
        english: "It's on the right.",
      },
      {
        id: "es-u3-l4-p3",
        target: "Sigue todo recto.",
        english: "Keep going straight.",
      },
    ],
    activities: [
      {
        id: "es-u3-l4-a1",
        type: "match",
        prompt: "Match direction words to English.",
        vocabularyIds: ["es-u3-l4-v1", "es-u3-l4-v2", "es-u3-l4-v3"],
      },
      {
        id: "es-u3-l4-a2",
        type: "speak",
        prompt: "Ask where the bathroom is.",
        phraseIds: ["es-u3-l4-p1"],
      },
    ],
    aiTeacherPrompt:
      "You are a helpful Spanish teacher practicing simple directions. Stay only on ¿Dónde está…?, izquierda, derecha, and recto with this lesson's phrases. Mostly speak English, introduce Spanish slowly, keep replies short, and ask the student to ask for the bathroom or a nearby place.",
    imageKey: "lessonTravel",
  },
  {
    id: "es-u3-l5",
    unitId: "es-unit-3",
    languageCode: "es",
    number: 5,
    title: "Shopping",
    description: "Ask prices and buy a small item.",
    goal: "Ask how much something costs and say you want to buy it.",
    xpReward: 15,
    estimatedMinutes: 8,
    vocabulary: [
      {
        id: "es-u3-l5-v1",
        term: "precio",
        translation: "price",
      },
      {
        id: "es-u3-l5-v2",
        term: "barato",
        translation: "cheap",
      },
      {
        id: "es-u3-l5-v3",
        term: "caro",
        translation: "expensive",
      },
    ],
    phrases: [
      {
        id: "es-u3-l5-p1",
        target: "¿Cuánto cuesta esto?",
        english: "How much does this cost?",
      },
      {
        id: "es-u3-l5-p2",
        target: "Quiero comprar esto.",
        english: "I want to buy this.",
      },
      {
        id: "es-u3-l5-p3",
        target: "Es un poco caro.",
        english: "It's a little expensive.",
      },
    ],
    activities: [
      {
        id: "es-u3-l5-a1",
        type: "speak",
        prompt: "Ask the price, then say you want to buy it.",
        phraseIds: ["es-u3-l5-p1", "es-u3-l5-p2"],
      },
      {
        id: "es-u3-l5-a2",
        type: "fill",
        prompt: "Choose barato or caro for each situation.",
        vocabularyIds: ["es-u3-l5-v2", "es-u3-l5-v3"],
      },
    ],
    aiTeacherPrompt:
      "You are a playful Spanish teacher practicing shopping phrases. Stay only on ¿Cuánto cuesta esto?, Quiero comprar esto, barato, and caro. Mostly speak English, introduce Spanish slowly with translations, keep replies short, and invite the student to ask a price.",
    imageKey: "lessonShopping",
  },
  {
    id: "es-u3-l6",
    unitId: "es-unit-3",
    languageCode: "es",
    number: 6,
    title: "Family & Friends",
    description: "Talk about people you are meeting at the café.",
    goal: "Name a family member or friend and say you are meeting them.",
    xpReward: 15,
    estimatedMinutes: 8,
    vocabulary: [
      {
        id: "es-u3-l6-v1",
        term: "amigo",
        translation: "friend (male)",
        tip: "Use amiga for a female friend.",
      },
      {
        id: "es-u3-l6-v2",
        term: "familia",
        translation: "family",
      },
      {
        id: "es-u3-l6-v3",
        term: "hermano",
        translation: "brother",
        tip: "Use hermana for sister.",
      },
    ],
    phrases: [
      {
        id: "es-u3-l6-p1",
        target: "Estoy con mi amigo.",
        english: "I'm with my friend.",
      },
      {
        id: "es-u3-l6-p2",
        target: "Esta es mi hermana.",
        english: "This is my sister.",
      },
      {
        id: "es-u3-l6-p3",
        target: "Voy a ver a mi familia.",
        english: "I'm going to see my family.",
      },
    ],
    activities: [
      {
        id: "es-u3-l6-a1",
        type: "match",
        prompt: "Match family and friend words to English.",
        vocabularyIds: ["es-u3-l6-v1", "es-u3-l6-v2", "es-u3-l6-v3"],
      },
      {
        id: "es-u3-l6-a2",
        type: "speak",
        prompt: "Introduce a friend or family member.",
        phraseIds: ["es-u3-l6-p1", "es-u3-l6-p2"],
      },
    ],
    aiTeacherPrompt:
      "You are a kind Spanish teacher helping talk about friends and family at a café. Stay only on amigo, familia, hermana/hermano, and this lesson's phrases. Mostly speak English, introduce Spanish slowly, keep replies short, and ask who the student is meeting today.",
    imageKey: "lessonFamily",
  },

  // ── French · Unit 1 ─────────────────────────────────────────────────────
  {
    id: "fr-u1-l1",
    unitId: "fr-unit-1",
    languageCode: "fr",
    number: 1,
    title: "Bonjour!",
    description: "Greet people in French.",
    goal: "Say bonjour and au revoir confidently.",
    xpReward: 10,
    estimatedMinutes: 5,
    vocabulary: [
      {
        id: "fr-u1-l1-v1",
        term: "bonjour",
        translation: "hello / good day",
      },
      {
        id: "fr-u1-l1-v2",
        term: "au revoir",
        translation: "goodbye",
      },
      {
        id: "fr-u1-l1-v3",
        term: "merci",
        translation: "thank you",
      },
    ],
    phrases: [
      {
        id: "fr-u1-l1-p1",
        target: "Bonjour!",
        english: "Hello!",
      },
      {
        id: "fr-u1-l1-p2",
        target: "Au revoir!",
        english: "Goodbye!",
      },
      {
        id: "fr-u1-l1-p3",
        target: "Merci beaucoup.",
        english: "Thank you very much.",
      },
    ],
    activities: [
      {
        id: "fr-u1-l1-a1",
        type: "listen",
        prompt: "Listen and repeat each greeting.",
        phraseIds: ["fr-u1-l1-p1", "fr-u1-l1-p2", "fr-u1-l1-p3"],
      },
      {
        id: "fr-u1-l1-a2",
        type: "speak",
        prompt: "Greet your teacher, then say goodbye.",
        phraseIds: ["fr-u1-l1-p1", "fr-u1-l1-p2"],
      },
    ],
    aiTeacherPrompt:
      "You are a warm French teacher for absolute beginners. Stay only on bonjour, au revoir, and merci. Mostly speak English, introduce French slowly with translations, keep replies short, and ask the student to repeat each word. Stay encouraging and on-topic.",
    imageKey: "lessonGreetings",
  },
  {
    id: "fr-u1-l2",
    unitId: "fr-unit-1",
    languageCode: "fr",
    number: 2,
    title: "Je m'appelle…",
    description: "Introduce yourself in French.",
    goal: "Ask someone's name and say your own name.",
    xpReward: 10,
    estimatedMinutes: 6,
    vocabulary: [
      {
        id: "fr-u1-l2-v1",
        term: "je m'appelle",
        translation: "my name is",
      },
      {
        id: "fr-u1-l2-v2",
        term: "enchanté",
        translation: "nice to meet you",
        tip: "Use enchantée when a woman is speaking.",
      },
    ],
    phrases: [
      {
        id: "fr-u1-l2-p1",
        target: "Comment tu t'appelles?",
        english: "What is your name?",
      },
      {
        id: "fr-u1-l2-p2",
        target: "Je m'appelle Alex.",
        english: "My name is Alex.",
      },
      {
        id: "fr-u1-l2-p3",
        target: "Enchanté.",
        english: "Nice to meet you.",
      },
    ],
    activities: [
      {
        id: "fr-u1-l2-a1",
        type: "speak",
        prompt: "Introduce yourself in French.",
        phraseIds: ["fr-u1-l2-p2", "fr-u1-l2-p3"],
      },
      {
        id: "fr-u1-l2-a2",
        type: "translate",
        prompt: "Translate the name phrases.",
        phraseIds: ["fr-u1-l2-p1", "fr-u1-l2-p2"],
      },
    ],
    aiTeacherPrompt:
      "You are a friendly French teacher practicing names. Stay only on Comment tu t'appelles?, Je m'appelle…, and Enchanté. Mostly speak English, introduce French slowly, keep replies short, and ask the student to say their name.",
    imageKey: "lessonIntroductions",
  },

  // ── French · Unit 2 ─────────────────────────────────────────────────────
  {
    id: "fr-u2-l1",
    unitId: "fr-unit-2",
    languageCode: "fr",
    number: 1,
    title: "Commander un café",
    description: "Order a drink at a French café.",
    goal: "Politely order a coffee or tea in French.",
    xpReward: 15,
    estimatedMinutes: 8,
    vocabulary: [
      {
        id: "fr-u2-l1-v1",
        term: "un café",
        translation: "a coffee",
      },
      {
        id: "fr-u2-l1-v2",
        term: "un thé",
        translation: "a tea",
      },
      {
        id: "fr-u2-l1-v3",
        term: "s'il vous plaît",
        translation: "please (formal)",
      },
    ],
    phrases: [
      {
        id: "fr-u2-l1-p1",
        target: "Je voudrais un café, s'il vous plaît.",
        english: "I would like a coffee, please.",
      },
      {
        id: "fr-u2-l1-p2",
        target: "Un thé, s'il vous plaît.",
        english: "A tea, please.",
      },
      {
        id: "fr-u2-l1-p3",
        target: "L'addition, s'il vous plaît.",
        english: "The check, please.",
      },
    ],
    activities: [
      {
        id: "fr-u2-l1-a1",
        type: "listen",
        prompt: "Listen to café order phrases.",
        phraseIds: ["fr-u2-l1-p1", "fr-u2-l1-p2"],
      },
      {
        id: "fr-u2-l1-a2",
        type: "speak",
        prompt: "Order a drink, then ask for the check.",
        phraseIds: ["fr-u2-l1-p1", "fr-u2-l1-p3"],
      },
    ],
    aiTeacherPrompt:
      "You are an energetic French teacher role-playing a café. Stay only on ordering drinks and asking for the check with this lesson's vocabulary and phrases. Mostly speak English, introduce French slowly with translations, keep replies short, and ask the student to place an order.",
    imageKey: "lessonCafe",
  },

  // ── Japanese · Unit 1 ───────────────────────────────────────────────────
  {
    id: "ja-u1-l1",
    unitId: "ja-unit-1",
    languageCode: "ja",
    number: 1,
    title: "こんにちは",
    description: "Learn basic Japanese greetings.",
    goal: "Say hello and goodbye in Japanese.",
    xpReward: 10,
    estimatedMinutes: 6,
    vocabulary: [
      {
        id: "ja-u1-l1-v1",
        term: "こんにちは",
        translation: "hello",
        romanization: "konnichiwa",
      },
      {
        id: "ja-u1-l1-v2",
        term: "さようなら",
        translation: "goodbye",
        romanization: "sayounara",
      },
      {
        id: "ja-u1-l1-v3",
        term: "ありがとう",
        translation: "thank you",
        romanization: "arigatou",
      },
    ],
    phrases: [
      {
        id: "ja-u1-l1-p1",
        target: "こんにちは。",
        english: "Hello.",
        romanization: "Konnichiwa.",
      },
      {
        id: "ja-u1-l1-p2",
        target: "さようなら。",
        english: "Goodbye.",
        romanization: "Sayounara.",
      },
      {
        id: "ja-u1-l1-p3",
        target: "ありがとうございます。",
        english: "Thank you.",
        romanization: "Arigatou gozaimasu.",
      },
    ],
    activities: [
      {
        id: "ja-u1-l1-a1",
        type: "listen",
        prompt: "Listen to each greeting with its romanization.",
        phraseIds: ["ja-u1-l1-p1", "ja-u1-l1-p2", "ja-u1-l1-p3"],
      },
      {
        id: "ja-u1-l1-a2",
        type: "speak",
        prompt: "Say hello, thank you, and goodbye.",
        phraseIds: ["ja-u1-l1-p1", "ja-u1-l1-p3", "ja-u1-l1-p2"],
      },
    ],
    aiTeacherPrompt:
      "You are a warm Japanese teacher for absolute beginners. Stay only on こんにちは (konnichiwa), さようなら (sayounara), and ありがとう (arigatou). Mostly speak English, say Japanese slowly with romanization and meaning, keep replies short, and ask the student to repeat. Stay on-topic.",
    imageKey: "lessonGreetings",
  },
  {
    id: "ja-u1-l2",
    unitId: "ja-unit-1",
    languageCode: "ja",
    number: 2,
    title: "My Name Is…",
    description: "Introduce yourself in Japanese.",
    goal: "Say your name using 〜です.",
    xpReward: 10,
    estimatedMinutes: 6,
    vocabulary: [
      {
        id: "ja-u1-l2-v1",
        term: "名前",
        translation: "name",
        romanization: "namae",
      },
      {
        id: "ja-u1-l2-v2",
        term: "です",
        translation: "am / is / are (polite)",
        romanization: "desu",
      },
    ],
    phrases: [
      {
        id: "ja-u1-l2-p1",
        target: "お名前は？",
        english: "What is your name?",
        romanization: "Onamae wa?",
      },
      {
        id: "ja-u1-l2-p2",
        target: "アレックスです。",
        english: "I'm Alex.",
        romanization: "Arekkusu desu.",
      },
      {
        id: "ja-u1-l2-p3",
        target: "よろしくお願いします。",
        english: "Nice to meet you.",
        romanization: "Yoroshiku onegaishimasu.",
      },
    ],
    activities: [
      {
        id: "ja-u1-l2-a1",
        type: "speak",
        prompt: "Introduce yourself using 〜です.",
        phraseIds: ["ja-u1-l2-p2", "ja-u1-l2-p3"],
      },
      {
        id: "ja-u1-l2-a2",
        type: "match",
        prompt: "Match each phrase to English.",
        phraseIds: ["ja-u1-l2-p1", "ja-u1-l2-p2", "ja-u1-l2-p3"],
      },
    ],
    aiTeacherPrompt:
      "You are a friendly Japanese teacher practicing self-introductions. Stay only on お名前は, 〜です, and よろしくお願いします. Mostly speak English, say Japanese slowly with romanization and meaning, keep replies short, and ask the student to introduce themselves.",
    imageKey: "lessonIntroductions",
  },

  // ── Japanese · Unit 2 ───────────────────────────────────────────────────
  {
    id: "ja-u2-l1",
    unitId: "ja-unit-2",
    languageCode: "ja",
    number: 1,
    title: "Café Order",
    description: "Order a drink in Japanese.",
    goal: "Order coffee or tea politely with ください.",
    xpReward: 15,
    estimatedMinutes: 8,
    vocabulary: [
      {
        id: "ja-u2-l1-v1",
        term: "コーヒー",
        translation: "coffee",
        romanization: "koohii",
      },
      {
        id: "ja-u2-l1-v2",
        term: "お茶",
        translation: "tea",
        romanization: "ocha",
      },
      {
        id: "ja-u2-l1-v3",
        term: "ください",
        translation: "please (give me)",
        romanization: "kudasai",
      },
    ],
    phrases: [
      {
        id: "ja-u2-l1-p1",
        target: "コーヒーをください。",
        english: "Coffee, please.",
        romanization: "Koohii o kudasai.",
      },
      {
        id: "ja-u2-l1-p2",
        target: "お茶をください。",
        english: "Tea, please.",
        romanization: "Ocha o kudasai.",
      },
      {
        id: "ja-u2-l1-p3",
        target: "お会計お願いします。",
        english: "The check, please.",
        romanization: "Okaikei onegaishimasu.",
      },
    ],
    activities: [
      {
        id: "ja-u2-l1-a1",
        type: "listen",
        prompt: "Listen to café order phrases.",
        phraseIds: ["ja-u2-l1-p1", "ja-u2-l1-p2"],
      },
      {
        id: "ja-u2-l1-a2",
        type: "speak",
        prompt: "Order a drink, then ask for the check.",
        phraseIds: ["ja-u2-l1-p1", "ja-u2-l1-p3"],
      },
    ],
    aiTeacherPrompt:
      "You are an energetic Japanese teacher role-playing a café. Stay only on コーヒー, お茶, ください, and this lesson's phrases. Mostly speak English, say Japanese slowly with romanization and meaning, keep replies short, and ask the student to order a drink.",
    imageKey: "lessonCafe",
  },
];

export function getLessonsByLanguage(languageCode: LanguageCode): Lesson[] {
  return lessons
    .filter((lesson) => lesson.languageCode === languageCode)
    .sort(compareLessons);
}

export function getLessonsByUnit(unitId: string): Lesson[] {
  return lessons
    .filter((lesson) => lesson.unitId === unitId)
    .sort((a, b) => a.number - b.number);
}

export function getLessonById(lessonId: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === lessonId);
}

/** Handy for Home "continue learning" — first lesson in the latest unit, or a named default. */
export function getFeaturedLesson(
  languageCode: LanguageCode,
): Lesson | undefined {
  const languageLessons = getLessonsByLanguage(languageCode);
  if (languageLessons.length === 0) {
    return undefined;
  }

  // Prefer the café lesson that matches the home design when learning Spanish.
  const cafeLesson = languageLessons.find((lesson) => lesson.id === "es-u3-l3");
  if (cafeLesson) {
    return cafeLesson;
  }

  return languageLessons[languageLessons.length - 1];
}
