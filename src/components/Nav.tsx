import { JSX } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import { useNavItems } from '../hooks/useNavItems.ts';
import { useActualNotes } from '../hooks/useActualNotes.ts';
import { PageUrn } from '../types/nav.ts';

const MAX_NOTES_LENGTH = 99;

export function Nav(): JSX.Element {
  const navItems = useNavItems();
  const actualNotes = useActualNotes();
  const notesCountLabel: string =
    actualNotes.length > MAX_NOTES_LENGTH
      ? `${MAX_NOTES_LENGTH}+`
      : actualNotes.length > 0
        ? String(actualNotes.length)
        : '';

  return (
    <nav>
      <ul className="flex items-center gap-3 xs:gap-5">
        {navItems.map(({ name, urn }) => (
          <li key={urn}>
            <NavLink
              to={urn}
              className={({ isActive }) =>
                clsx(
                  'relative hover:underline hover:underline-offset-2',
                  isActive && 'font-medium text-orange-500 dark:text-orange-500 hover:no-underline',
                )
              }
            >
              {name}
              {urn === PageUrn.Notes && notesCountLabel && (
                <div className="absolute -top-3.5 -right-3.5 flex justify-center items-center px-1 min-w-[20px] h-5 rounded-full text-xs font-semibold border border-orange-500 text-orange-500">
                  {notesCountLabel}
                </div>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
