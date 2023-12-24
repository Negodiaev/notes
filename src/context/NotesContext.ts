import { createContext, Dispatch } from 'react';
import { initialNotesState } from '../reducers/noteReducer.ts';
import { TNoteAction } from '../types/noteReducer.ts';

export const NotesContext = createContext(initialNotesState);
export const NotesDispatchContext = createContext<Dispatch<TNoteAction>>(() => {});
