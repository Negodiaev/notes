import { PropsWithChildren, useEffect, useReducer } from 'react';
import { initialNotesState, noteReducer } from '../reducers/noteReducer.ts';
import { NotesContext, NotesDispatchContext } from './NotesContext.ts';

export function NotesProvider({ children }: PropsWithChildren) {
  const [notesState, dispatch] = useReducer(noteReducer, initialNotesState);
  const { notes } = notesState;

  useEffect(() => {
    if (notes.length) {
      localStorage.setItem('notes', JSON.stringify(notes));
    } else {
      localStorage.removeItem('notes');
    }
  }, [notes]);

  return (
    <NotesContext.Provider value={notesState}>
      <NotesDispatchContext.Provider value={dispatch}>{children}</NotesDispatchContext.Provider>
    </NotesContext.Provider>
  );
}
