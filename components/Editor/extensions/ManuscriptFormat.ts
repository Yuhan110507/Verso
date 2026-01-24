import { Editor } from '@tiptap/core';

/**
 * Manuscript formatting helper
 * Applies standard manuscript formatting: Courier font, double-spaced, proper margins
 */
export interface ManuscriptFormatOptions {
  fontFamily: string;
  fontSize: string;
  lineHeight: number;
  margin: string;
}

export const defaultManuscriptOptions: ManuscriptFormatOptions = {
  fontFamily: '"Courier New", Courier, monospace',
  fontSize: '12pt',
  lineHeight: 2.0,
  margin: '1in',
};

/**
 * Apply manuscript formatting to the editor
 */
export const applyManuscriptFormat = (
  editor: Editor,
  options: Partial<ManuscriptFormatOptions> = {}
): void => {
  const settings = { ...defaultManuscriptOptions, ...options };

  // Set font family for all text
  editor.commands.selectAll();
  editor.commands.setFontFamily(settings.fontFamily);

  // Set line spacing
  if (editor.commands.setLineSpacing) {
    editor.commands.setLineSpacing(settings.lineHeight);
  }

  // Deselect all
  editor.commands.focus();
};

/**
 * Remove manuscript formatting and restore default Verso styling
 */
export const removeManuscriptFormat = (
  editor: Editor,
  defaultFont: string = 'Georgia, serif',
  defaultLineHeight: number = 1.8
): void => {
  // Select all and reset to default font
  editor.commands.selectAll();
  editor.commands.setFontFamily(defaultFont);

  // Reset line spacing
  if (editor.commands.setLineSpacing) {
    editor.commands.setLineSpacing(defaultLineHeight);
  }

  // Deselect all
  editor.commands.focus();
};

/**
 * Check if manuscript formatting is currently active
 */
export const isManuscriptFormatActive = (
  editor: Editor,
  manuscriptFont: string = '"Courier New", Courier, monospace'
): boolean => {
  const { doc } = editor.state;
  let hasManuscriptFont = false;

  doc.descendants((node) => {
    if (node.marks) {
      const fontMark = node.marks.find((mark) => mark.type.name === 'textStyle');
      if (fontMark && fontMark.attrs.fontFamily === manuscriptFont) {
        hasManuscriptFont = true;
        return false; // stop iteration
      }
    }
    return true; // continue iteration
  });

  return hasManuscriptFont;
};
