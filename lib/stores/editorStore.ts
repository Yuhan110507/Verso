import { create } from "zustand";

interface EditorState {
  content: string;
  title: string;
  workId: string | null;
  isDirty: boolean;
  isSaving: boolean;
  lastSavedAt: string | null;
  setContent: (content: string) => void;
  setTitle: (title: string) => void;
  setWorkId: (id: string | null) => void;
  setDirty: (dirty: boolean) => void;
  setSaving: (saving: boolean) => void;
  setLastSavedAt: (date: string | null) => void;
  reset: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  content: "",
  title: "",
  workId: null,
  isDirty: false,
  isSaving: false,
  lastSavedAt: null,
  setContent: (content) => set({ content, isDirty: true }),
  setTitle: (title) => set({ title, isDirty: true }),
  setWorkId: (workId) => set({ workId }),
  setDirty: (isDirty) => set({ isDirty }),
  setSaving: (isSaving) => set({ isSaving }),
  setLastSavedAt: (lastSavedAt) => set({ lastSavedAt }),
  reset: () =>
    set({
      content: "",
      title: "",
      workId: null,
      isDirty: false,
      isSaving: false,
      lastSavedAt: null,
    }),
}));
