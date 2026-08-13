import { API_ENDPOINTS } from "@/services/api/api-endpoints";
import { apiClient } from "@/services/api/api-client";

import type {
  AuthenticatedUser,
  ForgotPasswordRequest,
  LoginRequest,
  ResetPasswordRequest,
  SignupRequest,
  UpdateProfileRequest,
  ChangePasswordRequest,
} from "../types/authentication.types";

type AuthenticationResponse = {
  user: AuthenticatedUser;
};

type MessageResponse = {
  message: string;
};

export async function login(
  request: LoginRequest,
): Promise<AuthenticationResponse> {
  const response = await apiClient.post<AuthenticationResponse>(
    API_ENDPOINTS.auth.login,
    request,
  );

  return response.data;
}

export async function signup(
  request: SignupRequest,
): Promise<AuthenticationResponse> {
  const response = await apiClient.post<AuthenticationResponse>(
    API_ENDPOINTS.auth.signup,
    request,
  );

  return response.data;
}

export async function getCurrentUser(): Promise<AuthenticationResponse> {
  const response = await apiClient.get<AuthenticationResponse>(
    API_ENDPOINTS.auth.me,
  );

  return response.data;
}

export async function logout(): Promise<void> {
  await apiClient.post(API_ENDPOINTS.auth.logout);
}

export async function forgotPassword(
  request: ForgotPasswordRequest,
): Promise<MessageResponse> {
  const response = await apiClient.post<MessageResponse>(
    API_ENDPOINTS.auth.forgotPassword,
    request,
  );

  return response.data;
}

export async function resetPassword(
  request: ResetPasswordRequest,
): Promise<MessageResponse> {
  const response = await apiClient.post<MessageResponse>(
    API_ENDPOINTS.auth.resetPassword,
    request,
  );

  return response.data;
}

export async function updateProfile(
  request: UpdateProfileRequest,
): Promise<AuthenticationResponse> {
  const response = await apiClient.patch<AuthenticationResponse>(
    API_ENDPOINTS.auth.profile,
    request,
  );

  return response.data;
}

export async function changePassword(
  request: ChangePasswordRequest,
): Promise<MessageResponse> {
  const response = await apiClient.patch<MessageResponse>(
    API_ENDPOINTS.auth.password,
    request,
  );

  return response.data;
}
