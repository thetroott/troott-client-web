import type { Theme } from "@/utils/types.util";


export interface IAppState {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  
}
