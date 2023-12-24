import { useContext } from 'react';
import { NotesDispatchContext } from '../context/NotesContext.ts';
import { TFormData } from '../types/form.ts';
import { NoteActions } from '../actions/noteActions.ts';

export function useAddNote(delay: number): (formData: TFormData) => Promise<void> {
  const dispatch = useContext(NotesDispatchContext);

  return async function handleAdd(formData: TFormData): Promise<void> {
    return await new Promise(resolve => {
      dispatch({ type: NoteActions.SET_LOADING, payload: true });

      setTimeout(() => {
        dispatch({
          type: NoteActions.ADD,
          payload: formData,
        });
        dispatch({ type: NoteActions.SET_LOADING, payload: false });
        resolve();
      }, delay);
    });
  };
}
