import { PropsWithChildren, useReducer } from 'react';
import { initialSnackbarState, snackbarReducer } from '../reducers/snackbarReducer.ts';
import { SnackbarContext, SnackbarDispatchContext } from './SnackbarContext.ts';

export function SnackbarProvider({ children }: PropsWithChildren) {
  const [snackbarState, dispatch] = useReducer(snackbarReducer, initialSnackbarState);

  return (
    <SnackbarContext.Provider value={snackbarState}>
      <SnackbarDispatchContext.Provider value={dispatch}>{children}</SnackbarDispatchContext.Provider>
    </SnackbarContext.Provider>
  );
}
