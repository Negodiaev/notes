import { JSX, useCallback, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';

import useNotes from '../hooks/useNotes.ts';
import useTabs from '../hooks/useTabs.ts';

import { Category, INote } from '../types/note.ts';
import { PageUrn } from '../types/nav.ts';

import Heading from '../components/UI/Heading.tsx';
import Subheading from '../components/UI/Subheading.tsx';
import NotesGrid from '../components/NotesGrid.tsx';
import Note from '../components/UI/Note/Note.tsx';
import Tabs from '../components/UI/Tabs/Tabs.tsx';
import Search from '../components/UI/Search.tsx';

function CompletedNotes(): JSX.Element {
  const [notes, setNotes] = useState<INote[]>(useNotes());
  const tabs = useTabs();
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  const completedNotes: INote[] = useMemo(() => {
    return notes.filter(({ isCompleted }) => isCompleted);
  }, [notes]);

  const filteredNotes: INote[] = useMemo(() => {
    if (selectedCategories.length && searchText) {
      return completedNotes.filter(({ category, name, text }) =>
        selectedCategories.some(
          selectedCategory =>
            selectedCategory === category &&
            (name.toLowerCase().includes(searchText.toLowerCase()) ||
              text.toLowerCase().includes(searchText.toLowerCase())),
        ),
      );
    } else if (selectedCategories.length) {
      return completedNotes.filter(({ category }) =>
        selectedCategories.some(selectedCategory => selectedCategory === category),
      );
    } else if (searchText) {
      return completedNotes.filter(
        ({ name, text }) =>
          name.toLowerCase().includes(searchText.toLowerCase()) ||
          text.toLowerCase().includes(searchText.toLowerCase()),
      );
    } else {
      return completedNotes;
    }
  }, [selectedCategories, completedNotes, searchText]);

  function handleSearch(searchText: string): void {
    setSearchText(searchText);
  }

  function handleChangeTabs(value: Category, isSelected: boolean): void {
    setSelectedCategories(prevState => {
      if (isSelected) {
        return [...prevState, value];
      } else {
        return [...prevState].filter(val => val !== value);
      }
    });
  }

  function handleClearFilters(): void {
    setSelectedCategories([]);
    setSearchText('');
  }

  const handleDelete = useCallback(
    (note: INote): void => {
      const filteredNotes = notes.filter(({ id }) => id !== note.id);
      localStorage.setItem('notes', JSON.stringify(filteredNotes));
      setNotes(filteredNotes);
    },
    [notes],
  );

  const handleRestore = useCallback(
    (restoredNote: INote): void => {
      const newNotes = notes.map(note => (note.id !== restoredNote.id ? note : restoredNote));
      localStorage.setItem('notes', JSON.stringify(newNotes));
      setNotes(newNotes);
    },
    [notes],
  );

  return (
    <>
      <div className="container py-8 min-h-full">
        <Heading>Completed notes</Heading>
        <Subheading className="mb-6">
          {completedNotes.length ? (
            'Here is a list of your completed notes'
          ) : (
            <>
              <span>You don't have completed notes...</span> <br />{' '}
              <span className="text-sm">
                You can see your actual notes{' '}
                <NavLink to={PageUrn.Notes} className="underline underline-offset-2 hover:no-underline">
                  here
                </NavLink>
              </span>
            </>
          )}
        </Subheading>
        <div className="flex flex-col gap-2">
          {completedNotes.length > 0 && (
            <div className="flex flex-col sm:flex-row-reverse sm:justify-between lg:justify-start items-center sm:items-center gap-4 lg:gap-6 mb-2">
              <div className="flex flex-col lg:justify-start items-center gap-6 xs:gap-3 lg:gap-6 w-full sm:w-auto">
                <Tabs<Category> tabs={tabs} selectedCategories={selectedCategories} onChange={handleChangeTabs} />
              </div>
              <Search value={searchText} onSearch={handleSearch} />
            </div>
          )}

          {filteredNotes.length > 0 ? (
            <>
              <NotesGrid>
                {filteredNotes.map(note => (
                  <Note note={note} onComplete={handleRestore} onDelete={handleDelete} key={note.id} />
                ))}
              </NotesGrid>
            </>
          ) : (
            completedNotes.length > 0 && (
              <div className="text-center">
                <p className="text-lg">Nothing has been found...</p>
                <button className="text-blue-400 underline hover:no-underline" onClick={handleClearFilters}>
                  Clear filters
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default CompletedNotes;
