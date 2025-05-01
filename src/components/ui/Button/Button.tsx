import { useEffect } from "react";
import MuiButton from "@mui/material/Button";
import { IButton } from "../../../utils/ui.util";
import CircularProgress from "@mui/material/CircularProgress";

const Button = (props: IButton) => {
  const {
    title,
    loading = false,
    disabled,
    left,
    right,
    variant = "contained",
    alignSelf,
    borderRadius = 8,
    backgroundColor,
    color,
    children,
    sx,
    ...muiProps
  } = props;

  useEffect(() => {}, []);

  return (
    <>
      <MuiButton
        disabled={disabled || loading}
        variant={variant}
        startIcon={!loading && left}
        endIcon={!loading && right}
        sx={{
          alignSelf,
          borderRadius,
          backgroundColor:
            variant === "contained" ? backgroundColor : undefined,
          color: variant === "contained" ? color : backgroundColor || color,
          borderColor: backgroundColor,
          textTransform: "none",
          opacity: disabled ? 0.6 : 1,
          ...sx,
        }}
        {...muiProps}
      >
        {loading ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          title || children
        )}
      </MuiButton>
    </>
  );
};

export default Button;
