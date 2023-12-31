import { JSX } from 'react';
import { Outlet } from 'react-router-dom';

import { NotesProvider } from './context/NotesProvider.tsx';
import { SnackbarProvider } from './context/SnackbarProvider.tsx';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { Snackbar } from './components/UI/Snackbar.tsx';

function App(): JSX.Element {
  return (
    <NotesProvider>
      <SnackbarProvider>
        <div className="grid grid-rows-[1fr,auto] min-h-[100dvh] bg-white dark:bg-gray-800">
          <Header className="fixed top-0 left-0 right-0 z-[2] shadow-xl" />
          <main className="px-4 pt-[56px] bg-white dark:bg-gray-900">
            <Outlet />
          </main>
          <Footer />
        </div>
        <Snackbar />
      </SnackbarProvider>
    </NotesProvider>
  );
}

export default App;
