import { JSX } from 'react';
import { Link } from 'react-router-dom';
import IconGithub from '../assets/icons/github.svg?react';

export function Footer(): JSX.Element {
  return (
    <footer className="p-4 bg-gray-100 dark:bg-gray-950">
      <div className="container flex justify-between items-center">
        <p className="text-sm">
          Created by{' '}
          <Link
            to="https://negodiaev.github.io"
            target="_blank"
            className="underline underline-offset-2 hover:no-underline"
          >
            Alex Negodiaev
          </Link>
        </p>
        <Link
          to="https://github.com/Negodiaev"
          target="_blank"
          className="transition-colors hover:text-gray-600 dark:hover:text-gray-300"
        >
          <IconGithub className="w-5 h-5" />
        </Link>
      </div>
    </footer>
  );
}
