import { ref, onMounted, watch } from "vue";

export type Theme = "default" | "metal";

const currentTheme = ref<Theme>("default");

export const useTheme = () => {
  // Load theme from localStorage on mount
  onMounted(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      currentTheme.value = savedTheme;
      applyTheme(savedTheme);
    }
  });

  // Watch for theme changes
  watch(currentTheme, (newTheme) => {
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  });

  const applyTheme = (theme: Theme) => {
    const html = document.documentElement;

    if (theme === "metal") {
      html.classList.add("metal-theme");
    } else {
      html.classList.remove("metal-theme");
    }
  };

  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === "default" ? "metal" : "default";
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
