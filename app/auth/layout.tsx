import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verso - Sign In",
  description: "Sign in to your Verso account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
