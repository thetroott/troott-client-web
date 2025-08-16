import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import AuthService from "@/services/auth/auth-service";
import { handleMutationError, handleUserNavigation } from "@/utils/helpers.util";
import type { IAPIResponse } from "@/utils/interfaces.util";
import useGoTo from "@/hooks/app/useGoTo";
import { useRegisterStore } from "@/store/auth/register-store";



export const useAuth = () => {

   const { goTo } = useGoTo()
   const { reset } = useRegisterStore()

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

      updateStep("otp");
      startResendCountdown();
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    },
    onError: handleMutationError
  });

  const verifyOtpMutation = useMutation({
    
    mutationFn: AuthService.verifyOtp,
    
    onSuccess: (data: IAPIResponse) => {
      toast.success(data.message);
      updateStep("success")
    },
    onError: handleMutationError
  });

  const resendOtpMutation = useMutation({
    
    mutationFn: AuthService.resendOtp,
    
    onSuccess: () => {
      setFormData((prev) => ({ ...prev, otp: Array(6).fill("") }));
      setErrors({});
      setTouched((prev) => ({ ...prev, otp: false }));
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
