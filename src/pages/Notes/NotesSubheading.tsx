import { JSX } from 'react';
import { NavLink } from 'react-router-dom';

import { PageUrn } from '../../types/nav.ts';
import { Subheading } from '../../components/UI/Subheading.tsx';

export function NotesSubheading({ areNoNotes }: { areNoNotes: boolean }): JSX.Element {
  return (
    <Subheading className="mb-6">
      {areNoNotes ? (
        <>
          <span>You don't have actual notes...</span> <br />{' '}
          <span className="text-sm">
            But you can add some on the{' '}
            <NavLink to={PageUrn.Home} className="underline underline-offset-2 hover:no-underline">
              Home page
            </NavLink>
          </span>
        </>
      ) : (
        'Here is a list of your actual notes'
      )}
    </Subheading>
  );
}
