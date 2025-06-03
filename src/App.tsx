import React, { useState, useEffect } from 'react';
import { Note } from './types';
import NoteCard from './components/NoteCard';
import NoteForm from './components/NoteForm';
import SearchBar from './components/SearchBar';

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNote, setEditingNote] = useState<Note | undefined>(undefined);

  // Load notes from localStorage on initial render
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (noteData: Omit<Note, 'id' | 'createdAt'>) => {
    const newNote: Note = {
      ...noteData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
  };

  const updateNote = (noteData: Omit<Note, 'id' | 'createdAt'>) => {
    if (!editingNote) return;
    
    const updatedNotes = notes.map((note) =>
      note.id === editingNote.id
        ? { ...note, ...noteData }
        : note
    );
    setNotes(updatedNotes);
    setEditingNote(undefined);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-red-900 to-red-800 relative">
      <div className="content-wrapper max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-yellow-400 animate-bounce-hover">
          Game Sticky Notes
        </h1>
        
        <div className="bg-yellow-50 p-6 rounded-lg batman-shadow mb-8 animate-slide-in hover-scale backdrop-blur-sm bg-opacity-95">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            {editingNote ? 'Edit Note' : 'Create New Note'}
          </h2>
          <NoteForm
            noteToEdit={editingNote}
            onSubmit={editingNote ? updateNote : addNote}
          />
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg batman-shadow animate-fade-in hover-scale backdrop-blur-sm bg-opacity-95">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Search Notes</h2>
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={setEditingNote}
                onDelete={deleteNote}
              />
            ))}
          </div>

          {filteredNotes.length === 0 && (
            <p className="text-center text-gray-500 mt-4 animate-fade-in">
              {searchQuery
                ? 'No notes found matching your search.'
                : 'No notes yet. Create one!'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
