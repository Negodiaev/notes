import React, { PropsWithChildren, JSX } from 'react';
import clsx from 'clsx';

interface INotesGridProps extends PropsWithChildren {
  className?: string;
}

function NotesGrid({ children, className = '' }: INotesGridProps): JSX.Element {
  return (
    <div
      className={clsx('grid grid-cols-[repeat(auto-fill,minmax(288px,1fr))] justify-center gap-4 w-full', className)}
    >
      {children}
    </div>
  );
}

export default NotesGrid;
