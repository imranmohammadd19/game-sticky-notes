import React from 'react';
import { Note } from '../types';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  return (
    <div className="bg-yellow-400 p-4 rounded-lg batman-shadow hover:shadow-xl transition-all duration-300 flex flex-col animate-fade-in hover-scale hover-rotate backdrop-blur-sm bg-opacity-90">
      <h3 className="text-lg font-bold mb-2 break-words text-gray-800">{note.title}</h3>
      <p className="text-gray-700 mb-4 flex-grow break-words">{note.content}</p>
      <div className="flex justify-between items-center mt-auto">
        <span className="text-xs text-gray-600">{new Date(note.createdAt).toLocaleDateString()}</span>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(note)}
            className="p-2 bg-yellow-500 hover:bg-yellow-600 rounded transition-colors duration-200 animate-bounce-hover batman-shadow"
          >
            <PencilIcon className="h-5 w-5 text-white" />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="p-2 bg-red-500 hover:bg-red-600 rounded transition-colors duration-200 animate-bounce-hover batman-shadow"
          >
            <TrashIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard; 