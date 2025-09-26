import type {
    activatePayload,
    changePasswordPayload,
    
    IforgotPassword,
    
    loginPayload,
    logoutPayload,
    registerUserPayload,
    resendOtpPayload,
    resetPasswordPayload,
    verifyOtpPayload,
  } from "../utils/payload.util";
  
  class Auth {
    client;
    secondaryClient;


    /**
     * Creates an instance of Auth service
     * @param {any} client - Primary HTTP client for auth requests
     * @param {any} [secondaryClient] - Secondary HTTP client for specific auth operations
     */
    constructor(client: any, secondaryClient?: any) {
      this.client = client;
      this.secondaryClient = secondaryClient;
    }
  
    /**
     * Registers a new user
     * @param {registerUserPayload} payload - User registration data
     * @returns {Promise<any>} Registration response
     */
    register(payload: registerUserPayload) {
      return this.client.post("/auth/register", payload);
    }
  
    /**
     * Authenticates a user
     * @param {loginPayload} payload - User login credentials
     * @returns {Promise<any>} Login response with auth tokens
     */
    login(payload: loginPayload) {
      return this.client.post("/auth/login", payload);
    }
  
    /**
     * Verifies OTP code
     * @param {verifyOtpPayload} payload - OTP verification data
     * @returns {Promise<any>} OTP verification response
     */
    verifyOTP(payload: verifyOtpPayload) {
      return this.client.post("/auth/verify-otp", payload);
    }
  
    /**
     * Resends OTP code
     * @param {resendOtpPayload} payload - Data for OTP resend request
     * @returns {Promise<any>} OTP resend response
     */
    resendOTP(payload: resendOtpPayload) {
      return this.client.post("/auth/resend-otp", payload);
    }
  
    /**
     * Activates a user account
     * @param {activatePayload} payload - Account activation data
     * @returns {Promise<any>} Account activation response
     */
    activateUser(payload: activatePayload) {
      return this.client.post("/auth/activate", payload);
    }
  
    /**
     * Retrieves authentication token
     * @param {any} payload - Token request data
     * @returns {Promise<any>} Token response
     */
    getToken(payload: any) {
      return this.client.post("/auth/token", payload);
    }
  
    /**
     * Changes user password
     * @param {changePasswordPayload} payload - Password change data
     * @returns {Promise<any>} Password change response
     */
    changePassword(payload: changePasswordPayload) {
      return this.secondaryClient.post("/auth/change-password", payload);
    }
  
    /**
     * Logs out a user
     * @param {logoutPayload} payload - Logout request data
     * @returns {Promise<any>} Logout response
     */
    logout(payload: logoutPayload) {
      return this.client.post("/auth/logout", payload);
    }
  
    /**
     * Initiates forgot password process
     * @param {forgotPasswordPayload} payload - Forgot password request data
     * @returns {Promise<any>} Forgot password response
     */
    forgotPassword(payload: IforgotPassword) {
      return this.client.post("/auth/forgot-password", payload);
    }
  
    /**
     * Resets user password
     * @param {resetPasswordPayload} payload - Password reset data
     * @returns {Promise<any>} Password reset response
     */
    resetPassword(payload: resetPasswordPayload) {
      return this.secondaryClient.post("/auth/reset-password", payload);
    }
  }
  
  export default Auth;
  