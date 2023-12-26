import { createContext, Dispatch } from 'react';
import { initialSnackbarState } from '../reducers/snackbarReducer.ts';
import { TSnackbarAction } from '../types/snackbarReducer.ts';

export const SnackbarContext = createContext(initialSnackbarState);
export const SnackbarDispatchContext = createContext<Dispatch<TSnackbarAction>>(() => {});
