import { useContext } from 'react';
import { NotesDispatchContext } from '../context/NotesContext.ts';
import { SnackbarDispatchContext } from '../context/SnackbarContext.ts';
import { TNoteCompleted, TNoteId } from '../types/note.ts';
import { SnackbarType } from '../types/snackbarReducer.ts';
import { NoteActions } from '../actions/noteActions.ts';
import { SnackbarActions } from '../actions/snackbarActions.ts';

export function useToggleCompleteNote(delay: number): (id: TNoteId, isCompleted: TNoteCompleted) => Promise<void> {
  const notesDispatch = useContext(NotesDispatchContext);
  const snackbarDispatch = useContext(SnackbarDispatchContext);

  return async function toggleComplete(id: TNoteId, isCompleted: TNoteCompleted): Promise<void> {
    return await new Promise(resolve => {
      notesDispatch({ type: NoteActions.SET_LOADING, payload: true });

      setTimeout(() => {
        notesDispatch({
          type: NoteActions.TOGGLE_COMPLETE,
          payload: { id, isCompleted },
        });
        notesDispatch({ type: NoteActions.SET_LOADING, payload: false });
        snackbarDispatch({
          type: SnackbarActions.SHOW,
          payload: {
            type: SnackbarType.Success,
            message: `The note has been ${isCompleted ? 'completed' : 'restored'}`,
          },
        });
        resolve();
      }, delay);
    });
  };
}
