import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import type { IAppState } from "@/store/types";
import type { Theme } from "@/utils/types.util";

// --- Helpers ---
const getSystemTheme = (): "light" | "dark" => {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyDomTheme = (theme: Theme) => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  root.classList.remove("light", "dark");
  root.classList.add(theme === "system" ? getSystemTheme() : theme);
};

// --- Store ---
export const useAppStore = create<IAppState>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        theme: "system",

        toggleTheme: () => {
          const current = get().theme;
          const next = current === "light" ? "dark" : "light";
          set({ theme: next });
        },

        setTheme: (theme) => set({ theme }),
        
        get resolvedTheme(): "light" | "dark" {
          return get().theme === "system"
            ? getSystemTheme()
            : get().theme as "light" | "dark";
        },
      }),
      { name: "app-storage" } // stored in localStorage
    )
  )
);

// --- Sync theme & listen to system changes ---
if (typeof window !== "undefined") {
  // Sync whenever Zustand's theme changes
  useAppStore.subscribe((state) => {
    applyDomTheme(state.theme);
  });

  // Apply immediately on load
  applyDomTheme(useAppStore.getState().theme);

  // Listen for OS theme changes
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const systemListener = () => {
    if (useAppStore.getState().theme === "system") {
      applyDomTheme("system"); // resolves to current OS theme
    }
  };
  media.addEventListener("change", systemListener);
}
