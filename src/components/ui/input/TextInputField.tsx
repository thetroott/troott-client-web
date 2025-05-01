import TextField from "@mui/material/TextField";
import { ITextInputField } from "../../../utils/ui.util";


const TextInputField = (props: ITextInputField) => {

    const {
        label,
        placeholder,
        value,
        onChange,
        error,
        helperText,
        autoComplete,
        autoFocus,
        fullWidth = true,
        borderRadius = "8px",
        color = "#1d79ff",
        sx = {},
        ...rest
      } = props

  return (
    <TextField
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
          sx: {
            borderRadius,
          },
        },
        inputLabel: {
          shrink: true,
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius,
          "&.Mui-focused fieldset": {
            borderColor: color,
          },
        },
        "& label.Mui-focused": {
          color: color,
        },
        ...sx,
      }}
      {...rest}
    />
  );
};

export default TextInputField;
