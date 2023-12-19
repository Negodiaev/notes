import { JSX } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';

function App(): JSX.Element {
  return (
    <div className="grid grid-rows-[auto,1fr,auto] min-h-screen bg-white dark:bg-gray-800">
      <Header />
      <main className="px-4 bg-white dark:bg-gray-900">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
