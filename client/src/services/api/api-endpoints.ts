export const API_ENDPOINTS = {
  auth: {
    signup: "/api/v1/auth/signup",
    login: "/api/v1/auth/login",
    me: "/api/v1/auth/me",
    logout: "/api/v1/auth/logout",
    forgotPassword: "/api/v1/auth/forgot-password",
    resetPassword: "/api/v1/auth/reset-password",
  },
} as const;
