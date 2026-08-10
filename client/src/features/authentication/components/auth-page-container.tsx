import type { PropsWithChildren, ReactNode } from "react";

type AuthPageContainerProps = PropsWithChildren<{
  title: string;
  description: string;
  footer?: ReactNode;
}>;

export function AuthPageContainer({
  children,
  description,
  footer,
  title,
}: AuthPageContainerProps) {
  return (
    <div className="w-full">
      <section className="border border-border bg-card px-6 py-7 shadow-card sm:px-10 sm:py-8">
        <header className="text-center">
          <h1 className="text-2xl font-semibold tracking-[-0.035em]">
            {title}
          </h1>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </header>

        <div className="mt-6">{children}</div>
      </section>

      {footer ? (
        <div className="mt-5 text-center text-sm leading-6 text-muted-foreground">
          {footer}
        </div>
      ) : null}
    </div>
  );
}
