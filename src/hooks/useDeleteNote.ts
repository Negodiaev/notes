import { useContext } from 'react';
import { NotesDispatchContext } from '../context/NotesContext.ts';
import { SnackbarDispatchContext } from '../context/SnackbarContext.ts';
import { TNoteId } from '../types/note.ts';
import { SnackbarType } from '../types/snackbarReducer.ts';
import { NoteActions } from '../actions/noteActions.ts';
import { SnackbarActions } from '../actions/snackbarActions.ts';

export function useDeleteNote(delay: number): (id: TNoteId) => Promise<void> {
  const notesDispatch = useContext(NotesDispatchContext);
  const snackbarDispatch = useContext(SnackbarDispatchContext);

  return async function handleDelete(id: TNoteId): Promise<void> {
    return await new Promise(resolve => {
      notesDispatch({ type: NoteActions.SET_LOADING, payload: true });

      setTimeout(() => {
        notesDispatch({
          type: NoteActions.DELETE,
          payload: id,
        });
        notesDispatch({ type: NoteActions.SET_LOADING, payload: false });
        snackbarDispatch({
          type: SnackbarActions.SHOW,
          payload: {
            type: SnackbarType.Success,
            message: 'The note has been deleted',
          },
        });
        resolve();
      }, delay);
    });
  };
}
