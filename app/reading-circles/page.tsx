"use client";

import { useState } from "react";

export default function ReadingCirclesPage() {
  const [circles] = useState([
    { id: "1", name: "Victorian Literature Club", genre: "Classic Literature", members: 8 },
    { id: "2", name: "Sci-Fi Futures", genre: "Science Fiction", members: 12 },
    { id: "3", name: "Fantasy World Builders", genre: "Fantasy", members: 15 },
  ]);

  return (
    <main className="bg-verso-cream min-h-screen">
      <div className="verso-text-column py-12">
        <h1 className="text-5xl font-serif font-bold text-verso-charcoal mb-4">
          Reading Circles
        </h1>
        <p className="text-verso-softCharcoal text-lg mb-12">
          Join a community of readers committed to thoughtful engagement
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {circles.map((circle) => (
            <div key={circle.id} className="verso-card p-8">
              <h2 className="text-2xl font-serif font-bold text-verso-charcoal mb-2">
                {circle.name}
              </h2>
              <p className="text-verso-softCharcoal mb-4">{circle.genre}</p>
              <p className="text-sm text-verso-charcoal mb-4">{circle.members} members</p>
              <button className="verso-button-primary">Join Circle</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
