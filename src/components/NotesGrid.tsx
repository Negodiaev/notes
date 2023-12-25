import { JSX, useCallback, useContext, useState } from 'react';
import clsx from 'clsx';

import { NotesContext } from '../context/NotesContext.ts';
import { useToggleCompleteNote } from '../hooks/useToggleCompleteNote.ts';
import { useDeleteNote } from '../hooks/useDeleteNote.ts';
import { INote, TNoteId } from '../types/note.ts';
import { Note } from './UI/Note/Note.tsx';
import { ConfirmationModal } from './ConfirmationModal.tsx';

interface INotesGridProps {
  notes: INote[];
  className?: string;
  onEdit?: (note: INote) => void;
}

export function NotesGrid({ notes, onEdit, className = '' }: INotesGridProps): JSX.Element {
  const { isLoading } = useContext(NotesContext);
  const toggleCompleteNote = useToggleCompleteNote(500);
  const deleteNote = useDeleteNote(1000);
  const [deletedNoteId, setDeletedNoteId] = useState<TNoteId | null>(null);

  function handleSetDeletedNoteId(id: TNoteId): void {
    setDeletedNoteId(id);
  }

  function handleCloseConfirmation(): void {
    setDeletedNoteId(null);
  }

  const handleDeleteNote = useCallback(() => {
    if (deletedNoteId) {
      deleteNote(deletedNoteId).then(() => {
        handleCloseConfirmation();
      });
    }
  }, [deletedNoteId]);

  return (
    <>
      <div
        className={clsx('grid grid-cols-[repeat(auto-fill,minmax(288px,1fr))] justify-center gap-4 w-full', className)}
      >
        {notes.map(note => (
          <Note
            note={note}
            onToggleComplete={toggleCompleteNote}
            onEdit={onEdit}
            onDelete={handleSetDeletedNoteId}
            key={note.id}
          />
        ))}
      </div>
      <ConfirmationModal
        isShow={Boolean(deletedNoteId)}
        isLoading={isLoading}
        onClose={handleCloseConfirmation}
        onConfirm={handleDeleteNote}
      />
    </>
  );
}
