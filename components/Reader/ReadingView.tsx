"use client";

import { useState } from "react";

interface ReadingViewProps {
  content: string;
  title: string;
  author: string;
  wordCount: number;
  readingTime: number;
  comments?: any[];
  highlights?: any[];
  onCommentAdd?: (paragraphIndex: number, content: string) => void;
  onHighlight?: (startIndex: number, endIndex: number) => void;
}

export function ReadingView({
  content,
  title,
  author,
  wordCount,
  readingTime,
}: ReadingViewProps) {
  const [newComment, setNewComment] = useState("");

  return (
    <div className="verso-text-column py-12">
      <article>
        <header className="mb-12">
          <h1 className="text-5xl font-serif font-bold text-verso-charcoal mb-4">
            {title}
          </h1>
          <div className="flex justify-between text-verso-softCharcoal mb-8">
            <span>by {author}</span>
            <div className="flex gap-6 text-sm">
              <span>{wordCount} words</span>
              <span>{readingTime} min read</span>
            </div>
          </div>
        </header>

        <section className="prose prose-lg max-w-none text-verso-charcoal mb-16">
          <p className="text-lg leading-relaxed">{content}</p>
        </section>

        <section className="border-t border-verso-lightGray pt-12">
          <h2 className="text-3xl font-serif font-bold text-verso-charcoal mb-8">
            Comments
          </h2>

          <div className="verso-card p-8 mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full p-3 border border-verso-lightGray rounded-md bg-verso-cream text-verso-charcoal focus:outline-none focus:border-verso-sage mb-3"
              rows={3}
            />
            <button className="verso-button-primary">
              Post Comment
            </button>
          </div>
        </section>
      </article>
    </div>
  );
}
