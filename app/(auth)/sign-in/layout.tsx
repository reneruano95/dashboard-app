import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign in",
    description: "Sign in to your account",
    };


export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      {children}
    </main>
  );
}
