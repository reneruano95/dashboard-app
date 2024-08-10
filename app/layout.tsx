import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/lib/providers/theme-provider";
import { ReactQueryClientProvider } from "@/lib/providers/react-query-client-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard App",
  description: "A dashboard app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
