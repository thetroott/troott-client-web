import { TextField, MenuItem } from "@mui/material";
import type { ISelectField } from "../../../utils/ui.util";

const SelectField = (props: ISelectField) => {
  const {
    label,
    value,
    onChange,
    options = [],
    error,
    helperText,
    autoFocus,
    fullWidth,
    placeholder,
    borderRadius = "8px",
    color = "#1d79ff",
    disabled = false,
    ...rest
  } = props;

  return (
    <TextField
      select
      label={label}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={helperText}
      autoFocus={autoFocus}
      fullWidth={fullWidth}
      placeholder={placeholder}
      disabled={disabled}
      variant="outlined"
      slotProps={{
        input: {
          sx: {
            borderRadius,
          },
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius,
          "&.Mui-focused fieldset": {
            borderColor: color,
          },
        },
      }}
      {...rest}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectField;
