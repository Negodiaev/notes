import { JSX } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useNavItems } from '../hooks/useNavItems.ts';

export function Nav(): JSX.Element {
  const navItems = useNavItems();

  return (
    <nav>
      <ul className="flex items-center gap-3 xs:gap-5">
        {navItems.map(({ name, urn }) => (
          <li key={urn}>
            <NavLink
              to={urn}
              className={({ isActive }) =>
                clsx(
                  'hover:underline hover:underline-offset-2',
                  isActive && 'font-medium text-orange-500 dark:text-orange-500 hover:no-underline',
                )
              }
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
