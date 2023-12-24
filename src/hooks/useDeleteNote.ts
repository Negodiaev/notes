import { useContext } from 'react';
import { NotesDispatchContext } from '../context/NotesContext.ts';
import { TNoteId } from '../types/note.ts';
import { NoteActions } from '../actions/noteActions.ts';

export function useDeleteNote(delay: number): (id: TNoteId) => Promise<void> {
  const dispatch = useContext(NotesDispatchContext);

  return async function handleDelete(id: TNoteId): Promise<void> {
    return await new Promise(resolve => {
      dispatch({ type: NoteActions.SET_LOADING, payload: true });

      setTimeout(() => {
        dispatch({
          type: NoteActions.DELETE,
          payload: id,
        });
        dispatch({ type: NoteActions.SET_LOADING, payload: false });
        resolve();
      }, delay);
    });
  };
}
