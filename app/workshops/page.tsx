"use client";

import { useState } from "react";
export default function WorkshopsPage() {
  const [workshops] = useState([
    { id: "1", title: "Craft Critique: Dialogue Writing", facilitator: "Elena Volkov", members: 6 },
    { id: "2", title: "World-Building Masterclass", facilitator: "James Chen", members: 8 },
    { id: "3", title: "Character Development Workshop", facilitator: "Maria Santos", members: 5 },
  ]);

  return (
    <main className="bg-verso-cream min-h-screen">
      <div className="verso-text-column py-12">
        <h1 className="text-5xl font-serif font-bold text-verso-charcoal mb-4">
          Workshop Circles
        </h1>
        <p className="text-verso-softCharcoal text-lg mb-12">
          Small critique groups focused on craft excellence
        </p>

        <div className="space-y-6">
          {workshops.map((workshop) => (
            <div key={workshop.id} className="verso-card p-8">
              <h2 className="text-2xl font-serif font-bold text-verso-charcoal mb-2">
                {workshop.title}
              </h2>
              <p className="text-verso-softCharcoal mb-2">Facilitated by {workshop.facilitator}</p>
              <p className="text-sm text-verso-charcoal mb-4">{workshop.members} members</p>
              <button className="verso-button-primary">Join Workshop</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
