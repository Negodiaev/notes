import { JSX, PropsWithChildren, useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

import { SnackbarContext, SnackbarDispatchContext } from '../../context/SnackbarContext.ts';
import { SnackbarActions } from '../../actions/snackbarActions.ts';
import { SnackbarType } from '../../types/snackbarReducer.ts';

interface ISnackbarProps extends PropsWithChildren {
  delay?: number;
}

export function Snackbar({ delay = 3000 }: ISnackbarProps): JSX.Element {
  const { isShow, type, message } = useContext(SnackbarContext);
  const dispatch = useContext(SnackbarDispatchContext);

  useEffect(() => {
    if (isShow) {
      setTimeout(() => {
        dispatch({ type: SnackbarActions.RESET, payload: null });
      }, delay);
    }
  }, [isShow, delay, dispatch]);

  return createPortal(
    <p
      className={clsx(
        'fixed left-1/2 -translate-x-1/2 overflow-hidden px-4 py-2 max-w-[calc(100%-32px)] rounded-lg text-sm whitespace-nowrap text-ellipsis text-white bg-blue-400',
        {
          ['bg-emerald-500/[.8]']: type === SnackbarType.Success,
          ['bg-sky-500/[.8]']: type === SnackbarType.Info,
          ['bg-amber-500/[.8]']: type === SnackbarType.Warning,
          ['bg-rose-500/[.8]']: type === SnackbarType.Error,
        },
        isShow && 'animate-slide-in',
      )}
    >
      {message}
    </p>,
    document.getElementById('root')!,
  );
}
