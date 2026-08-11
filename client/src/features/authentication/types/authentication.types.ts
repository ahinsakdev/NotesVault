export type AuthenticatedUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
};

export type AuthenticationSession = {
  user: AuthenticatedUser;
};

export type LoginRequest = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type SignupRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  token: string;
  password: string;
};
