import { ref, onMounted, computed } from "vue";
import pt from "@/locales/pt.json";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import es from "@/locales/es.json";

export type Language = "pt" | "en" | "fr" | "es";

const translations: Record<Language, any> = {
  pt,
  en,
  fr,
  es,
};

const currentLanguage = ref<Language>("pt");

export const useLanguage = () => {
  // Load language from localStorage on mount
  onMounted(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      currentLanguage.value = savedLanguage;
    }
  });

  const setLanguage = (language: Language) => {
    if (Object.keys(translations).includes(language)) {
      currentLanguage.value = language;
      localStorage.setItem("language", language);
    }
  };

  const t = (key: string, defaultValue?: string): string => {
    const keys = key.split(".");
    let value: any = translations[currentLanguage.value];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return defaultValue || key;
      }
    }

    return typeof value === "string" ? value : defaultValue || key;
  };

  const languages = computed(() => [
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "es", name: "Español", flag: "🇪🇸" },
  ]);

  return {
    currentLanguage,
    setLanguage,
    t,
    languages,
  };
};
