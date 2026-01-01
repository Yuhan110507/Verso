import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verso - Reset Password",
  description: "Reset your Verso account password",
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
