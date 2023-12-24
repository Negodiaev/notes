import { JSX, PropsWithChildren, MouseEvent, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const classes =
  'flex-none rounded-lg bg-gray-900 px-6 py-3 font-semibold text-gray-100 shadow-md transition-colors hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:bg-gray-400';
const classesDark = 'dark:text-gray-800 dark:bg-gray-100 dark:hover:text-gray-100 dark:disabled:hover:text-gray-800';

export function Button({ children, className = '', onClick, ...rest }: IButtonProps): JSX.Element {
  return (
    <button {...rest} className={clsx(classes, classesDark, className)} onClick={onClick}>
      {children}
    </button>
  );
}
