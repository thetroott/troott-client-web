import type { Theme } from "./types.util";

export interface ThemeState {
  mode: Theme;
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
      mode: "system",
    },
    user: null,
  };
  
  export default initialState;