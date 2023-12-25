import { JSX } from 'react';
import clsx from 'clsx';

interface IButtonLoaderProps {
  title: string;
  isLoading: boolean;
  className?: string;
}

export function ButtonLoader({ title, isLoading, className }: IButtonLoaderProps): JSX.Element | string {
  return isLoading ? (
    <div className={clsx('flex justify-center items-center gap-4', className)}>
      <span className="shrink-0 w-6 h-6 border-2 border-r-0 border-white rounded-full animate-spin dark:border-gray-500" />{' '}
      Loading...
    </div>
  ) : (
    title
  );
}
