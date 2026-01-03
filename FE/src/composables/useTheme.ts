import { ref, onMounted, watch } from "vue";

export type Theme = "blackMetal" | "deathMetal" | "goreMetal" | "heavyMetal";

const currentTheme = ref<Theme>("blackMetal");

export const useTheme = () => {
  // Load theme from localStorage on mount
  onMounted(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const allowed = new Set<Theme>([
      "blackMetal",
      "deathMetal",
      "goreMetal",
      "heavyMetal",
    ]);
    const initial =
      savedTheme && allowed.has(savedTheme) ? savedTheme : "blackMetal";
    currentTheme.value = initial;
    applyTheme(initial);
  });

  // Watch for theme changes
  watch(currentTheme, (newTheme) => {
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  });

  const applyTheme = (theme: Theme) => {
    const html = document.documentElement;
    html.classList.remove(
      "black-metal-theme",
      "death-metal-theme",
      "gore-metal-theme",
      "heavy-metal-theme"
    );

    if (theme === "blackMetal") {
      html.classList.add("black-metal-theme");
    }

    if (theme === "deathMetal") {
      html.classList.add("death-metal-theme");
    }

    if (theme === "goreMetal") {
      html.classList.add("gore-metal-theme");
    }
    if (theme === "heavyMetal") {
      html.classList.add("heavy-metal-theme");
    }
  };

  const toggleTheme = () => {
    const order: Theme[] = [
      "blackMetal",
      "deathMetal",
      "goreMetal",
      "heavyMetal",
    ];
    const idx = order.indexOf(currentTheme.value);
    const next = order[(idx + 1) % order.length];
    currentTheme.value = next;
  };

  const setTheme = (theme: Theme) => {
    currentTheme.value = theme;
  };

  return {
    currentTheme,
    toggleTheme,
    setTheme,
  };
};
