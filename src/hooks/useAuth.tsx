import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import AuthService from "@/services/auth/auth-service";
import { handleMutationError, handleUserNavigation } from "@/utils/helpers.util";
import type { IAPIResponse } from "@/utils/interfaces.util";



export const useAuth = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    
    mutationFn: AuthService.login,
    
    onSuccess: (data: IAPIResponse) => {
      toast.success(data.message);
      
      handleUserNavigation(
        () => navigate("/onboarding"),
        () => navigate("/dashboard")
      );
    },
    onError: handleMutationError,

  });



  return { loginMutation };
};
