"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Lock } from "lucide-react"

interface FormErrors {
  password?: string
  confirmPassword?: string
}

export function ResetPasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
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
    } catch (error) {
      console.error("Failed to reset password:", error)
    } finally {
      setIsSubmitting(false)
    }
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
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, password: e.target.value }))
              if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }))
            }}
            className={cn(
              "pl-10 pr-10",
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
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))
              if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }))
            }}
            className={cn(
              "pl-10 pr-10",
              errors.confirmPassword && touched.confirmPassword && "border-destructive focus-visible:ring-destructive",
            )}
            aria-invalid={errors.confirmPassword && touched.confirmPassword ? "true" : "false"}
            aria-describedby={errors.confirmPassword && touched.confirmPassword ? "confirm-password-error" : undefined}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
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

      <Button type="submit" className="w-full" disabled={isSubmitting}>
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
