import apiCall from "@/api/config";
import storage from "@/utils/storage.util";
import type { IAPIResponse } from "@/utils/interfaces.util";
import type {
  ForgotPasswordDTO,
  LoginDTO,
  ResendOtpDTO,
  VerifyOtpDTO,
} from "@/dtos/auth.dto";

/**
 * AuthService
 * Handles authentication-related API calls and client-side token storage.
 */
const AuthService = {
  /**
   * Login a user and store token/id in localStorage
   * @param payload Login credentials
   * @returns IAPIResponse from server
   */
  login: async (payload: LoginDTO): Promise<IAPIResponse> => {
    const res = await apiCall.auth.login(payload);

    if (res?.data?.token && res?.data?.id) {
      storage.storeAuth(res.data.token, res.data.id); // persist token & user id
    }

    return res;
  },

  /**
   * Verify OTP code
   */
  verifyOtp: async (payload: VerifyOtpDTO): Promise<IAPIResponse> => {
    const res = await apiCall.auth.verifyOTP(payload);
    return res;
  },

  /**
   * Send OTP for password reset or verification
   */
  sendOtp: async (payload: ForgotPasswordDTO): Promise<IAPIResponse> => {
    const res = await apiCall.auth.forgotPassword(payload);
    return res;
  },

  /**
   * Resend OTP code
   */
  resendOtp: async (payload: ResendOtpDTO): Promise<IAPIResponse> => {
    const res = await apiCall.auth.resendOTP(payload);
    return res;
  },

  /**
   * Logout a user (clear local storage)
   * clears auth data
   * @param payload userId
   * @returns IAPIResponse from server
   * @goto redirects to login page.
   */
  Logout: async () => {
    await apiCall.auth.logout({ userId: storage.getUserID() });
    storage.clearAuth();

    window.location.href = "/login";
  },
};

export default AuthService;
