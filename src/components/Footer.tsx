import { JSX } from 'react';
import { Link } from 'react-router-dom';
import githubIcon from '../assets/icon-github.svg';

function Footer(): JSX.Element {
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
        <Link to="https://github.com/Negodiaev" target="_blank">
          <img src={githubIcon} width={20} className="dark:invert" alt="Github icon" />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
