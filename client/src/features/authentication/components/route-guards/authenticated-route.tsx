import { Navigate, Outlet, useLocation } from "react-router";

import { ROUTES } from "@/app/routes";
import { RouteLoadingFallback } from "@/components/ui/route-loading-fallback";
import { useAuthenticationSession } from "@/features/authentication/hooks/use-authentication-session";

export function AuthenticatedRoute() {
  const location = useLocation();

  const {
    data: session,
    isError,
    isPending,
  } = useAuthenticationSession();

  if (isPending) {
    return <RouteLoadingFallback />;
  }

  if (isError || !session) {
    return (
      <Navigate
        replace
        state={{ from: location }}
        to={ROUTES.login}
      />
    );
  }

  return <Outlet />;
}
