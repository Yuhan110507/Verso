import { FontFamily } from '@/types/editor';

// Serif fonts optimized for long-form creative writing
export const serifFonts: FontFamily[] = [
  {
    name: 'Georgia',
    stack: 'Georgia, serif',
    category: 'serif',
  },
  {
    name: 'Garamond',
    stack: 'Garamond, "Times New Roman", serif',
    category: 'serif',
  },
  {
    name: 'Baskerville',
    stack: 'Baskerville, "Libre Baskerville", serif',
    category: 'serif',
  },
  {
    name: 'Crimson Text',
    stack: '"Crimson Text", Georgia, serif',
    category: 'serif',
  },
  {
    name: 'Merriweather',
    stack: 'Merriweather, Georgia, serif',
    category: 'serif',
  },
  {
    name: 'Lora',
    stack: 'Lora, Georgia, serif',
    category: 'serif',
  },
  {
    name: 'Playfair Display',
    stack: '"Playfair Display", Georgia, serif',
    category: 'serif',
  },
];

// Sans-serif fonts for notes and UI elements
export const sansSerifFonts: FontFamily[] = [
  {
    name: 'System Sans',
    stack: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    category: 'sans-serif',
  },
  {
    name: 'Helvetica Neue',
    stack: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    category: 'sans-serif',
  },
  {
    name: 'Inter',
    stack: 'Inter, sans-serif',
    category: 'sans-serif',
  },
  {
    name: 'Source Sans Pro',
    stack: '"Source Sans Pro", sans-serif',
    category: 'sans-serif',
  },
];

// Monospace fonts for manuscript formatting and code
export const monospaceFonts: FontFamily[] = [
  {
    name: 'Courier',
    stack: '"Courier New", Courier, monospace',
    category: 'monospace',
  },
  {
    name: 'Monaco',
    stack: 'Monaco, "Courier New", monospace',
    category: 'monospace',
  },
];

// All fonts combined
export const allFonts: FontFamily[] = [
  ...serifFonts,
  ...sansSerifFonts,
  ...monospaceFonts,
];

// Default font for the editor
export const defaultFont: FontFamily = serifFonts[0]; // Georgia

// Get font by name
export const getFontByName = (name: string): FontFamily | undefined => {
  return allFonts.find(font => font.name === name);
};

// Get font by stack
export const getFontByStack = (stack: string): FontFamily | undefined => {
  return allFonts.find(font => font.stack === stack);
};

// Get fonts by category
export const getFontsByCategory = (category: 'serif' | 'sans-serif' | 'monospace'): FontFamily[] => {
  return allFonts.filter(font => font.category === category);
};
