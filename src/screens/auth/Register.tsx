import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../../api/config";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import EmailField from "../../components/ui/input/EmailField";
import PasswordField from "../../components/ui/input/PasswordField";
import ThemeToggleSwitch from "../../components/ui/Toggle";
import TextInputField from "../../components/ui/input/TextInputField";


const Register = () => {
  const theme = useTheme();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: (payload: any) => {
      return api.auth.register(payload);
    },
    onSuccess: () => {
      notification.success({
        message: "Registration Successful!",
        description: "Your account has been created successfully.",
      });
      setErrors({ email: "", password: "" });
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    },
    onError: (error: any) => {
      notification.error({
        message:
          error.response?.data?.errors?.[0] ||
          error.response?.data?.message ||
          "An error occurred during registration.",
        description: undefined,
      });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = form;
    let validationErrors = { email: "", password: "" };
    let isValid = true;

    setErrors({ email: "", password: "" });

    if (!firstName || !lastName || !email || !password) {
      notification.error({ message: "All fields are required." });
      isValid = false;
    }

    const isEmailValid = email.includes("@") && email.includes(".");
    if (email && !isEmailValid) {
      validationErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (password && password.length < 6) {
       validationErrors.password = "Password must be at least 6 characters.";
       isValid = false;
    }

    setErrors(validationErrors);

    if (isValid) {
      await signupMutation.mutate({ firstName, lastName, email, password });
    }
  };

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
    <Container fluid style={{ padding: 0 }}>
      <Row style={{ minHeight: "100vh", margin: 0 }}>
        <Col
          xs={12}
          md={6}
          style={formColumnStyle}
          className="d-flex flex-column justify-content-center"
        >
          <ThemeToggleSwitch />
          <Box sx={{ width: "100%", maxWidth: 480, mx: "auto" }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
               Create Account
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: theme.palette.text.secondary, mb: 4 }}
            >
              Please fill in the details below to register
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ maxWidth: 400, mx: "auto", mt: 4, px: 2 }}
            >

              <TextInputField
                label="First Name"
                
                value={form.firstName}
                onChange={ handleInputChange }
                helperText=""
                autoComplete="given-name"
                sx={{ mb: 2 }}
              />

              <TextInputField
                label="Last Name"
                value={form.lastName}
                onChange={ handleInputChange }
                helperText=""
                autoComplete="family-name"
                sx={{ mb: 2 }}
              />

              <EmailField
                label="Enter your email"
                name="email"
                value={form.email}
                onChange={ handleInputChange }
                error={!!errors.email}
                helperText={errors.email}
                autoComplete="email"
                fullWidth
                sx={{ mb: 2 }}
              />

              <PasswordField
                label="Enter your password"
                name="password"
                value={form.password}
                onChange={ handleInputChange }
                error={!!errors.password}
                helperText={errors.password}
                autoComplete="new-password"
                sx={{ mb: 2 }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, backgroundColor: "#1d79ff" }}
                disabled={signupMutation.isPending}
              >
               {signupMutation.isPending ? 'Registering...' : 'Register'}
              </Button>

              <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                Already have an account? <Link to="/login">Sign In</Link>
              </Typography>
            </Box>
          </Box>
        </Col>

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

export default Register;

        