import { Editor } from '@tiptap/react';

// Font family types
export interface FontFamily {
  name: string;
  stack: string;
  category: 'serif' | 'sans-serif' | 'monospace';
}

// Color types
export interface Color {
  name: string;
  value: string;
  category: string;
}

// Line spacing options
export type LineSpacing = 1.5 | 1.8 | 2.0 | 2.5;

// Text alignment options
export type TextAlignment = 'left' | 'center' | 'right' | 'justify';

// Editor modes
export interface EditorModes {
  focus: boolean;
  typewriter: boolean;
  manuscript: boolean;
}

// Character note type
export interface CharacterNote {
  id: string;
  name: string;
  description: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

// Scene note type
export interface SceneNote {
  id: string;
  title: string;
  summary: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

// Editor state
export interface EditorState {
  fontFamily: string;
  fontSize: number;
  textColor: string;
  highlightColor: string;
  lineSpacing: LineSpacing;
  alignment: TextAlignment;
  modes: EditorModes;
  characterNotes: CharacterNote[];
  sceneNotes: SceneNote[];
  recentTextColors: string[];
  recentHighlightColors: string[];
}

// Editor props
export interface VersoEditorProps {
  content?: string;
  onUpdate?: (html: string) => void;
  onAutoSave?: (html: string) => void;
  placeholder?: string;
  editable?: boolean;
}

// Toolbar button props
export interface ToolbarButtonProps {
  icon?: React.ReactNode;
  label?: string;
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  tooltip?: string;
}

// Font selector props
export interface FontSelectorProps {
  editor: Editor | null;
  currentFont: string;
  onFontChange: (fontStack: string) => void;
}

// Color picker props
export interface ColorPickerProps {
  editor: Editor | null;
  type: 'text' | 'highlight';
  currentColor: string;
  onColorChange: (color: string) => void;
}

// Writer tools props
export interface WriterToolsProps {
  modes: EditorModes;
  onModeToggle: (mode: keyof EditorModes) => void;
  characterNotes: CharacterNote[];
  sceneNotes: SceneNote[];
  onAddCharacterNote: (note: Omit<CharacterNote, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onAddSceneNote: (note: Omit<SceneNote, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateCharacterNote: (id: string, note: Partial<CharacterNote>) => void;
  onUpdateSceneNote: (id: string, note: Partial<SceneNote>) => void;
  onDeleteCharacterNote: (id: string) => void;
  onDeleteSceneNote: (id: string) => void;
}
