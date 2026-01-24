'use client';

import { useEditor, EditorContent, Editor as TipTapEditor } from '@tiptap/react';
import { useEffect } from 'react';
import { getEditorExtensions } from './utils/editorConfig';
import { LineSpacing, Indentation } from './extensions';
import { useEditorStore } from '@/lib/stores/editorStore';
import type { VersoEditorProps } from '@/types/editor';
import './styles/editor.css';

export function VersoEditor({
  content = '',
  onUpdate,
  onAutoSave,
  placeholder = 'Start writing your story...',
  editable = true,
  externalEditor,
  onEditorReady,
}: VersoEditorProps & { externalEditor?: TipTapEditor | null; onEditorReady?: (editor: TipTapEditor) => void }) {
  const {
    fontFamily,
    fontSize,
    textColor,
    lineSpacing,
    modes,
  } = useEditorStore();

  const internalEditor = useEditor({
    immediatelyRender: false,
    extensions: [
      ...getEditorExtensions(placeholder),
      LineSpacing.configure({
        defaultSpacing: lineSpacing,
      }),
      Indentation,
    ],
    content,
    editable,
    editorProps: {
      attributes: {
        class: `verso-editor prose prose-lg max-w-none focus:outline-none ${
          modes.focus ? 'focus-mode' : ''
        } ${modes.typewriter ? 'typewriter-mode' : ''}`,
        style: `font-family: ${fontFamily}; font-size: ${fontSize}px; color: ${textColor}; line-height: ${lineSpacing};`,
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onUpdate?.(html);
    },
    onCreate: ({ editor }) => {
      // Set initial line spacing
      if (lineSpacing) {
        editor.commands.setLineSpacing(lineSpacing);
      }
      // Notify parent that editor is ready
      onEditorReady?.(editor);
    },
  });

  const editor = externalEditor || internalEditor;

  // Update editor content when prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  // Update editor font family when store changes
  useEffect(() => {
    if (editor && fontFamily) {
      editor.commands.selectAll();
      editor.commands.setFontFamily(fontFamily);
      editor.commands.focus('end');
    }
  }, [fontFamily, editor]);

  // Update line spacing when store changes
  useEffect(() => {
    if (editor && lineSpacing) {
      editor.commands.setLineSpacing(lineSpacing);
    }
  }, [lineSpacing, editor]);

  // Handle typewriter mode scrolling
  useEffect(() => {
    if (!editor || !modes.typewriter) return;

    const handleUpdate = () => {
      const { view } = editor;
      const { selection } = view.state;
      const coords = view.coordsAtPos(selection.from);
      const editorRect = view.dom.getBoundingClientRect();
      const centerY = window.innerHeight / 2;
      const currentY = coords.top - editorRect.top;
      const scrollOffset = currentY - centerY;

      if (Math.abs(scrollOffset) > 10) {
        const container = view.dom.parentElement;
        if (container) {
          container.scrollBy({
            top: scrollOffset,
            behavior: 'smooth',
          });
        }
      }
    };

    editor.on('selectionUpdate', handleUpdate);
    editor.on('update', handleUpdate);

    return () => {
      editor.off('selectionUpdate', handleUpdate);
      editor.off('update', handleUpdate);
    };
  }, [editor, modes.typewriter]);

  // Auto-save functionality
  useEffect(() => {
    if (!editor || !onAutoSave) return;

    let timeoutId: NodeJS.Timeout;

    const handleUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const html = editor.getHTML();
        onAutoSave(html);
      }, 1000); // Auto-save after 1 second of inactivity
    };

    editor.on('update', handleUpdate);

    return () => {
      clearTimeout(timeoutId);
      editor.off('update', handleUpdate);
    };
  }, [editor, onAutoSave]);

  // Update editable state
  useEffect(() => {
    if (editor) {
      editor.setEditable(editable);
    }
  }, [editable, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="verso-editor-wrapper">
      <EditorContent
        editor={editor}
        className={`${modes.manuscript ? 'manuscript-mode' : ''}`}
      />
    </div>
  );
}

// Export the editor instance hook for use in toolbar components
export { useEditorStore };
