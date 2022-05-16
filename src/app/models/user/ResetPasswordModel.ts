export interface ResetPasswordModel {
  resetPasswordToken: string;
  otp: string;
  userAccountID: string;
  password: string;
}
