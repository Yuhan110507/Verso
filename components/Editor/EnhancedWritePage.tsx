'use client';

import { useState, useEffect } from 'react';
import type { Editor as TipTapEditor } from '@tiptap/react';
import { VersoEditor } from './VersoEditor';
import { EditorToolbar } from './EditorToolbar/EditorToolbar';
import { CharacterNotesPanel } from './WriterTools/CharacterNotesPanel';
import { WritingPrompts } from './WriterTools/WritingPrompts';
import { useEditorStore } from '@/lib/stores/editorStore';

// Inspirational writing quotes
const writingQuotes = [
  { quote: "There is nothing to writing. All you do is sit down at a typewriter and bleed.", author: "Ernest Hemingway" },
  { quote: "The first draft is just you telling yourself the story.", author: "Terry Pratchett" },
  { quote: "You can always edit a bad page. You can't edit a blank page.", author: "Jodi Picoult" },
  { quote: "Start writing, no matter what. The water does not flow until the faucet is turned on.", author: "Louis L'Amour" },
  { quote: "Write what should not be forgotten.", author: "Isabel Allende" },
  { quote: "A writer is someone for whom writing is more difficult than it is for other people.", author: "Thomas Mann" },
  { quote: "The scariest moment is always just before you start.", author: "Stephen King" },
  { quote: "Write with the door closed, rewrite with the door open.", author: "Stephen King" },
  { quote: "Either write something worth reading or do something worth writing.", author: "Benjamin Franklin" },
  { quote: "You don't start out writing good stuff. You start out writing crap and thinking it's good stuff.", author: "Octavia E. Butler" },
  { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { quote: "Fill your paper with the breathings of your heart.", author: "William Wordsworth" },
];

// Keyboard shortcuts for help panel
const keyboardShortcuts = [
  { keys: 'Ctrl + B', action: 'Bold' },
  { keys: 'Ctrl + I', action: 'Italic' },
  { keys: 'Ctrl + U', action: 'Underline' },
  { keys: 'Ctrl + Z', action: 'Undo' },
  { keys: 'Ctrl + Shift + Z', action: 'Redo' },
  { keys: 'Ctrl + Shift + 8', action: 'Bullet List' },
  { keys: 'Ctrl + Shift + 7', action: 'Numbered List' },
  { keys: 'Tab', action: 'Indent' },
  { keys: 'Shift + Tab', action: 'Outdent' },
  { keys: 'Escape', action: 'Exit Focus Mode' },
  { keys: 'Ctrl + /', action: 'Show/Hide Shortcuts' },
];

interface EnhancedWritePageProps {
  initialTitle?: string;
  initialContent?: string;
  onSave?: (title: string, content: string) => void;
  onPublish?: (title: string, content: string, metadata: any) => void;
}

export function EnhancedWritePage({
  initialTitle = '',
  initialContent = '',
  onSave,
  onPublish: _onPublish,
}: EnhancedWritePageProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [editor, setEditor] = useState<TipTapEditor | null>(null);
  const [sessionTime, setSessionTime] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(1000);
  const [showStats, setShowStats] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [todaysQuote] = useState(() => writingQuotes[Math.floor(Math.random() * writingQuotes.length)]);

  // Sprint writing feature
  const [sprintActive, setSprintActive] = useState(false);
  const [sprintTimeRemaining, setSprintTimeRemaining] = useState(0);
  const [sprintStartWordCount, setSprintStartWordCount] = useState(0);
  const [selectedSprintDuration, setSelectedSprintDuration] = useState(15);

  const { modes, setMode } = useEditorStore();

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format session time
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}h ${mins}m`;
    }
    return `${mins}m ${secs}s`;
  };

  // Calculate reading time
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Goal progress
  const goalProgress = Math.min(100, Math.round((wordCount / dailyGoal) * 100));

  // Sprint timer
  useEffect(() => {
    if (!sprintActive || sprintTimeRemaining <= 0) return;

    const timer = setInterval(() => {
      setSprintTimeRemaining(prev => {
        if (prev <= 1) {
          setSprintActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [sprintActive, sprintTimeRemaining]);

  // Start sprint
  const startSprint = () => {
    setSprintStartWordCount(wordCount);
    setSprintTimeRemaining(selectedSprintDuration * 60);
    setSprintActive(true);
  };

  // End sprint
  const endSprint = () => {
    setSprintActive(false);
  };

  // Format sprint time
  const formatSprintTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Sprint words written
  const sprintWordsWritten = wordCount - sprintStartWordCount;

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC to exit focus mode
      if (e.key === 'Escape' && modes.focus) {
        setMode('focus', false);
      }
      // Ctrl+/ to toggle shortcuts panel
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        setShowShortcuts(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [modes.focus, setMode]);

  // Handle editor ready callback
  const handleEditorReady = (editorInstance: TipTapEditor) => {
    setEditor(editorInstance);
  };

  // Handle content updates
  const handleContentUpdate = (html: string) => {
    setContent(html);

    // Update word count and character count using TipTap's built-in counter
    if (editor) {
      const words = editor.storage.characterCount?.words() || 0;
      const chars = editor.storage.characterCount?.characters() || 0;
      setWordCount(words);
      setCharCount(chars);
    }
  };

  // Auto-save functionality
  const handleAutoSave = (html: string) => {
    setIsSaving(true);
    setContent(html);
    setTimeout(() => {
      setLastSaved(new Date());
      setIsSaving(false);
      onSave?.(title, html);
    }, 500);
  };

  // Focus mode - fullscreen immersive writing
  if (modes.focus) {
    return (
      <div className="fixed inset-0 z-[9999] bg-verso-cream overflow-hidden flex flex-col">
        {/* Minimal header in focus mode */}
        <div className="flex-shrink-0 bg-verso-cream border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-8 py-3 flex items-center justify-between">
            <h1 className="text-lg font-serif italic text-verso-charcoal">
              Focus Mode
            </h1>
            <div className="flex items-center gap-4">
              {/* Sprint indicator in focus mode */}
              {sprintActive && (
                <div className="flex items-center gap-2 px-3 py-1 bg-verso-burgundy/10 rounded-full">
                  <span className="w-2 h-2 bg-verso-burgundy rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-verso-burgundy">
                    {formatSprintTime(sprintTimeRemaining)}
                  </span>
                  <span className="text-xs text-verso-burgundy/70">
                    +{sprintWordsWritten}
                  </span>
                </div>
              )}
              <span className="text-sm text-gray-500">{formatTime(sessionTime)}</span>
              <span className="text-sm text-gray-600">{wordCount} words</span>
              <button
                onClick={() => setMode('focus', false)}
                className="px-4 py-1.5 bg-verso-burgundy text-white rounded hover:bg-opacity-90 transition-colors text-sm"
              >
                Exit Focus (ESC)
              </button>
            </div>
          </div>
        </div>

        {/* Toolbar in focus mode */}
        <div className="flex-shrink-0">
          <EditorToolbar editor={editor} isInFocusMode={true} />
        </div>

        {/* Editor content - scrollable */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-[720px] mx-auto px-8 py-12">
            {/* Title */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Untitled Story"
              className="w-full text-5xl font-semibold text-verso-charcoal bg-transparent border-none outline-none font-serif mb-8 px-0"
              style={{ letterSpacing: '-0.02em', fontFamily: 'Georgia, serif' }}
            />

            {/* Editor */}
            <VersoEditor
              content={content}
              onUpdate={handleContentUpdate}
              onAutoSave={handleAutoSave}
              onEditorReady={handleEditorReady}
              placeholder="Start writing your story..."
            />
          </div>
        </div>

        {/* Goal progress bar at bottom */}
        <div className="flex-shrink-0 bg-white border-t border-gray-200 px-8 py-2">
          <div className="max-w-5xl mx-auto flex items-center gap-4">
            <span className="text-xs text-gray-500">Daily Goal:</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-verso-sage transition-all duration-300"
                style={{ width: `${goalProgress}%` }}
              />
            </div>
            <span className="text-xs text-gray-600">{wordCount}/{dailyGoal} words ({goalProgress}%)</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-verso-cream">
      {/* Header with literary feel - At the very top */}
      <div className="fixed top-0 left-0 right-0 bg-verso-cream border-b border-gray-200 z-50">
        <div className="max-w-5xl mx-auto px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-serif italic text-verso-charcoal">
              Craft your narrative, one word at a time
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              {isSaving ? (
                <span className="text-verso-sage">Saving...</span>
              ) : lastSaved ? (
                <span>Saved {lastSaved.toLocaleTimeString()}</span>
              ) : null}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Sprint indicator */}
            {sprintActive && (
              <div className="flex items-center gap-2 px-3 py-1 bg-verso-burgundy/10 rounded-full">
                <span className="w-2 h-2 bg-verso-burgundy rounded-full animate-pulse" />
                <span className="text-sm font-medium text-verso-burgundy">
                  {formatSprintTime(sprintTimeRemaining)}
                </span>
                <span className="text-xs text-verso-burgundy/70">
                  +{sprintWordsWritten} words
                </span>
              </div>
            )}
            <button
              onClick={() => setShowStats(!showStats)}
              className="text-sm text-gray-600 hover:text-verso-burgundy transition-colors"
            >
              {wordCount} words
            </button>
            <span className="text-sm text-gray-500">{formatTime(sessionTime)}</span>
            <button
              onClick={() => setShowShortcuts(!showShortcuts)}
              className="text-sm text-gray-500 hover:text-verso-burgundy transition-colors"
              title="Keyboard Shortcuts (Ctrl+/)"
            >
              ?
            </button>
          </div>
        </div>
      </div>

      {/* Editor Toolbar - Below header, always visible */}
      <EditorToolbar editor={editor} />

      {/* Stats Panel */}
      {showStats && (
        <div className="fixed top-[100px] right-4 w-72 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-40">
          <h3 className="text-sm font-semibold text-verso-charcoal mb-3 border-b pb-2">Writing Statistics</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Words</span>
              <span className="font-medium">{wordCount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Characters</span>
              <span className="font-medium">{charCount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Reading time</span>
              <span className="font-medium">{readingTime} min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Session time</span>
              <span className="font-medium">{formatTime(sessionTime)}</span>
            </div>
          </div>

          {/* Daily Goal */}
          <div className="mt-4 pt-3 border-t">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Daily Goal</span>
              <select
                value={dailyGoal}
                onChange={(e) => setDailyGoal(Number(e.target.value))}
                className="text-xs border rounded px-2 py-1"
              >
                <option value={500}>500 words</option>
                <option value={1000}>1,000 words</option>
                <option value={1500}>1,500 words</option>
                <option value={2000}>2,000 words</option>
                <option value={3000}>3,000 words</option>
              </select>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-verso-sage transition-all duration-300"
                style={{ width: `${goalProgress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1 text-center">
              {goalProgress >= 100 ? 'Goal achieved!' : `${dailyGoal - wordCount} words to go`}
            </p>
          </div>

          {/* Sprint Writing */}
          <div className="mt-4 pt-3 border-t">
            <h4 className="text-sm font-semibold text-verso-charcoal mb-2">Word Sprint</h4>
            {!sprintActive ? (
              <div className="space-y-2">
                <select
                  value={selectedSprintDuration}
                  onChange={(e) => setSelectedSprintDuration(Number(e.target.value))}
                  className="w-full text-sm border rounded px-2 py-1.5"
                >
                  <option value={5}>5 minutes</option>
                  <option value={10}>10 minutes</option>
                  <option value={15}>15 minutes</option>
                  <option value={20}>20 minutes</option>
                  <option value={30}>30 minutes</option>
                </select>
                <button
                  onClick={startSprint}
                  className="w-full bg-verso-burgundy text-white px-3 py-1.5 rounded text-sm hover:bg-opacity-90 transition-colors"
                >
                  Start Sprint
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-verso-burgundy">
                    {formatSprintTime(sprintTimeRemaining)}
                  </div>
                  <div className="text-sm text-gray-600">
                    +{sprintWordsWritten} words written
                  </div>
                </div>
                <button
                  onClick={endSprint}
                  className="w-full bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-300 transition-colors"
                >
                  End Sprint
                </button>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2 text-center italic">
              Challenge yourself with timed writing sessions
            </p>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Panel */}
      {showShortcuts && (
        <div className="fixed top-[100px] left-4 w-64 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-40">
          <div className="flex justify-between items-center mb-3 border-b pb-2">
            <h3 className="text-sm font-semibold text-verso-charcoal">Keyboard Shortcuts</h3>
            <button
              onClick={() => setShowShortcuts(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
          </div>
          <div className="space-y-2">
            {keyboardShortcuts.map((shortcut, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-600">{shortcut.action}</span>
                <kbd className="px-2 py-0.5 bg-gray-100 rounded text-xs font-mono text-gray-700">
                  {shortcut.keys}
                </kbd>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center italic">
            Press Ctrl+/ to toggle this panel
          </p>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-[720px] mx-auto px-8 pt-[120px] pb-32">
        {/* Inspirational Quote */}
        <div className="mb-8 p-4 bg-white/50 rounded-lg border border-gray-100">
          <p className="text-sm italic text-gray-600 font-serif">"{todaysQuote.quote}"</p>
          <p className="text-xs text-gray-500 mt-1 text-right">— {todaysQuote.author}</p>
        </div>

        {/* Title Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled Story"
          className="w-full text-5xl font-semibold text-verso-charcoal bg-transparent border-none outline-none font-serif mb-4 px-0"
          style={{
            letterSpacing: '-0.02em',
            fontFamily: 'Georgia, serif',
          }}
        />

        {/* Enhanced Editor */}
        <VersoEditor
          content={content}
          onUpdate={handleContentUpdate}
          onAutoSave={handleAutoSave}
          onEditorReady={handleEditorReady}
          placeholder="Start writing your story..."
        />
      </div>

      {/* Character/Scene Notes Panel */}
      <CharacterNotesPanel />

      {/* Writing Prompts - Creative inspiration generator */}
      <WritingPrompts
        onInsertPrompt={(prompt) => {
          if (editor) {
            editor.commands.insertContent(`<p><em>${prompt}</em></p>`);
            editor.commands.focus('end');
          }
        }}
      />

      {/* Goal Progress Bar - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-8 py-2 z-30">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <span className="text-xs text-gray-500 whitespace-nowrap">Daily Goal:</span>
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-verso-sage transition-all duration-300"
              style={{ width: `${goalProgress}%` }}
            />
          </div>
          <span className="text-xs text-gray-600 whitespace-nowrap">
            {wordCount}/{dailyGoal} ({goalProgress}%)
          </span>
        </div>
      </div>
    </div>
  );
}
