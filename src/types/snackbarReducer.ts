import { SnackbarActions } from '../actions/snackbarActions.ts';

export enum SnackbarType {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

export interface ISnackbarState {
  isShow: boolean;
  type: SnackbarType;
  message: string;
}

interface IShowSnackbarAction {
  type: SnackbarActions.SHOW;
  payload: { type: ISnackbarState['type']; message: ISnackbarState['message'] };
}

interface IResetSnackbarAction {
  type: SnackbarActions.RESET;
  payload: null;
}

export type TSnackbarAction = IShowSnackbarAction | IResetSnackbarAction;
