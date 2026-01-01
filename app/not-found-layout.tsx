import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verso - Page Not Found",
  description: "The page you're looking for could not be found",
};

export default function NotFoundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
