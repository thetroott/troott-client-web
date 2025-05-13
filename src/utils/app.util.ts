import type { ThemeMode } from "./types.util";

export interface ThemeState {
  mode: ThemeMode;
}

export interface UserState {
  id: string;
  name: string;
  email: string;
}

export interface IAppState {
  theme: ThemeState;
  user: UserState | null;
}

const initialState: IAppState = {
    theme: {
      mode: "light",
    },
    user: null,
  };
  
  export default initialState;