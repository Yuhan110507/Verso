"use client";

import { useState } from "react";
import Link from "next/link";

export default function RevisionsPage() {
  const [revisions] = useState([
    {
      id: "1",
      version: "Draft 1",
      date: "Nov 20, 2024",
      changes: "Initial draft",
      wordCount: 8200,
    },
    {
      id: "2",
      version: "Draft 2",
      date: "Nov 24, 2024",
      changes: "Rewrote opening chapter, improved pacing",
      wordCount: 8500,
    },
    {
      id: "3",
      version: "Final",
      date: "Nov 28, 2024",
      changes: "Final polish and typo fixes",
      wordCount: 8500,
    },
  ]);

  return (
    <main className="bg-verso-cream min-h-screen">
      <div className="verso-text-column py-12">
        <Link href="/work/1" className="text-verso-burgundy hover:underline mb-8 block">
          Back to work
        </Link>
        
        <h1 className="text-4xl font-serif font-bold text-verso-charcoal mb-12">
          Revision Timeline
        </h1>

        <div className="space-y-6">
          {revisions.map((rev) => (
            <div key={rev.id} className="verso-card p-8">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-serif font-bold text-verso-charcoal">
                    {rev.version}
                  </h3>
                  <p className="text-verso-softCharcoal text-sm">{rev.date}</p>
                </div>
                <span className="text-verso-sage font-medium">{rev.wordCount} words</span>
              </div>
              <p className="text-verso-charcoal">{rev.changes}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
