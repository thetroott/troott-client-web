/**
 *
 */
export const usePasswordUtils = () => {
  const validateName = (name: string, fieldName: string) => {
    if (!name) return `${fieldName} is required`;
    if (name.length < 2) return `${fieldName} must be at least 2 characters`;
    return undefined;
  };

  const validateEmail = (email: string) => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
  };

  const validatePassword = (password: string) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
  };

  const calculateStrength = (password: string) => {
    let score = 0;
    const feedback: string[] = [];

    if (password.length >= 8) score++;
    else feedback.push("At least 8 characters");
    if (/[a-z]/.test(password)) score++;
    else feedback.push("One lowercase letter");
    if (/[A-Z]/.test(password)) score++;
    else feedback.push("One uppercase letter");
    if (/[0-9]/.test(password)) score++;
    else feedback.push("One number");
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    else feedback.push("One special character");

    const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    return { score, feedback, label: labels[Math.min(score, 4)] };
  };

  return { validateName, validateEmail, validatePassword, calculateStrength };
};
