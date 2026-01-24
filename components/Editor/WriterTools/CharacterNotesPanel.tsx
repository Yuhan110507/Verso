'use client';

import { useState } from 'react';
import { useEditorStore } from '@/lib/stores/editorStore';

export function CharacterNotesPanel() {
  const { characterNotes, sceneNotes, addCharacterNote, addSceneNote, deleteCharacterNote, deleteSceneNote } = useEditorStore();
  const [activeTab, setActiveTab] = useState<'characters' | 'scenes'>('characters');
  const [isOpen, setIsOpen] = useState(false);
  const [newCharName, setNewCharName] = useState('');
  const [newCharDesc, setNewCharDesc] = useState('');
  const [newSceneTitle, setNewSceneTitle] = useState('');
  const [newSceneSummary, setNewSceneSummary] = useState('');

  const handleAddCharacter = () => {
    if (newCharName.trim()) {
      addCharacterNote({
        name: newCharName,
        description: newCharDesc,
        notes: '',
      });
      setNewCharName('');
      setNewCharDesc('');
    }
  };

  const handleAddScene = () => {
    if (newSceneTitle.trim()) {
      addSceneNote({
        title: newSceneTitle,
        summary: newSceneSummary,
        notes: '',
      });
      setNewSceneTitle('');
      setNewSceneSummary('');
    }
  };

  return (
    <div className={`fixed top-[116px] right-0 h-[calc(100vh-116px)] bg-verso-cream border-l border-gray-200 shadow-lg transition-all duration-300 z-30 ${isOpen ? 'w-80' : 'w-12'}`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 -left-10 bg-verso-burgundy text-white px-2 py-2 rounded-l hover:bg-opacity-90 transition-colors"
        title={isOpen ? 'Close Notes' : 'Open Notes'}
      >
        {isOpen ? '→' : '←'}
      </button>

      {isOpen && (
        <div className="h-full flex flex-col p-4">
          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab('characters')}
              className={`flex-1 px-3 py-2 rounded ${
                activeTab === 'characters' ? 'bg-verso-burgundy text-white' : 'bg-white'
              }`}
            >
              Characters
            </button>
            <button
              onClick={() => setActiveTab('scenes')}
              className={`flex-1 px-3 py-2 rounded ${
                activeTab === 'scenes' ? 'bg-verso-burgundy text-white' : 'bg-white'
              }`}
            >
              Scenes
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'characters' ? (
              <div>
                <h3 className="font-semibold mb-2">Characters</h3>
                <div className="space-y-2 mb-4">
                  {characterNotes.map((char) => (
                    <div key={char.id} className="bg-white p-3 rounded shadow-sm">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium">{char.name}</h4>
                          {char.description && (
                            <p className="text-sm text-gray-600 mt-1">{char.description}</p>
                          )}
                        </div>
                        <button
                          onClick={() => deleteCharacterNote(char.id)}
                          className="text-red-500 hover:text-red-700 ml-2"
                          title="Delete"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-white p-3 rounded">
                  <input
                    type="text"
                    placeholder="Character name"
                    value={newCharName}
                    onChange={(e) => setNewCharName(e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded mb-2"
                  />
                  <textarea
                    placeholder="Description"
                    value={newCharDesc}
                    onChange={(e) => setNewCharDesc(e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded mb-2"
                    rows={2}
                  />
                  <button
                    onClick={handleAddCharacter}
                    className="w-full bg-verso-burgundy text-white px-3 py-1 rounded hover:bg-opacity-90"
                  >
                    Add Character
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-semibold mb-2">Scenes</h3>
                <div className="space-y-2 mb-4">
                  {sceneNotes.map((scene) => (
                    <div key={scene.id} className="bg-white p-3 rounded shadow-sm">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium">{scene.title}</h4>
                          {scene.summary && (
                            <p className="text-sm text-gray-600 mt-1">{scene.summary}</p>
                          )}
                        </div>
                        <button
                          onClick={() => deleteSceneNote(scene.id)}
                          className="text-red-500 hover:text-red-700 ml-2"
                          title="Delete"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-white p-3 rounded">
                  <input
                    type="text"
                    placeholder="Scene title"
                    value={newSceneTitle}
                    onChange={(e) => setNewSceneTitle(e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded mb-2"
                  />
                  <textarea
                    placeholder="Summary"
                    value={newSceneSummary}
                    onChange={(e) => setNewSceneSummary(e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded mb-2"
                    rows={2}
                  />
                  <button
                    onClick={handleAddScene}
                    className="w-full bg-verso-burgundy text-white px-3 py-1 rounded hover:bg-opacity-90"
                  >
                    Add Scene
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
