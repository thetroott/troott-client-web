import type { IRadioField } from "../../../utils/ui.util";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";

const RadioField = (props: IRadioField) => {
  const {
    label,
    value,
    onChange,
    options,
    error,
    helperText,
    row = false,
  } = props;
  return (
    <FormControl component="fieldset" error={error} sx={{ mt: 2 }}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup row={row} value={value} onChange={onChange}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default RadioField;
