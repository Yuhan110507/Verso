'use client';

import Header from "@/components/layout/Header";
import { AuthProvider } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Auth pages should not have top padding for the header
  const isAuthPage = pathname?.startsWith('/auth');

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AuthProvider>
      <div className="min-h-screen">
        {mounted && <Header />}
        <main className={isAuthPage ? "" : "pt-20"}>
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
