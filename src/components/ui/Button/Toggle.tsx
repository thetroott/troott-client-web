import { Switch, IconButton, Box } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useAppContext } from "../../../context/app.context";

const ThemeToggleSwitch = () => {

  const { state, dispatch } = useAppContext();

  const toggleTheme = () => dispatch({ type: "TOGGLE_THEME" });

  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={toggleTheme} color="inherit">
        {state.theme.mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
      <Switch checked={state.theme.mode === "dark"} onChange={toggleTheme} />
    </Box>
  );
};

export default ThemeToggleSwitch;
