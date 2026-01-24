import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  LineSpacing,
  TextAlignment,
  EditorModes,
  CharacterNote,
  SceneNote,
} from "@/types/editor";
import { defaultFont } from "@/components/Editor/utils/literaryFonts";
import { defaultTextColor } from "@/components/Editor/utils/versoColorPalette";

interface EditorState {
  // Existing fields
  content: string;
  title: string;
  workId: string | null;
  isDirty: boolean;
  isSaving: boolean;
  lastSavedAt: string | null;

  // New formatting fields
  fontFamily: string;
  fontSize: number;
  textColor: string;
  highlightColor: string;
  lineSpacing: LineSpacing;
  alignment: TextAlignment;

  // Editor modes
  modes: EditorModes;

  // Writer tools
  characterNotes: CharacterNote[];
  sceneNotes: SceneNote[];

  // Recent colors for quick access
  recentTextColors: string[];
  recentHighlightColors: string[];

  // Existing setters
  setContent: (content: string) => void;
  setTitle: (title: string) => void;
  setWorkId: (id: string | null) => void;
  setDirty: (dirty: boolean) => void;
  setSaving: (saving: boolean) => void;
  setLastSavedAt: (date: string | null) => void;

  // New setters for formatting
  setFontFamily: (fontFamily: string) => void;
  setFontSize: (fontSize: number) => void;
  setTextColor: (color: string) => void;
  setHighlightColor: (color: string) => void;
  setLineSpacing: (spacing: LineSpacing) => void;
  setAlignment: (alignment: TextAlignment) => void;

  // Mode toggles
  toggleMode: (mode: keyof EditorModes) => void;
  setMode: (mode: keyof EditorModes, value: boolean) => void;

  // Character notes actions
  addCharacterNote: (note: Omit<CharacterNote, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCharacterNote: (id: string, note: Partial<CharacterNote>) => void;
  deleteCharacterNote: (id: string) => void;

  // Scene notes actions
  addSceneNote: (note: Omit<SceneNote, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateSceneNote: (id: string, note: Partial<SceneNote>) => void;
  deleteSceneNote: (id: string) => void;

  // Recent colors management
  addRecentTextColor: (color: string) => void;
  addRecentHighlightColor: (color: string) => void;

  reset: () => void;
}

export const useEditorStore = create<EditorState>()(
  persist(
    (set) => ({
      // Existing state
      content: "",
      title: "",
      workId: null,
      isDirty: false,
      isSaving: false,
      lastSavedAt: null,

      // New formatting state
      fontFamily: defaultFont.stack,
      fontSize: 20,
      textColor: defaultTextColor,
      highlightColor: "",
      lineSpacing: 1.8,
      alignment: "left",

      // Editor modes
      modes: {
        focus: false,
        typewriter: false,
        manuscript: false,
      },

      // Writer tools
      characterNotes: [],
      sceneNotes: [],

      // Recent colors
      recentTextColors: [],
      recentHighlightColors: [],

      // Existing setters
      setContent: (content) => set({ content, isDirty: true }),
      setTitle: (title) => set({ title, isDirty: true }),
      setWorkId: (workId) => set({ workId }),
      setDirty: (isDirty) => set({ isDirty }),
      setSaving: (isSaving) => set({ isSaving }),
      setLastSavedAt: (lastSavedAt) => set({ lastSavedAt }),

      // New formatting setters
      setFontFamily: (fontFamily) => set({ fontFamily }),
      setFontSize: (fontSize) => set({ fontSize }),
      setTextColor: (textColor) => set({ textColor }),
      setHighlightColor: (highlightColor) => set({ highlightColor }),
      setLineSpacing: (lineSpacing) => set({ lineSpacing }),
      setAlignment: (alignment) => set({ alignment }),

      // Mode toggles
      toggleMode: (mode) =>
        set((state) => ({
          modes: {
            ...state.modes,
            [mode]: !state.modes[mode],
          },
        })),
      setMode: (mode, value) =>
        set((state) => ({
          modes: {
            ...state.modes,
            [mode]: value,
          },
        })),

      // Character notes actions
      addCharacterNote: (note) =>
        set((state) => ({
          characterNotes: [
            ...state.characterNotes,
            {
              ...note,
              id: crypto.randomUUID(),
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        })),
      updateCharacterNote: (id, updates) =>
        set((state) => ({
          characterNotes: state.characterNotes.map((note) =>
            note.id === id
              ? { ...note, ...updates, updatedAt: new Date() }
              : note
          ),
        })),
      deleteCharacterNote: (id) =>
        set((state) => ({
          characterNotes: state.characterNotes.filter((note) => note.id !== id),
        })),

      // Scene notes actions
      addSceneNote: (note) =>
        set((state) => ({
          sceneNotes: [
            ...state.sceneNotes,
            {
              ...note,
              id: crypto.randomUUID(),
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        })),
      updateSceneNote: (id, updates) =>
        set((state) => ({
          sceneNotes: state.sceneNotes.map((note) =>
            note.id === id
              ? { ...note, ...updates, updatedAt: new Date() }
              : note
          ),
        })),
      deleteSceneNote: (id) =>
        set((state) => ({
          sceneNotes: state.sceneNotes.filter((note) => note.id !== id),
        })),

      // Recent colors management
      addRecentTextColor: (color) =>
        set((state) => ({
          recentTextColors: [
            color,
            ...state.recentTextColors.filter((c) => c !== color),
          ].slice(0, 8),
        })),
      addRecentHighlightColor: (color) =>
        set((state) => ({
          recentHighlightColors: [
            color,
            ...state.recentHighlightColors.filter((c) => c !== color),
          ].slice(0, 8),
        })),

      reset: () =>
        set({
          content: "",
          title: "",
          workId: null,
          isDirty: false,
          isSaving: false,
          lastSavedAt: null,
          fontFamily: defaultFont.stack,
          fontSize: 20,
          textColor: defaultTextColor,
          highlightColor: "",
          lineSpacing: 1.8,
          alignment: "left",
          modes: {
            focus: false,
            typewriter: false,
            manuscript: false,
          },
          characterNotes: [],
          sceneNotes: [],
          recentTextColors: [],
          recentHighlightColors: [],
        }),
    }),
    {
      name: "verso-editor-storage",
      partialize: (state) => ({
        fontFamily: state.fontFamily,
        fontSize: state.fontSize,
        lineSpacing: state.lineSpacing,
        characterNotes: state.characterNotes,
        sceneNotes: state.sceneNotes,
        recentTextColors: state.recentTextColors,
        recentHighlightColors: state.recentHighlightColors,
      }),
    }
  )
);
