import { JSX } from 'react';
import { NavLink } from 'react-router-dom';

import { PageUrn } from '../types/nav.ts';
import Nav from './Nav.tsx';

function Header(): JSX.Element {
  return (
    <header className="p-4 bg-gray-100 dark:bg-gray-950">
      <div className="container flex justify-between items-center gap-3">
        <NavLink to={PageUrn.Home} className="font-bold">
          Notes
        </NavLink>
        <Nav />
      </div>
    </header>
  );
}

export default Header;
