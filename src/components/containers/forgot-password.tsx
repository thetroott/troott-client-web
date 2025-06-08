"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail } from "lucide-react"

interface FormErrors {
  email?: string
}

export function ForgotPasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [touched, setTouched] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateEmail = (email: string): string | undefined => {
    if (!email) return "Email is required"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return "Please enter a valid email address"
    return undefined
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)

    const emailError = validateEmail(email)
    if (emailError) {
      setErrors({ email: emailError })
      return
    }

    setErrors({})
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Password reset requested for:", email)
      setIsSuccess(true)
    } catch (error) {
      console.error("Failed to send reset email:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className={cn("flex flex-col gap-6 text-center", className)}>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Check your email</h2>
          <p className="text-sm text-muted-foreground">
            We've sent a password reset link to <span className="font-medium">{email}</span>
          </p>
        </div>
        <Button onClick={() => setIsSuccess(false)} variant="outline">
          Back to login
        </Button>
      </div>
    )
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (errors.email) setErrors({})
            }}
            className={cn("pl-10", errors.email && touched && "border-destructive focus-visible:ring-destructive")}
            aria-invalid={errors.email && touched ? "true" : "false"}
            aria-describedby={errors.email && touched ? "email-error" : undefined}
          />
        </div>
        {errors.email && touched && (
          <p id="email-error" className="text-sm text-destructive" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send reset link"}
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
