import { INote } from '../types/note.ts';

export default function useNotes(): INote[] {
  const notes: INote[] = JSON.parse(localStorage.getItem('notes') || '[]');
  return [...notes];
}
