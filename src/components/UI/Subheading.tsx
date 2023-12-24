import { JSX, PropsWithChildren } from 'react';

interface ISubheadingProps extends PropsWithChildren {
  className?: string;
}

export function Subheading({ children, className }: ISubheadingProps): JSX.Element {
  return (
    <h2 className={`mx-auto max-w-2xl text-lg font-medium text-center text-gray-500 dark:text-gray-400 ${className}`}>
      {children}
    </h2>
  );
}
