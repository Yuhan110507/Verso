import type { Metadata } from "next";
import "./globals.css";
import RootLayoutClient from "./layout.client";

export const metadata: Metadata = {
  title: "Verso - A Literary Community",
  description: "Where writers craft and readers discover thoughtful feedback",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-verso-cream text-verso-charcoal font-serif" suppressHydrationWarning>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
