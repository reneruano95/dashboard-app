import Link from "next/link";
import { SignInForm } from "@/components/sign-in/sign-in-form";

export default function SignInPage() {
  return (
    <div className="mx-auto w-full max-w-xs sm:max-w-sm space-y-8">
      <div>
        <h2 className="mt-6 text-center text-2xl sm:text-3xl font-bold tracking-tight text-foreground/90">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Or{" "}
          <Link
            href="#"
            className="font-medium text-foreground/80 hover:text-primary/90"
            prefetch={false}
          >
            sign up for a new account
          </Link>
        </p>
      </div>

      <SignInForm />
    </div>
  );
}
