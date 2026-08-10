import { Link } from "react-router";

import { ROUTES } from "@/app/routes";
import { AuthPageContainer } from "@/features/authentication/components/auth-page-container";

export function PrivacyPage() {
  return (
    <AuthPageContainer
      description="A summary of how NotesVault handles information associated with your account and notes."
      footer={
        <Link
          className="font-medium text-primary transition-colors hover:text-primary-hover"
          to={ROUTES.signup}
        >
          Back to sign up
        </Link>
      }
      title="Privacy Policy"
    >
      <div className="space-y-5 text-sm leading-7 text-muted-foreground">
        <section>
          <h2 className="text-sm font-semibold text-foreground">
            Information you provide
          </h2>

          <p className="mt-1.5">
            NotesVault may process account information and the notes, folders,
            tags, preferences, and other content you choose to create in the
            application.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-foreground">
            How information is used
          </h2>

          <p className="mt-1.5">
            Information is used to provide application functionality such as
            authentication, note management, search, organization, preferences,
            and account-related features.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-foreground">
            Data protection
          </h2>

          <p className="mt-1.5">
            Reasonable technical and organizational safeguards should be used to
            protect application data against unauthorized access, loss, or
            misuse.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-foreground">
            Policy updates
          </h2>

          <p className="mt-1.5">
            This policy may be updated as NotesVault evolves or introduces new
            features, integrations, or services.
          </p>
        </section>
      </div>
    </AuthPageContainer>
  );
}
