import React, { createContext, useContext, useReducer, useEffect } from "react";
import { ThemeProvider, CssBaseline, createTheme, useMediaQuery } from "@mui/material";
import { appReducer } from "./app.reducer";
import type { AppAction } from "./app.actions";
import type { IAppState } from "../utils/app.util";
import initialState from "../utils/app.util";
import storage from "../utils/storage.util";


const getInitialTheme = (): "light" | "dark" => {
    try {
      const storedTheme = storage.fetchData("theme");
      if (storedTheme === "light" || storedTheme === "dark") {
        return storedTheme;
      }
    } catch (error) {
      console.error("Could not read theme from localStorage", error);
    }
    // Fallback to system preference if nothing stored or error
    // Check if window is defined (for SSR or build environments)
    if (typeof window !== 'undefined' && window.matchMedia) {
      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDarkMode ? "dark" : "light";
    }
    return "light";
  };

  

const AppContext = createContext<{
  state: IAppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: { ...initialState, theme: { mode: getInitialTheme() } },
  dispatch: () => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [state, dispatch] = useReducer(appReducer, {
    ...initialState,
    theme: { mode: getInitialTheme() } 
  });

  useEffect(() => {
    storage.keepData("theme", state.theme.mode);
  }, [state.theme.mode]);

  const muiTheme = createTheme({
    palette: {
      mode: state.theme.mode,
      ...(state.theme.mode === "light"
        ? { background: { default: "#f7f7f7" } }
        : { background: { default: "#121212" } }),
    },
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
