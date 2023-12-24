import { getArrayFromLS } from '../utils/getArrayFromLS.ts';
import { generateNextId } from '../utils/generateNextId.ts';
import { NoteActions } from '../actions/noteActions.ts';
import { INote } from '../types/note.ts';
import { INotesState, TNoteAction } from '../types/noteReducer.ts';

export const initialNotesState: INotesState = { notes: getArrayFromLS<INote>('notes'), isLoading: false };

export function noteReducer(state: INotesState, action: TNoteAction): INotesState {
  const { type, payload } = action;

  switch (type) {
    case NoteActions.ADD:
      return {
        ...state,
        notes: [
          { ...payload, id: String(generateNextId(state.notes)), date: new Date().toISOString(), isCompleted: false },
          ...state.notes,
        ],
      };
    case NoteActions.EDIT:
      return {
        ...state,
        notes: [...state.notes].map(note => (payload.id !== note.id ? note : { ...note, ...payload })),
      };
    case NoteActions.TOGGLE_COMPLETE:
      return {
        ...state,
        notes: [...state.notes].map(note =>
          note.id !== payload.id ? note : { ...note, isCompleted: payload.isCompleted },
        ),
      };
    case NoteActions.DELETE:
      return { ...state, notes: [...state.notes].filter(note => note.id !== payload) };
    case NoteActions.SET_LOADING:
      return { ...state, isLoading: payload };
    default:
      throw new Error(`No case for type ${type} found in noteReducer.`);
  }
}
