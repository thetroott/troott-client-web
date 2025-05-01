// pages/LoginForm.tsx
import React, { useState } from "react";

import { Box, Button, Typography } from "@mui/material";
import PasswordField from "../../components/ui/PasswordField";

const LoginForm = () => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Password:", password);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 8, px: 2 }}
    >
      <Typography variant="h6" gutterBottom>
        Sign In
      </Typography>

      <PasswordField
        label="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={password.length < 6}
        helperText={password.length < 6 ? "Password must be at least 6 characters" : ""}
        autoComplete="current-password"
        fullWidth
        color="#1d79ff"
        borderRadius="8px"
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 3, backgroundColor: "#1d79ff" }}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
