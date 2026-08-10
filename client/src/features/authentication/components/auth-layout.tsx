import { Outlet } from "react-router";

import { AuthLogo } from "./auth-logo";
import { AuthThemeToggle } from "./auth-theme-toggle";

export function AuthLayout() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <div className="absolute right-5 top-5 z-10 sm:right-8 sm:top-7">
        <AuthThemeToggle />
      </div>

      <section className="flex min-h-screen items-center justify-center px-5 py-8 sm:px-8 sm:py-10">
        <div className="w-full max-w-[32rem]">
          <div className="mx-auto mb-7 w-full max-w-[30rem]">
            <AuthLogo />
          </div>

          <Outlet />
        </div>
      </section>
    </main>
  );
}
