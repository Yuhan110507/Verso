import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Color from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import FontFamily from '@tiptap/extension-font-family';
import Underline from '@tiptap/extension-underline';
import Typography from '@tiptap/extension-typography';
import CharacterCount from '@tiptap/extension-character-count';
import Focus from '@tiptap/extension-focus';
import Placeholder from '@tiptap/extension-placeholder';

import { defaultFont } from './literaryFonts';
import { defaultTextColor } from './versoColorPalette';

// TipTap editor extensions configuration
export const getEditorExtensions = (placeholderText: string = 'Start writing your story...') => {
  return [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3],
      },
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
      alignments: ['left', 'center', 'right', 'justify'],
      defaultAlignment: 'left',
    }),
    TextStyle,
    Color.configure({
      types: ['textStyle'],
    }),
    Highlight.configure({
      multicolor: true,
    }),
    FontFamily.configure({
      types: ['textStyle'],
    }),
    Underline,
    Typography,
    CharacterCount,
    Focus.configure({
      className: 'has-focus',
      mode: 'all',
    }),
    Placeholder.configure({
      placeholder: placeholderText,
    }),
  ];
};

// Default editor content styles
export const defaultEditorStyles = {
  fontFamily: defaultFont.stack,
  fontSize: '20px',
  lineHeight: '1.8',
  color: defaultTextColor,
  minHeight: '70vh',
  maxWidth: '720px',
  padding: '2rem',
  backgroundColor: 'transparent',
};

// Keyboard shortcuts configuration
export const keyboardShortcuts = {
  'Mod-b': 'toggleBold',
  'Mod-i': 'toggleItalic',
  'Mod-u': 'toggleUnderline',
  'Mod-Shift-x': 'toggleStrike',
  'Mod-Alt-1': 'toggleHeading1',
  'Mod-Alt-2': 'toggleHeading2',
  'Mod-Alt-3': 'toggleHeading3',
  'Mod-Shift-8': 'toggleBulletList',
  'Mod-Shift-7': 'toggleOrderedList',
  'Mod-Shift-b': 'toggleBlockquote',
};

// Editor configuration options
export interface EditorConfigOptions {
  editable?: boolean;
  autofocus?: boolean | 'start' | 'end' | 'all' | number;
  placeholder?: string;
  onCreate?: () => void;
  onUpdate?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

// Default configuration
export const defaultEditorConfig: EditorConfigOptions = {
  editable: true,
  autofocus: 'end',
  placeholder: 'Start writing your story...',
};
