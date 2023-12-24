import { NoteActions } from '../actions/noteActions.ts';
import { INote, TNoteCompleted, TNoteId } from './note.ts';
import { TFormData } from './form.ts';

export interface INotesState {
  notes: INote[];
  isLoading: boolean;
}

interface IAddNoteAction {
  type: NoteActions.ADD;
  payload: TFormData;
}

interface IEditNoteAction {
  type: NoteActions.EDIT;
  payload: TFormData;
}

interface IToggleCompleteNoteAction {
  type: NoteActions.TOGGLE_COMPLETE;
  payload: { id: TNoteId; isCompleted: TNoteCompleted };
}

interface IDeleteNoteAction {
  type: NoteActions.DELETE;
  payload: TNoteId;
}

interface ISetLoadingAction {
  type: NoteActions.SET_LOADING;
  payload: boolean;
}

export type TNoteAction =
  | IAddNoteAction
  | IEditNoteAction
  | IToggleCompleteNoteAction
  | IDeleteNoteAction
  | ISetLoadingAction;
