"use client";

import { useState, useCallback } from "react";

interface RichTextEditorProps {
  initialContent?: string;
  onAutoSave?: (content: string) => void;
  readOnly?: boolean;
}

export function RichTextEditor({
  onAutoSave,
  readOnly = false,
}: RichTextEditorProps) {
  const [content, setContent] = useState("");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    if (onAutoSave) {
      onAutoSave(newContent);
    }
  }, [onAutoSave]);

  return (
    <textarea
      value={content}
      onChange={handleChange}
      readOnly={readOnly}
      className="w-full h-full p-4 bg-verso-cream text-verso-charcoal font-serif text-lg leading-relaxed focus:outline-none border-0"
      placeholder="Write your story here..."
    />
  );
}
