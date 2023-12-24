import { JSX } from 'react';
import clsx from 'clsx';

import { useToggleCompleteNote } from '../hooks/useToggleCompleteNote.ts';
import { useDeleteNote } from '../hooks/useDeleteNote.ts';
import { INote } from '../types/note.ts';
import { Note } from './UI/Note/Note.tsx';

interface INotesGridProps {
  notes: INote[];
  className?: string;
  onEdit?: (note: INote) => void;
}

export function NotesGrid({ notes, onEdit, className = '' }: INotesGridProps): JSX.Element {
  const toggleCompleteNote = useToggleCompleteNote(500);
  const deleteNote = useDeleteNote(500);

  return (
    <div
      className={clsx('grid grid-cols-[repeat(auto-fill,minmax(288px,1fr))] justify-center gap-4 w-full', className)}
    >
      {notes.map(note => (
        <Note note={note} onToggleComplete={toggleCompleteNote} onEdit={onEdit} onDelete={deleteNote} key={note.id} />
      ))}
    </div>
  );
}
