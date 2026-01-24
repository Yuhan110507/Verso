'use client';

import { Editor } from '@tiptap/react';
import { useEditorStore } from '@/lib/stores/editorStore';
import { allFonts } from '../utils/literaryFonts';
import { textColors, highlightColors } from '../utils/versoColorPalette';
import { applyManuscriptFormat, removeManuscriptFormat } from '../extensions';

interface EditorToolbarProps {
  editor: Editor | null;
  isInFocusMode?: boolean;
}

export function EditorToolbar({ editor, isInFocusMode = false }: EditorToolbarProps) {
  const {
    fontFamily,
    lineSpacing,
    modes,
    setFontFamily,
    setLineSpacing,
    setTextColor,
    setHighlightColor,
    toggleMode,
    addRecentTextColor,
    addRecentHighlightColor,
  } = useEditorStore();

  if (!editor) {
    return null;
  }

  const handleFontChange = (fontStack: string) => {
    setFontFamily(fontStack);
    editor.commands.selectAll();
    editor.commands.setFontFamily(fontStack);
    editor.commands.focus('end');
  };

  const handleTextColorChange = (color: string) => {
    setTextColor(color);
    addRecentTextColor(color);
    editor.commands.setColor(color);
  };

  const handleHighlightChange = (color: string) => {
    setHighlightColor(color);
    addRecentHighlightColor(color);
    if (color) {
      editor.commands.setHighlight({ color });
    } else {
      editor.commands.unsetHighlight();
    }
  };

  const handleLineSpacingChange = (spacing: number) => {
    setLineSpacing(spacing as 1.5 | 1.8 | 2.0 | 2.5);
    editor.commands.setLineSpacing(spacing);
  };

  const handleManuscriptToggle = () => {
    if (modes.manuscript) {
      removeManuscriptFormat(editor);
    } else {
      applyManuscriptFormat(editor);
    }
    toggleMode('manuscript');
  };

  return (
    <div className={`${isInFocusMode ? 'relative' : 'fixed top-[52px] left-0 right-0 z-40'} bg-verso-cream border-b border-gray-300 shadow-md`}>
      <div className="max-w-full mx-auto px-4 py-2 w-full">
        <div className="flex flex-wrap items-center gap-2 justify-center">
          {/* Font Family Selector */}
          <select
            value={fontFamily}
            onChange={(e) => handleFontChange(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-verso-burgundy"
          >
            <optgroup label="Serif">
              {allFonts.filter(f => f.category === 'serif').map((font) => (
                <option key={font.name} value={font.stack} style={{ fontFamily: font.stack }}>
                  {font.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Sans-Serif">
              {allFonts.filter(f => f.category === 'sans-serif').map((font) => (
                <option key={font.name} value={font.stack} style={{ fontFamily: font.stack }}>
                  {font.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Monospace">
              {allFonts.filter(f => f.category === 'monospace').map((font) => (
                <option key={font.name} value={font.stack} style={{ fontFamily: font.stack }}>
                  {font.name}
                </option>
              ))}
            </optgroup>
          </select>

          <div className="w-px h-6 bg-gray-300" />

          {/* Basic Formatting */}
          <button
            onClick={() => editor.commands.toggleBold()}
            className={`px-3 py-1.5 rounded font-bold transition-colors border ${
              editor.isActive('bold')
                ? 'bg-verso-burgundy text-white border-verso-burgundy'
                : 'bg-white text-verso-charcoal border-gray-300 hover:bg-gray-100'
            }`}
            title="Bold (Ctrl+B)"
          >
            B
          </button>
          <button
            onClick={() => editor.commands.toggleItalic()}
            className={`px-3 py-1.5 rounded italic transition-colors border ${
              editor.isActive('italic')
                ? 'bg-verso-burgundy text-white border-verso-burgundy'
                : 'bg-white text-verso-charcoal border-gray-300 hover:bg-gray-100'
            }`}
            title="Italic (Ctrl+I)"
          >
            I
          </button>
          <button
            onClick={() => editor.commands.toggleUnderline()}
            className={`px-3 py-1.5 rounded underline transition-colors border ${
              editor.isActive('underline')
                ? 'bg-verso-burgundy text-white border-verso-burgundy'
                : 'bg-white text-verso-charcoal border-gray-300 hover:bg-gray-100'
            }`}
            title="Underline (Ctrl+U)"
          >
            U
          </button>

          <div className="w-px h-6 bg-gray-300" />

          {/* Headings */}
          <button
            onClick={() => editor.commands.toggleHeading({ level: 1 })}
            className={`px-3 py-1.5 rounded transition-colors border ${
              editor.isActive('heading', { level: 1 })
                ? 'bg-verso-burgundy text-white border-verso-burgundy'
                : 'bg-white text-verso-charcoal border-gray-300 hover:bg-gray-100'
            }`}
            title="Heading 1"
          >
            H1
          </button>
          <button
            onClick={() => editor.commands.toggleHeading({ level: 2 })}
            className={`px-3 py-1.5 rounded transition-colors border ${
              editor.isActive('heading', { level: 2 })
                ? 'bg-verso-burgundy text-white border-verso-burgundy'
                : 'bg-white text-verso-charcoal border-gray-300 hover:bg-gray-100'
            }`}
            title="Heading 2"
          >
            H2
          </button>

          <div className="w-px h-6 bg-gray-300" />

          {/* Lists */}
          <button
            onClick={() => editor.commands.toggleBulletList()}
            className={`px-3 py-1.5 rounded transition-colors border ${
              editor.isActive('bulletList')
                ? 'bg-verso-burgundy text-white border-verso-burgundy'
                : 'bg-white text-verso-charcoal border-gray-300 hover:bg-gray-100'
            }`}
            title="Bullet List"
          >
            • List
          </button>
          <button
            onClick={() => editor.commands.toggleOrderedList()}
            className={`px-3 py-1.5 rounded transition-colors border ${
              editor.isActive('orderedList')
                ? 'bg-verso-burgundy text-white border-verso-burgundy'
                : 'bg-white text-verso-charcoal border-gray-300 hover:bg-gray-100'
            }`}
            title="Numbered List"
          >
            1. List
          </button>

          <div className="w-px h-6 bg-gray-300" />

          {/* Alignment */}
          <button
            onClick={() => editor.commands.setTextAlign('left')}
            className={`px-3 py-1.5 rounded transition-colors border ${
              editor.isActive({ textAlign: 'left' })
                ? 'bg-verso-burgundy text-white border-verso-burgundy'
                : 'bg-white text-verso-charcoal border-gray-300 hover:bg-gray-100'
            }`}
            title="Align Left"
          >
            ⬅
          </button>
          <button
            onClick={() => editor.commands.setTextAlign('center')}
            className={`px-3 py-1.5 rounded transition-colors border ${
              editor.isActive({ textAlign: 'center' })
                ? 'bg-verso-burgundy text-white border-verso-burgundy'
                : 'bg-white text-verso-charcoal border-gray-300 hover:bg-gray-100'
            }`}
            title="Align Center"
          >
            ↔
          </button>
          <button
            onClick={() => editor.commands.setTextAlign('right')}
            className={`px-3 py-1.5 rounded transition-colors border ${
              editor.isActive({ textAlign: 'right' })
                ? 'bg-verso-burgundy text-white border-verso-burgundy'
                : 'bg-white text-verso-charcoal border-gray-300 hover:bg-gray-100'
            }`}
            title="Align Right"
          >
            ➡
          </button>

          <div className="w-px h-6 bg-gray-300" />

          {/* Line Spacing */}
          <select
            value={lineSpacing}
            onChange={(e) => handleLineSpacingChange(Number(e.target.value))}
            className="px-3 py-1.5 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-verso-burgundy"
            title="Line Spacing"
          >
            <option value={1.5}>1.5</option>
            <option value={1.8}>1.8</option>
            <option value={2.0}>2.0</option>
            <option value={2.5}>2.5</option>
          </select>

          <div className="w-px h-6 bg-gray-300" />

          {/* Text Color */}
          <div className="relative group">
            <button
              className="px-3 py-1.5 rounded bg-white hover:bg-gray-100 border border-gray-300 text-verso-charcoal font-semibold"
              title="Text Color"
            >
              A
            </button>
            <div className="absolute top-full mt-2 hidden group-hover:block bg-white border border-gray-300 rounded shadow-lg p-3 w-52 z-10">
              <div className="text-xs text-gray-600 mb-2 font-medium">Text Color</div>
              <div className="grid grid-cols-5 gap-2">
                {textColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => handleTextColorChange(color.value)}
                    className="w-8 h-8 rounded border-2 border-gray-300 hover:scale-110 hover:border-verso-burgundy transition-all"
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Highlight Color */}
          <div className="relative group">
            <button
              className="px-3 py-1.5 rounded bg-white hover:bg-gray-100 border border-gray-300 text-xl leading-none"
              title="Highlight Color"
            >
              🖍
            </button>
            <div className="absolute top-full mt-2 hidden group-hover:block bg-white border border-gray-300 rounded shadow-lg p-3 w-52 z-10">
              <div className="text-xs text-gray-600 mb-2 font-medium">Highlight Color</div>
              <div className="grid grid-cols-4 gap-2">
                {highlightColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => handleHighlightChange(color.value)}
                    className="w-10 h-8 rounded border-2 border-gray-300 hover:scale-110 hover:border-verso-burgundy transition-all"
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="w-px h-6 bg-gray-300" />

          {/* Writer Modes */}
          <button
            onClick={() => toggleMode('focus')}
            className={`px-3 py-1.5 rounded transition-colors border text-sm ${
              modes.focus
                ? 'bg-verso-sage text-white border-verso-sage'
                : 'bg-white text-verso-charcoal border-gray-300 hover:bg-gray-100'
            }`}
            title="Focus Mode"
          >
            Focus
          </button>
          <button
            onClick={() => toggleMode('typewriter')}
            className={`px-3 py-1.5 rounded transition-colors border text-sm ${
              modes.typewriter
                ? 'bg-verso-sage text-white border-verso-sage'
                : 'bg-white text-verso-charcoal border-gray-300 hover:bg-gray-100'
            }`}
            title="Typewriter Mode"
          >
            Typewriter
          </button>
          <button
            onClick={handleManuscriptToggle}
            className={`px-3 py-1.5 rounded transition-colors border text-sm ${
              modes.manuscript
                ? 'bg-verso-sage text-white border-verso-sage'
                : 'bg-white text-verso-charcoal border-gray-300 hover:bg-gray-100'
            }`}
            title="Manuscript Format"
          >
            Manuscript
          </button>
        </div>
      </div>
    </div>
  );
}
