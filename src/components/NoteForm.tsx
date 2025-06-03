import React, { useState, useEffect } from 'react';
import { Note } from '../types';

interface NoteFormProps {
  noteToEdit?: Note;
  onSubmit: (note: Omit<Note, 'id' | 'createdAt'>) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ noteToEdit, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
    }
  }, [noteToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onSubmit({ title: title.trim(), content: content.trim() });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div>
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>
      <div>
        <textarea
          placeholder="Enter Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded h-24 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500 transition-colors duration-200"
      >
        {noteToEdit ? 'Update Note' : 'Add Note'}
      </button>
    </form>
  );
};

export default NoteForm; 