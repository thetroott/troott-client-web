import { useState } from "react";
import TextArea from "../ui/components/input/TextAreaField";
import TextInput from "../ui/components/input/TextInput";
import Review from "../ui/components/Review";
import PasswordField from "../ui/components/input/PasswordField";
import { Box, Button, Typography } from "@mui/material";
import TextAreaField from "../ui/components/input/TextAreaField";
import EmailField from "../ui/components/input/EmailField";
import RadioField from "../ui/components/input/RadioField";
import VCheckbox from "../ui/components/input/CheckBoxField";
import OTPField from "../ui/components/input/OTPField";
import SelectField from "../ui/components/input/SelectField";

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

  const options = [
    { value: "frontend", label: "Frontend Developer" },
    { value: "backend", label: "Backend Developer" },
    { value: "fullstack", label: "Fullstack Developer" },
  ];

  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [gender, setGender] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [otp, setOtp] = useState("");

  const handleOTPSubmit = () => {
    console.log("OTP Entered:", otp);
  };

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
        <SelectField
          label="Select Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          options={options}
          helperText="Pick your role"
          fullWidth
        />
        ;
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
        {/* 
        <TextAreaField
          label="Message"
          placeholder="Write your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          error={feedback.length < 10}
          helperText={
            feedback.length < 10 ? "Minimum 10 characters required." : ""
          }
          color="#1d79ff"
          borderRadius="8px"
        /> */}
        {/* 
        <PasswordField
          label="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={password.length < 6}
          helperText={
            password.length > 0 && password.length < 6
              ? "Password must be at least 6 characters"
              : ""
          }
          autoComplete="current-password"
          fullWidth
          color="#1d79ff"
          borderRadius="8px"
        /> */}
        {/* 
        <RadioField
          label="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" },
          ]}
          error={!gender}
          helperText={!gender ? "Please select a gender." : ""}
        />

        <VCheckbox
          label="I accept the Terms and Conditions"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          error={!termsAccepted}
          helperText={
            !termsAccepted ? "You must accept the terms to proceed." : ""
          }
        /> */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, backgroundColor: "#1d79ff" }}
        >
          Login
        </Button>
        {/* <form onSubmit={(e) => { e.preventDefault(); handleOTPSubmit(); }}>
      <OTPField
        value={otp}
        onChange={setOtp}
        error={otp.length < 6}
        helperText={otp.length < 6 ? "Please enter all 6 digits" : ""}
      />

      <button type="submit" disabled={otp.length < 6}>
        Verify OTP
      </button>
    </form> */}
      </Box>
    </>
  );
};

export default Preview;
