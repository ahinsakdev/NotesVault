import type { AuthenticatedUser } from "../types/authentication.types";

export function getAuthenticatedUserName(user: AuthenticatedUser) {
  return `${user.firstName} ${user.lastName}`.trim();
}

export function getAuthenticatedUserInitials(user: AuthenticatedUser) {
  const firstInitial = user.firstName.trim().charAt(0);
  const lastInitial = user.lastName.trim().charAt(0);

  return `${firstInitial}${lastInitial}`.toUpperCase() || "U";
}
