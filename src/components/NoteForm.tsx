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
    <form onSubmit={handleSubmit} className="space-y-4 mb-8 animate-fade-in">
      <div className="hover-scale">
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border-2 border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
          required
        />
      </div>
      <div className="hover-scale">
        <textarea
          placeholder="Enter Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border-2 border-yellow-400 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-yellow-400 text-gray-800 px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg animate-bounce-hover"
      >
        {noteToEdit ? 'Update Note' : 'Add Note'}
      </button>
    </form>
  );
};

export default NoteForm; 