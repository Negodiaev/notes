import { useContext } from 'react';
import { NotesContext } from '../context/NotesContext.ts';
import { INote } from '../types/note.ts';

export function useActualNotes(): INote[] {
  const { notes } = useContext(NotesContext);

  return notes.length ? notes.filter(({ isCompleted }) => !isCompleted) : notes;
}
