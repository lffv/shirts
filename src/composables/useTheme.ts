import { ref, onMounted, watch } from "vue";

export type Theme = "blackMetal" | "deathMetal";

const currentTheme = ref<Theme>("blackMetal");

export const useTheme = () => {
  // Load theme from localStorage on mount
  onMounted(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const initial =
      savedTheme === "blackMetal" || savedTheme === "deathMetal"
        ? savedTheme
        : "blackMetal";
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
    html.classList.remove("black-metal-theme", "death-metal-theme");

    if (theme === "blackMetal") {
      html.classList.add("black-metal-theme");
    }

    if (theme === "deathMetal") {
      html.classList.add("death-metal-theme");
    }
  };

  const toggleTheme = () => {
    currentTheme.value =
      currentTheme.value === "blackMetal" ? "deathMetal" : "blackMetal";
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
