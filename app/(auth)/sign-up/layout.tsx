import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Sign up for a new account",
};

export default function SignUpLayout({
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
