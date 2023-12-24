import { useContext } from 'react';
import { NotesDispatchContext } from '../context/NotesContext.ts';
import { TNoteCompleted, TNoteId } from '../types/note.ts';
import { NoteActions } from '../actions/noteActions.ts';

export function useToggleCompleteNote(delay: number): (id: TNoteId, isCompleted: TNoteCompleted) => Promise<void> {
  const dispatch = useContext(NotesDispatchContext);

  return async function toggleComplete(id: TNoteId, isCompleted: TNoteCompleted): Promise<void> {
    return await new Promise(resolve => {
      dispatch({ type: NoteActions.SET_LOADING, payload: true });

      setTimeout(() => {
        dispatch({
          type: NoteActions.TOGGLE_COMPLETE,
          payload: { id, isCompleted },
        });
        dispatch({ type: NoteActions.SET_LOADING, payload: false });
        resolve();
      }, delay);
    });
  };
}
