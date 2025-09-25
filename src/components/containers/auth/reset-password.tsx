import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Lock } from "lucide-react"
import type { IForm } from "@/utils/interfaces.util"

interface FormErrors {
  password?: string
  confirmPassword?: string
}

function ResetPasswordForm(data: IForm) {
  
  const { className, onSuccess, ...props } = data

  const [step, setStep] = useState<"form" | "success">("form")
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [touched, setTouched] = useState({
    password: false,
    confirmPassword: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: [] as string[],
    label: "Very Weak",
  })

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

  const validatePassword = (password: string): string | undefined => {
    if (!password) return "Password is required"
    if (password.length < 8) return "Password must be at least 8 characters"
    return undefined
  }

  const validateConfirmPassword = (password: string, confirmPassword: string): string | undefined => {
    if (!confirmPassword) return "Please confirm your password"
    if (password !== confirmPassword) return "Passwords do not match"
    return undefined
  }

  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData((prev) => ({ ...prev, password: value }))
    setPasswordStrength(calculatePasswordStrength(value))

    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }))
    if (errors.confirmPassword && formData.confirmPassword) {
      const confirmError = validateConfirmPassword(value, formData.confirmPassword)
      if (!confirmError) setErrors((prev) => ({ ...prev, confirmPassword: undefined }))
    }
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData((prev) => ({ ...prev, confirmPassword: value }))

    if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }))
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ password: true, confirmPassword: true })

    const passwordError = validatePassword(formData.password)
    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword)

    const newErrors: FormErrors = {}
    if (passwordError) newErrors.password = passwordError
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Password reset successful")
      // Redirect to login or show success message
      setStep("success")
      onSuccess?.()
    } catch (error) {
      console.error("Failed to reset password:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  
  if (step === "success") {
    return (
      <div className={cn("flex flex-col gap-6 text-center", className)}>
        <div className="flex flex-col gap-2">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold">Password updated!</h2>
          <p className="text-sm text-muted-foreground">
            Your password has been successfully updated. You can now sign in with your new password.
          </p>
        </div>

        <Button onClick={() => (window.location.href = "/login")} className="w-full">
          Continue to login
        </Button>
      </div>
    )
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <div className="grid gap-2">
        <Label htmlFor="password">New Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handlePasswordChange}
            className={cn(
              "pl-10 pr-10 h-12",
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

      <div className="grid gap-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={cn(
              "pl-10 pr-10 h-12",
              errors.confirmPassword && touched.confirmPassword && "border-destructive focus-visible:ring-destructive",
            )}
            aria-invalid={errors.confirmPassword && touched.confirmPassword ? "true" : "false"}
            aria-describedby={errors.confirmPassword && touched.confirmPassword ? "confirm-password-error" : undefined}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute  right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
        {errors.confirmPassword && touched.confirmPassword && (
          <p id="confirm-password-error" className="text-sm text-destructive" role="alert">
            {errors.confirmPassword}
          </p>
        )}
      </div>

      <Button type="submit" className="w-ful l h-12" disabled={isSubmitting}>
        {isSubmitting ? "Resetting..." : "Reset password"}
      </Button>

      <div className="text-center text-sm">
        Remember your password?{" "}
        <a href="/login" className="underline underline-offset-4">
          Back to login
        </a>
      </div>
    </form>
  )
}

export default ResetPasswordForm