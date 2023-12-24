import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import { PageUrn } from './types/nav.ts';
import Home from './pages/Home.tsx';
import Notes from './pages/Notes/Notes.tsx';
import CompletedNotes from './pages/CompletedNotes.tsx';
import App from './App.tsx';

const router = createBrowserRouter([
  {
    path: PageUrn.Home,
    element: <App />,
    children: [
      { path: PageUrn.Home, element: <Home />, index: true },
      { path: PageUrn.Notes, element: <Notes /> },
      { path: PageUrn.CompletedNotes, element: <CompletedNotes /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
