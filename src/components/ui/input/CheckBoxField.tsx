import React from "react";
import { FormControlLabel, Checkbox, FormHelperText } from "@mui/material";
import { IVCheckbox } from "../../../utils/ui.util";

const VCheckbox = (props: IVCheckbox) => {
  const { label, checked, onChange, error, helperText } = props;
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox checked={checked} onChange={onChange} color="primary" />
        }
        label={label}
      />
      {error && helperText && (
        <FormHelperText error>{helperText}</FormHelperText>
      )}
    </>
  );
};

export default VCheckbox;
