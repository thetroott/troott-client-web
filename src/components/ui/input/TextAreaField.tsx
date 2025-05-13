import TextField from "@mui/material/TextField";
import type { ITextAreaField } from "../../../utils/ui.util";


const TextAreaField = (props: ITextAreaField & { rows?: number }) => {
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
    rows = 4,
    ...rest
  } = props
  
  return (
    <TextField
      multiline
      rows={rows}
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

export default TextAreaField;
