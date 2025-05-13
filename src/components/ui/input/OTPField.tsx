import React, { useRef, useState, useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";
import type { IOTPField } from "../../../utils/ui.util";

const OTPField = (props: IOTPField) => {
  const {
    length = 6,
    value,
    onChange,
    error,
    helperText,
    borderRadius = "8px",
    color = "#1d79ff",
    disabled = false,
  } = props;

  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (value) {
      const split = value.split("").slice(0, length);
      const padded = split.concat(Array(length - split.length).fill(""));
      setOtp(padded);
    }
  }, [value, length]);

  const handleChange = (index: number, inputValue: string) => {
    if (disabled) return;
    if (!/^\d*$/.test(inputValue)) return;

    const newOtp = [...otp];
    newOtp[index] = inputValue;
    setOtp(newOtp);
    onChange(newOtp.join(""));

    if (inputValue && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      onChange(newOtp.join(""));
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text");
    const digits = pastedData.replace(/\D/g, "").slice(0, length);
    const newOtp = digits.split("").concat(Array(length - digits.length).fill(""));
    setOtp(newOtp);
    onChange(newOtp.join(""));
    if (digits.length > 0) inputs.current[Math.min(digits.length - 1, length - 1)]?.focus();
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} alignItems="center">
      <Box display="flex" gap={1} justifyContent="center">
        {Array.from({ length }).map((_, index) => (
          <TextField
            key={index}
            inputRef={(el) => (inputs.current[index] = el)}
            value={otp[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e as React.KeyboardEvent<HTMLInputElement>, index)}
            onPaste={handlePaste}
            disabled={disabled}
            error={error}
            inputProps={{
              maxLength: 1,
              type: "text",
              inputMode: "numeric",
              pattern: "[0-9]*",
              style: {
                textAlign: "center",
                fontSize: "1.25rem",
                width: "3rem",
                height: "3rem",
                borderRadius,
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius,
                "&.Mui-focused fieldset": {
                  borderColor: color,
                },
                "&.Mui-disabled": {
                  backgroundColor: "rgba(0, 0, 0, 0.12)",
                },
              },
            }}
          />
        ))}
      </Box>

      {helperText && (
        <Typography variant="caption" color={error ? "error" : "textSecondary"}>
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default OTPField;
