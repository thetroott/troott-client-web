
import { useRef, useState } from "react";
import { cn } from "@/lib/utils"
import type { IForm, IOtpFormErrors } from "@/utils/interface.util"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner";

const OtpForm = (data: IForm) => {
    const { className, email, onSuccess, onResend, ...props } = data;

    const [otp, setOtp] = useState(["", "", "", "", "", ""])
    const [errors, setErrors] = useState<IOtpFormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [touched, setTouched] = useState(false)
    const [resendCountdown, setResendCountdown] = useState(0)
  
    const otpRefs = useRef<(HTMLInputElement | null)[]>([])
  
    const validateOTP = (otp: string[]): string | undefined => {
      const otpString = otp.join("")
      if (!otpString) return "OTP is required"
      if (otpString.length !== 6) return "Please enter all 6 digits"
      if (!/^\d+$/.test(otpString)) return "OTP must contain only numbers"
      return undefined
    }

    
  const maskEmail = (email: string): string => {
    if (!email) return ""
    const [localPart, domain] = email.split("@")
    if (localPart.length <= 2) return email
    const maskedLocal = localPart[0] + "*".repeat(localPart.length - 2) + localPart[localPart.length - 1]
    return `${maskedLocal}@${domain}`
  }

  const startResendCountdown = () => {
    setResendCountdown(60)
    const timer = setInterval(() => {
      setResendCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }
  

  
  const handleOTPChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Clear error when user starts typing
    if (errors.otp) {
      setErrors({})
    }

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all fields are filled
    if (value && index === 5) {
      const fullOtp = [...newOtp]
      if (fullOtp.every((digit) => digit !== "")) {
        // Use setTimeout to ensure state is updated and avoid validation errors
        setTimeout(() => {
          setTouched(true)

          const otpError = validateOTP(fullOtp)
          if (!otpError) {
            setErrors({})
            setIsSubmitting(true)

            // Simulate API call to verify OTP
            setTimeout(async () => {
              try {
                await new Promise((resolve) => setTimeout(resolve, 2000))
                console.log("OTP verified:", fullOtp.join(""))
                onSuccess?.()
              } catch (error) {
                console.error("OTP verification failed:", error)
              } finally {
                setIsSubmitting(false)
              }
            }, 0)
          } else {
            setErrors({ otp: otpError })
          }
        }, 100)
      }
    }
  }
  
    const handleOTPKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      // Handle backspace
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        otpRefs.current[index - 1]?.focus()
      }
    }
  
    const handleOTPPaste = (e: React.ClipboardEvent) => {
      e.preventDefault()
      const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
  
      if (pastedData.length === 6) {
        const newOtp = pastedData.split("")
        setOtp(newOtp)
  
        // Focus the last input
        otpRefs.current[5]?.focus()
  
        // Auto-submit after paste
        setTimeout(() => {
          setTouched(true)
  
          const otpError = validateOTP(newOtp)
          if (!otpError) {
            setErrors({})
            setIsSubmitting(true)
  
            // Simulate API call to verify OTP
            setTimeout(async () => {
              try {
                await new Promise((resolve) => setTimeout(resolve, 2000))
                console.log("OTP verified:", newOtp.join(""))
                onSuccess?.()
              } catch (error) {
                console.error("OTP verification failed:", error)
              } finally {
                setIsSubmitting(false)
              }
            }, 0)
          } else {
            setErrors({ otp: otpError })
          }
        }, 100)
      }
    }
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
  
      setTouched(true)
  
      const otpError = validateOTP(otp)
      if (otpError) {
        setErrors({ otp: otpError })
        return
      }
  
      setErrors({})
  
      setIsSubmitting(true)
  
      try {
        // Simulate API call to verify OTP
        await new Promise((resolve) => setTimeout(resolve, 2000))
        console.log("Verifying OTP:", otp.join(""))
  
        // Handle successful verification here
        toast.success("OTP verified successfully!")
      } catch (error) {
        console.error("OTP verification failed:", error)
        
        toast.error("Verification failed. Please check your code and try again.")
      } finally {
        setIsSubmitting(false)
      }
    }
  
    const handleResendOTP = async () => {
      setIsSubmitting(true)
  
      try {
        // Simulate API call to resend OTP
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log("Resending OTP")
  
        // Clear current OTP
        setOtp(["", "", "", "", "", ""])
        setErrors({})
        setTouched(false)
        startResendCountdown()
        otpRefs.current[0]?.focus()
        onResend?.()
      } catch (error) {
        console.error("Failed to resend OTP:", error)
      } finally {
        setIsSubmitting(false)
      }
    }
  
    return (
      <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>

        <div className="grid gap-6">
        {email && (
          <div className="text-center text-sm text-muted-foreground">
            <p>We sent a verification code to</p>
            <p className="font-medium text-foreground">{maskEmail(email)}</p>
          </div>
        )}
          <div className="grid gap-2">
            <Label htmlFor="otp-0">Verification Code</Label>
            <div className="flex gap-2 justify-center">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  ref={(el) => {
                    otpRefs.current[index] = el;
                    return undefined;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  onKeyDown={(e) => handleOTPKeyDown(index, e)}
                  onPaste={index === 0 ? handleOTPPaste : undefined}
                  className={cn(
                    "w-12 h-12 text-center text-lg font-semibold",
                    errors.otp && touched && "border-destructive focus-visible:ring-destructive",
                  )}
                  aria-invalid={errors.otp && touched ? "true" : "false"}
                  aria-describedby={errors.otp && touched ? "otp-error" : undefined}
                />
              ))}
            </div>
            {errors.otp && touched && (
              <p id="otp-error" className="text-sm text-destructive text-center" role="alert">
                {errors.otp}
              </p>
            )}
          </div>
  
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Didn't receive the code?{" "}
              {resendCountdown > 0 ? (
              <span>Resend in {resendCountdown}s</span>
            ) : (
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={isSubmitting}
                className="text-primary underline underline-offset-4 hover:no-underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Resend code
              </button>
            )}
            </p>
          </div>
  
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Verifying..." : "Verify code"}
          </Button>
        </div>
      </form>
    )
  }
  
  export default OtpForm