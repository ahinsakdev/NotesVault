import { Navigate, Outlet } from "react-router";

import { ROUTES } from "@/app/routes";
import { RouteLoadingFallback } from "@/components/ui/route-loading-fallback";
import { useAuthenticationSession } from "@/features/authentication/hooks/use-authentication-session";

export function GuestRoute() {
  const {
    data: session,
    isPending,
  } = useAuthenticationSession();

  if (isPending) {
    return <RouteLoadingFallback />;
  }

  if (session) {
    return <Navigate replace to={ROUTES.dashboard} />;
  }

  return <Outlet />;
}
