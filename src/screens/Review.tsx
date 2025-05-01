import { useState } from "react";
import TextArea from "../ui/components/input/TextAreaField";
import TextInput from "../ui/components/input/TextInput";
import Review from "../ui/components/Review";
import PasswordField from "../ui/components/input/PasswordField";
import { Box, Button, Typography } from "@mui/material";
import TextAreaField from "../ui/components/input/TextAreaField";
import EmailField from "../ui/components/input/EmailField";


const Preview = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Email:", email);
    console.log("Submitted Password:", password);
  };

  const isEmailValid = email.includes("@") && email.includes(".");

  return (
   <>
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 8, px: 2 }}
    >
      <Typography variant="h6" gutterBottom>
        Sign In
      </Typography>

      <TextAreaField
        label="Message"
        placeholder="Write your feedback here..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        error={feedback.length < 10}
        helperText={feedback.length < 10 ? "Minimum 10 characters required." : ""}
        color="#1d79ff"
        borderRadius="8px"
      />

      <EmailField
        label="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!isEmailValid && email.length > 0}
        helperText={
          !isEmailValid && email.length > 0
            ? "Enter a valid email address"
            : ""
        }
        autoComplete="email"
        fullWidth
        color="#1d79ff"
        borderRadius="8px"
        autoFocus
        sx={{ mb: 2 }}
      />

      <PasswordField
        label="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={password.length < 6}
        helperText={password.length > 0 && password.length < 6 ? "Password must be at least 6 characters" : ""}
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
   </>
  );
};

export default Preview;
