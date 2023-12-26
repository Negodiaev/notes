import { useContext } from 'react';
import { NotesDispatchContext } from '../context/NotesContext.ts';
import { SnackbarDispatchContext } from '../context/SnackbarContext.ts';
import { TFormData } from '../types/form.ts';
import { SnackbarType } from '../types/snackbarReducer.ts';
import { NoteActions } from '../actions/noteActions.ts';
import { SnackbarActions } from '../actions/snackbarActions.ts';

export function useAddNote(delay: number): (formData: TFormData) => Promise<void> {
  const notesDispatch = useContext(NotesDispatchContext);
  const snackbarDispatch = useContext(SnackbarDispatchContext);

  return async function handleAdd(formData: TFormData): Promise<void> {
    return await new Promise(resolve => {
      notesDispatch({ type: NoteActions.SET_LOADING, payload: true });

      setTimeout(() => {
        notesDispatch({
          type: NoteActions.ADD,
          payload: formData,
        });
        notesDispatch({ type: NoteActions.SET_LOADING, payload: false });
        snackbarDispatch({
          type: SnackbarActions.SHOW,
          payload: {
            type: SnackbarType.Success,
            message: 'The note has been added',
          },
        });

        resolve();
      }, delay);
    });
  };
}
