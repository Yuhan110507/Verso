"use client";

import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAppStore();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  return (
    <main className="min-h-screen bg-verso-cream">
      <div className="verso-text-column py-12">
        <h1 className="text-5xl font-serif font-bold text-verso-charcoal mb-12">
          Author Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="verso-card p-8 text-center">
            <p className="text-sm text-verso-softCharcoal mb-2">Total Readers</p>
            <p className="text-4xl font-bold text-verso-burgundy">254</p>
          </div>
          <div className="verso-card p-8 text-center">
            <p className="text-sm text-verso-softCharcoal mb-2">Total Comments</p>
            <p className="text-4xl font-bold text-verso-sage">47</p>
          </div>
          <div className="verso-card p-8 text-center">
            <p className="text-sm text-verso-softCharcoal mb-2">Works Published</p>
            <p className="text-4xl font-bold text-verso-gold">3</p>
          </div>
        </div>

        <h2 className="text-2xl font-serif font-bold text-verso-charcoal mb-6">
          Your Works
        </h2>
        <div className="verso-card p-8">
          <p className="text-verso-softCharcoal">Your published works will appear here</p>
        </div>
      </div>
    </main>
  );
}
