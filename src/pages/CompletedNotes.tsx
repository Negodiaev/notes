import { JSX, useContext, useMemo } from 'react';
import { NavLink } from 'react-router-dom';

import { NotesContext } from '../context/NotesContext.ts';
import { useTabs } from '../hooks/useTabs.ts';
import { useFilterNotes } from '../hooks/useFilterNotes.ts';
import { useSelectedCategories } from '../hooks/useSelectCategories.ts';
import { useSearch } from '../hooks/useSearch.ts';
import { Category, INote } from '../types/note.ts';
import { PageUrn } from '../types/nav.ts';
import { Heading } from '../components/UI/Heading.tsx';
import { Subheading } from '../components/UI/Subheading.tsx';
import { NotesGrid } from '../components/NotesGrid.tsx';
import { Tabs } from '../components/UI/Tabs/Tabs.tsx';
import { Search } from '../components/UI/Search.tsx';

function CompletedNotes(): JSX.Element {
  const { notes } = useContext(NotesContext);
  const tabs = useTabs();
  const [selectedCategories, handleChangeCategories, resetSelectedCategories] = useSelectedCategories();
  const [searchValue, handleSearch] = useSearch();
  const completedNotes: INote[] = useMemo(() => {
    return notes.filter(({ isCompleted }) => isCompleted);
  }, [notes]);
  const filteredNotes = useFilterNotes(completedNotes, selectedCategories, searchValue);

  function handleClearFilters(): void {
    resetSelectedCategories();
    handleSearch('');
  }

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
                <Tabs<Category> tabs={tabs} selectedCategories={selectedCategories} onChange={handleChangeCategories} />
              </div>
              <Search value={searchValue} onSearch={handleSearch} />
            </div>
          )}

          {filteredNotes.length > 0 ? (
            <NotesGrid notes={filteredNotes} />
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
