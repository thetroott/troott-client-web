import { UserType } from "./enums.util";

export interface RegisterUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType?: UserType;
}
export interface LoginDTO {
  email: string;
  password: string;
}

export interface ForgotPasswordDTO {
  email: string;
}
export interface VerifyOtpDTO {
  email: string;
  OTP: number;
}
export interface ActivateDTO {
  email: string;
  OTP: number;
}

export interface ResendOtpDTO {
  email: string;
  OTP: number;
}
export interface ResetPasswordDTO {
  email: string;
  newPassword: string;
}

export interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
}


export interface LogoutDTO {
  userId: string;
}

export interface editUserDTO {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;

  country?: string;
  phoneNumber?: string;
  phoneCode?: string;

  avatar?: string;
  dateOfBirth?: Date;
  gender?: string;
}
