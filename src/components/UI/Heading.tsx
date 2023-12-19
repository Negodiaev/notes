import { JSX, PropsWithChildren } from 'react';

function Heading({ children }: PropsWithChildren): JSX.Element {
  return <h1 className="mb-4 text-2xl font-bold text-center">{children}</h1>;
}

export default Heading;
