import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { IEmailField } from "../../../utils/ui.util";

const EmailField = (props: IEmailField) => {
  const {
    label,
    placeholder,
    value,
    onChange,
    error,
    helperText,
    autoComplete,
    autoFocus,
    fullWidth,
    borderRadius,
    color,
    ...rest
  } = props;

  return (
    <TextField
      type="email"
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={helperText}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      fullWidth={fullWidth}
      variant="outlined"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              
            </InputAdornment>
          ),
          sx: {
            borderRadius: borderRadius,
          },
        },
        inputLabel: {
          shrink: true,
          sx: {
            color: color,
          },
        },
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

export default EmailField;
