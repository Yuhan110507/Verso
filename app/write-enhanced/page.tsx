'use client';

import { EnhancedWritePage } from '@/components/Editor';

export default function WriteEnhancedPage() {
  const handleSave = (title: string, content: string) => {
    console.log('Saving:', { title, content });
    // Add your save logic here
  };

  const handlePublish = (title: string, content: string, metadata: any) => {
    console.log('Publishing:', { title, content, metadata });
    // Add your publish logic here
  };

  return (
    <EnhancedWritePage
      initialTitle=""
      initialContent=""
      onSave={handleSave}
      onPublish={handlePublish}
    />
  );
}
