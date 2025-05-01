import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IPasswordField } from "../../../utils/ui.util";

const PasswordField = (props: IPasswordField) => {

  const {
    label,
    value,
    onChange,
    error,
    helperText,
    autoComplete,
    placeholder,
    autoFocus,
    fullWidth,
    borderRadius,
    color,
    ...rest
  } = props;
  
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => setShowPassword((prev) => !prev);

  return (
    <TextField
      type={showPassword ? "text" : "password"}
      label={label}
      value={value}
      placeholder={placeholder} 
      onChange={onChange}
      error={!!error}
      helperText={helperText}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      fullWidth={fullWidth}
      variant="outlined"
      slotProps={{
        input: {
       
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleToggle} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            borderRadius: borderRadius,
          },
        }
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: borderRadius,
          "&.Mui-focused fieldset": {
            borderColor: color,
          },
        },
      }}
      {...rest}
    />
  );
};

export default PasswordField;
