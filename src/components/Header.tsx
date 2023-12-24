import { JSX } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import { PageUrn } from '../types/nav.ts';
import { Nav } from './Nav.tsx';

interface IHeaderProps {
  className?: string;
}

export function Header({ className }: IHeaderProps): JSX.Element {
  return (
    <header className={clsx('p-4 bg-gray-100 dark:bg-gray-950', className)}>
      <div className="container flex justify-between items-center gap-3">
        <NavLink to={PageUrn.Home} className="font-bold">
          Notes
        </NavLink>
        <Nav />
      </div>
    </header>
  );
}
