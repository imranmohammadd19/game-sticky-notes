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
    <div className="bg-yellow-200 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <h3 className="text-lg font-bold mb-2 break-words">{note.title}</h3>
      <p className="text-gray-700 mb-4 flex-grow break-words">{note.content}</p>
      <div className="flex justify-between items-center mt-auto">
        <span className="text-xs text-gray-500">{new Date(note.createdAt).toLocaleDateString()}</span>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(note)}
            className="p-1 hover:bg-yellow-300 rounded transition-colors duration-200"
          >
            <PencilIcon className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="p-1 hover:bg-yellow-300 rounded transition-colors duration-200"
          >
            <TrashIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard; 