import React, { useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { Container, Row, Col } from 'react-bootstrap'; 
import EmailField from "../../components/ui/input/EmailField";
import PasswordField from "../../components/ui/input/PasswordField";
import ThemeToggleSwitch from "../../components/ui/Button/Toggle";

const Login = () => {
  const theme = useTheme(); 
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Email:", email);
    console.log("Submitted Password:", password);
  };

  const isEmailValid = email.includes("@") && email.includes(".");

  // Style objects for conversion from sx prop
  const formColumnStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: theme.spacing(8), 
    paddingRight: theme.spacing(8),
    backgroundColor: theme.palette.background.default, 
    minHeight: "100vh", 
  };

  const imageColumnStyle: React.CSSProperties = {
    backgroundImage: `url("/images/assets/login-side.png")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh", 
  };

  return (
    // Use Container fluid to span full width, Row to contain columns
    <Container fluid style={{ padding: 0 }}>
      <Row style={{ minHeight: "100vh", margin: 0 }}> 
        
        <Col
          xs={12}
          md={6}
          style={formColumnStyle}
          className="d-flex flex-column justify-content-center" // Use Bootstrap classes for flex alignment
        >
          <ThemeToggleSwitch/> {/* Place toggle switch inside the column */}
          <Box sx={{ width: "100%", maxWidth: 480, mx: "auto" }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
              Welcome Back
            </Typography>

            <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 4 }}>
              Please enter your login details below.
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ maxWidth: 400, mx: "auto", mt: 8, px: 2 }} 
            >
              <Typography variant="h6" gutterBottom>
                Sign In
              </Typography>

              {/* EmailField and PasswordField remain the same */}
              <EmailField
                label="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!isEmailValid && email.length > 0}
                helperText={
                  !isEmailValid && email.length > 0 ? "Enter a valid email address" : ""
                }
                autoComplete="email"
                fullWidth
                autoFocus
                sx={{ mb: 2 }}
              />

              <PasswordField
                label="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={password.length < 6}
                helperText={
                  password.length > 0 && password.length < 6 ? "Password must be at least 6 characters" : ""
                }
                autoComplete="current-password"

                sx={{ mb: 2 }} // Add margin if needed
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
          </Box>
        </Col>

        {/* Right Side: Image */}
        <Col
          xs={12}
          md={6}
          style={imageColumnStyle}
          className="d-none d-md-block"
        />
      </Row>
    </Container>
  );
};

export default Login;