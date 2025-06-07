"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
}

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: [] as string[],
    label: "Very Weak",
  })

  const validateFirstName = (firstName: string): string | undefined => {
    if (!firstName) return "First name is required"
    if (firstName.length < 2) return "First name must be at least 2 characters"
    return undefined
  }

  const validateLastName = (lastName: string): string | undefined => {
    if (!lastName) return "Last name is required"
    if (lastName.length < 2) return "Last name must be at least 2 characters"
    return undefined
  }

  const validateEmail = (email: string): string | undefined => {
    if (!email) return "Email is required"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return "Please enter a valid email address"
    return undefined
  }

  const validatePassword = (password: string): string | undefined => {
    if (!password) return "Password is required"
    if (password.length < 6) return "Password must be at least 6 characters"
    return undefined
  }

  const calculatePasswordStrength = (password: string) => {
    let score = 0
    const feedback: string[] = []

    if (password.length >= 8) {
      score += 1
    } else {
      feedback.push("At least 8 characters")
    }

    if (/[a-z]/.test(password)) {
      score += 1
    } else {
      feedback.push("One lowercase letter")
    }

    if (/[A-Z]/.test(password)) {
      score += 1
    } else {
      feedback.push("One uppercase letter")
    }

    if (/[0-9]/.test(password)) {
      score += 1
    } else {
      feedback.push("One number")
    }

    if (/[^a-zA-Z0-9]/.test(password)) {
      score += 1
    } else {
      feedback.push("One special character")
    }

    const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"]
    const label = labels[Math.min(score, 4)]

    return { score, feedback, label }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    const firstNameError = validateFirstName(formData.firstName)
    const lastNameError = validateLastName(formData.lastName)
    const emailError = validateEmail(formData.email)
    const passwordError = validatePassword(formData.password)

    if (firstNameError) newErrors.firstName = firstNameError
    if (lastNameError) newErrors.lastName = lastNameError
    if (emailError) newErrors.email = emailError
    if (passwordError) newErrors.password = passwordError

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Calculate password strength for password field
    if (field === "password") {
      setPasswordStrength(calculatePasswordStrength(value))
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleBlur = (field: keyof typeof formData) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }))

    // Validate field on blur
    const newErrors = { ...errors }
    if (field === "firstName") {
      const firstNameError = validateFirstName(formData.firstName)
      if (firstNameError) newErrors.firstName = firstNameError
    } else if (field === "lastName") {
      const lastNameError = validateLastName(formData.lastName)
      if (lastNameError) newErrors.lastName = lastNameError
    } else if (field === "email") {
      const emailError = validateEmail(formData.email)
      if (emailError) newErrors.email = emailError
    } else if (field === "password") {
      const passwordError = validatePassword(formData.password)
      if (passwordError) newErrors.password = passwordError
    }
    setErrors(newErrors)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Mark all fields as touched
    setTouched({ firstName: true, lastName: true, email: true, password: true })

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Login attempt:", formData)
      // Handle successful login here
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">Enter your email below to login to your account</p>
      </div>
      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="John"
              value={formData.firstName}
              onChange={handleInputChange("firstName")}
              onBlur={handleBlur("firstName")}
              className={cn(
                errors.firstName && touched.firstName && "border-destructive focus-visible:ring-destructive",
              )}
              aria-invalid={errors.firstName && touched.firstName ? "true" : "false"}
              aria-describedby={errors.firstName && touched.firstName ? "firstName-error" : undefined}
            />
            {errors.firstName && touched.firstName && (
              <p id="firstName-error" className="text-sm text-destructive" role="alert">
                {errors.firstName}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleInputChange("lastName")}
              onBlur={handleBlur("lastName")}
              className={cn(errors.lastName && touched.lastName && "border-destructive focus-visible:ring-destructive")}
              aria-invalid={errors.lastName && touched.lastName ? "true" : "false"}
              aria-describedby={errors.lastName && touched.lastName ? "lastName-error" : undefined}
            />
            {errors.lastName && touched.lastName && (
              <p id="lastName-error" className="text-sm text-destructive" role="alert">
                {errors.lastName}
              </p>
            )}
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={formData.email}
            onChange={handleInputChange("email")}
            onBlur={handleBlur("email")}
            className={cn(errors.email && touched.email && "border-destructive focus-visible:ring-destructive")}
            aria-invalid={errors.email && touched.email ? "true" : "false"}
            aria-describedby={errors.email && touched.email ? "email-error" : undefined}
          />
          {errors.email && touched.email && (
            <p id="email-error" className="text-sm text-destructive" role="alert">
              {errors.email}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange("password")}
              onBlur={handleBlur("password")}
              className={cn(
                "pr-10",
                errors.password && touched.password && "border-destructive focus-visible:ring-destructive",
              )}
              aria-invalid={errors.password && touched.password ? "true" : "false"}
              aria-describedby={errors.password && touched.password ? "password-error" : undefined}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>

          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full transition-all duration-300 rounded-full",
                      passwordStrength.score === 0 && "w-0",
                      passwordStrength.score === 1 && "w-1/5 bg-red-500",
                      passwordStrength.score === 2 && "w-2/5 bg-orange-500",
                      passwordStrength.score === 3 && "w-3/5 bg-yellow-500",
                      passwordStrength.score === 4 && "w-4/5 bg-blue-500",
                      passwordStrength.score === 5 && "w-full bg-green-500",
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "text-xs font-medium",
                    passwordStrength.score <= 1 && "text-red-500",
                    passwordStrength.score === 2 && "text-orange-500",
                    passwordStrength.score === 3 && "text-yellow-600",
                    passwordStrength.score === 4 && "text-blue-500",
                    passwordStrength.score === 5 && "text-green-500",
                  )}
                >
                  {passwordStrength.label}
                </span>
              </div>

              {passwordStrength.feedback.length > 0 && (
                <div className="text-xs text-muted-foreground">
                  <p className="mb-1">Password needs:</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    {passwordStrength.feedback.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {errors.password && touched.password && (
            <p id="password-error" className="text-sm text-destructive" role="alert">
              {errors.password}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Login"}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
        <Button variant="outline" className="w-full" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          Login with GitHub
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  )
}
