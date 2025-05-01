import {
  TextField,
  Checkbox,
  ListItemText,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { IMultiSelectField } from "../../../utils/ui.util";

const MultiSelectField = (props: IMultiSelectField) => {
  const {
    label,
    value,
    onChange,
    options,
    error,
    helperText,
    autoFocus,
    fullWidth,
    placeholder,
    borderRadius = "8px",
    color = "#1d79ff",
    disabled = false,
    renderOption,
    ...rest
  } = props;

  return (
    <TextField
      select
      SelectProps={{
        multiple: true,
        value,
        //onChange,
        input: <OutlinedInput label={label} />,
        renderValue: (selected) => (selected as string[]).join(", "),
      }}
      label={label}
      error={!!error}
      helperText={helperText}
      autoFocus={autoFocus}
      fullWidth={fullWidth}
      placeholder={placeholder}
      disabled={disabled}
      variant="outlined"
      slotProps={{
        input: {
          sx: { borderRadius },
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
      {/* {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox checked={value.indexOf(option.value) > -1} />
            /{renderOption ? renderOption(option) : <ListItemText primary={option.label} />}
          </MenuItem>
        ))} */}
    </TextField>
  );
};

export default MultiSelectField;
