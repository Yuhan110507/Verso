'use client';

import { useState } from 'react';

// Creative writing prompts organized by category
const writingPrompts = {
  character: [
    "Your protagonist discovers a letter addressed to them from their future self.",
    "Write about a character who can hear other people's thoughts, but only when it rains.",
    "A retired detective receives a letter about a case they never solved.",
    "Your character wakes up speaking a language they never learned.",
    "Write about someone who collects unusual things and why.",
    "A character must deliver terrible news, but keeps getting interrupted.",
    "Someone discovers their childhood imaginary friend was real all along.",
    "Write about a character who can only tell the truth on Tuesdays.",
  ],
  setting: [
    "A coffee shop where time moves differently than the outside world.",
    "The last bookstore on Earth.",
    "A train that never stops, traveling through places that don't exist on any map.",
    "An apartment where every room leads to a different city.",
    "A garden that blooms at midnight and vanishes at dawn.",
    "A library where the books write themselves based on who enters.",
    "A lighthouse at the edge of a world that's slowly disappearing.",
    "An antique shop where every item has a memory attached to it.",
  ],
  situation: [
    "Two strangers stuck in an elevator discover they share a past they don't remember.",
    "A handwritten note is found in a library book, leading to an unexpected journey.",
    "The power goes out, and when it returns, something has changed.",
    "A photograph appears in your character's home that shouldn't exist.",
    "Two people meet at a funeral and realize they knew the deceased as completely different people.",
    "A storm brings someone unexpected to your protagonist's door.",
    "Your character finds a key that opens every door except one.",
    "A conversation overheard in a cafe changes everything.",
  ],
  opening: [
    "\"I never believed in ghosts until the day my grandmother came back.\"",
    "The clock struck thirteen, and the world held its breath.",
    "She found the first letter hidden in the walls of her new apartment.",
    "\"We need to talk about what happened in Venice.\"",
    "The map showed a city that didn't exist. Until today.",
    "Everyone remembers exactly where they were when the music started.",
    "He hadn't spoken in seven years. Today, he would have to.",
    "The invitation arrived on the day she decided to disappear.",
  ],
};

type PromptCategory = keyof typeof writingPrompts;

interface WritingPromptsProps {
  onInsertPrompt?: (prompt: string) => void;
}

export function WritingPrompts({ onInsertPrompt }: WritingPromptsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<PromptCategory>('character');
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null);

  const generateRandomPrompt = () => {
    const prompts = writingPrompts[category];
    const randomIndex = Math.floor(Math.random() * prompts.length);
    setCurrentPrompt(prompts[randomIndex]);
  };

  const generateAnyPrompt = () => {
    const categories = Object.keys(writingPrompts) as PromptCategory[];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const prompts = writingPrompts[randomCategory];
    const randomIndex = Math.floor(Math.random() * prompts.length);
    setCategory(randomCategory);
    setCurrentPrompt(prompts[randomIndex]);
  };

  const categoryLabels: Record<PromptCategory, string> = {
    character: 'Character',
    setting: 'Setting',
    situation: 'Situation',
    opening: 'Opening Line',
  };

  const categoryDescriptions: Record<PromptCategory, string> = {
    character: 'Explore who your protagonist might be',
    setting: 'Discover where your story takes place',
    situation: 'Find the conflict that drives your narrative',
    opening: 'Start with a compelling first line',
  };

  return (
    <div className="fixed bottom-16 right-4 z-30">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? 'bg-verso-burgundy text-white'
            : 'bg-white text-verso-burgundy border border-verso-burgundy/20 hover:border-verso-burgundy'
        }`}
        title="Writing Prompts"
      >
        <span className="text-xl">{isOpen ? '×' : '✦'}</span>
      </button>

      {/* Prompts Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-verso-burgundy to-verso-burgundy/80 text-white px-4 py-3">
            <h3 className="font-serif text-lg">Writing Prompts</h3>
            <p className="text-xs text-white/80 italic">Spark your imagination</p>
          </div>

          {/* Category Tabs */}
          <div className="flex border-b border-gray-200">
            {(Object.keys(writingPrompts) as PromptCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setCurrentPrompt(null);
                }}
                className={`flex-1 px-2 py-2 text-xs transition-colors ${
                  category === cat
                    ? 'bg-verso-cream text-verso-burgundy border-b-2 border-verso-burgundy'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-xs text-gray-500 mb-3 italic">
              {categoryDescriptions[category]}
            </p>

            {/* Current Prompt Display */}
            {currentPrompt ? (
              <div className="bg-verso-cream/50 rounded-lg p-4 mb-4 border border-verso-sage/20">
                <p className="text-sm text-verso-charcoal font-serif leading-relaxed">
                  {currentPrompt}
                </p>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-dashed border-gray-300">
                <p className="text-sm text-gray-400 text-center italic">
                  Click below to generate a prompt
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={generateRandomPrompt}
                className="w-full bg-verso-burgundy text-white px-4 py-2 rounded text-sm hover:bg-opacity-90 transition-colors"
              >
                Generate {categoryLabels[category]} Prompt
              </button>
              <button
                onClick={generateAnyPrompt}
                className="w-full bg-white text-verso-burgundy px-4 py-2 rounded text-sm border border-verso-burgundy hover:bg-verso-cream transition-colors"
              >
                Surprise Me
              </button>
              {currentPrompt && onInsertPrompt && (
                <button
                  onClick={() => onInsertPrompt(currentPrompt)}
                  className="w-full bg-verso-sage text-white px-4 py-2 rounded text-sm hover:bg-opacity-90 transition-colors"
                >
                  Insert as Opening
                </button>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 py-2 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Let the prompt guide you, not confine you
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
