import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import AuthService from "@/services/auth/auth-service";
import { handleMutationError, handleUserNavigation } from "@/utils/helpers.util";
import type { IAPIResponse } from "@/utils/interfaces.util";
import useGoTo from "@/hooks/app/useGoTo";
import { useRegisterStore } from "@/store/auth/register-store";
import { useForgotPasswordStore } from "@/store/auth/otp-store";
import { useRef } from "react";




export const useAuth = () => {

   const { goTo } = useGoTo()
   const { reset } = useRegisterStore()
   const {
    setFormData,
    setErrors,
    setTouched,
    setResendCountdown,
    setStep,
  } = useForgotPasswordStore();

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);


  const startResendCountdown = () => {
    let count = 60
    setResendCountdown(count);
    const timer = setInterval(() => {
      count -= 1;
      setResendCountdown(count)
      
      if (count <= 0) {
        clearInterval(timer)
      }
    }, 1000);
  };
  

   const registerMutation = useMutation({
    
    mutationFn: AuthService.register,

    onSuccess: (data: IAPIResponse) => {
      toast.success(data.message);
      reset()
      goTo("/verify-otp");
    },
    onError:handleMutationError
  });


  const activateMutation = useMutation({
    
    mutationFn: AuthService.activateUser,
    
    onSuccess: (data: IAPIResponse) => {
      toast.success(data.message);
      
      handleUserNavigation(
        () => goTo("/onboarding"),
        () => goTo("/dashboard")
      );
    },
    onError: handleMutationError,

  });


  const loginMutation = useMutation({
    
    mutationFn: AuthService.login,
    
    onSuccess: (data: IAPIResponse) => {
      toast.success(data.message);
      
      handleUserNavigation(
        () => goTo("/onboarding"),
        () => goTo("/dashboard")
      );
    },
    onError: handleMutationError,

  });



  const sendOtpMutation = useMutation({

    mutationFn: AuthService.sendOtp,

    onSuccess: (data: IAPIResponse) => {
      toast.success(data.message);

      setStep("otp");
      startResendCountdown();
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    },

    onError: handleMutationError
  });

  const verifyOtpMutation = useMutation({
    
    mutationFn: AuthService.verifyOtp,
    
    onSuccess: (data: IAPIResponse) => {
      toast.success(data.message);
      setStep("success")
    },
    
    onError: handleMutationError
  });

  const resendOtpMutation = useMutation({
    
    mutationFn: AuthService.resendOtp,
    
    onSuccess: () => {
      setFormData({otp: Array(6).fill("") });
      setErrors({});
      setTouched({otp: false });
      startResendCountdown();
      otpRefs.current[0]?.focus();
    },
    onError: handleMutationError
  });





  return { 
    registerMutation,
    activateMutation,
    loginMutation, 
    verifyOtpMutation,
    sendOtpMutation,
    resendOtpMutation,
  };
};
