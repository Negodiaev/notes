import { ISnackbarState, SnackbarType, TSnackbarAction } from '../types/snackbarReducer.ts';
import { SnackbarActions } from '../actions/snackbarActions.ts';

export const initialSnackbarState: ISnackbarState = { isShow: false, type: SnackbarType.Success, message: '' };

export function snackbarReducer(state: ISnackbarState, action: TSnackbarAction): ISnackbarState {
  const { type, payload } = action;

  switch (type) {
    case SnackbarActions.SHOW:
      return {
        ...state,
        isShow: true,
        type: payload.type,
        message: payload.message,
      };
    case SnackbarActions.RESET:
      return {
        ...state,
        isShow: false,
        type: SnackbarType.Success,
        message: '',
      };
    default:
      throw new Error(`No case for type ${type} found in snackbarReducer.`);
  }
}
