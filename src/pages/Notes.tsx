import { JSX, useCallback, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';

import useNotes from '../hooks/useNotes.ts';
import useTabs from '../hooks/useTabs.ts';
import { Category, INote } from '../types/note.ts';
import { TFormData } from '../types/form.ts';
import { PageUrn } from '../types/nav.ts';
import Heading from '../components/UI/Heading.tsx';
import Subheading from '../components/UI/Subheading.tsx';
import Note from '../components/Note.tsx';
import NotesGrid from '../components/NotesGrid.tsx';
import Tabs from '../components/UI/Tabs/Tabs.tsx';
import Search from '../components/UI/Search.tsx';
import Form from '../components/UI/Form/Form.tsx';
import Modal from '../components/UI/Modal.tsx';

function Notes(): JSX.Element {
  const [notes, setNotes] = useState<INote[]>(useNotes());
  const tabs = useTabs();
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [isAddModalShow, setAddModalShow] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [editedNoteData, setEditedNoteData] = useState<TFormData | null>(null);

  const actualNotes: INote[] = useMemo(() => {
    return notes.filter(({ isCompleted }) => !isCompleted);
  }, [notes]);

  const filteredNotes: INote[] = useMemo(() => {
    if (selectedCategories.length && searchText) {
      return actualNotes.filter(({ category, name, text }) =>
        selectedCategories.some(
          selectedCategory =>
            selectedCategory === category &&
            (name.toLowerCase().includes(searchText.toLowerCase()) ||
              text.toLowerCase().includes(searchText.toLowerCase())),
        ),
      );
    } else if (selectedCategories.length) {
      return actualNotes.filter(({ category }) =>
        selectedCategories.some(selectedCategory => selectedCategory === category),
      );
    } else if (searchText) {
      return actualNotes.filter(
        ({ name, text }) =>
          name.toLowerCase().includes(searchText.toLowerCase()) ||
          text.toLowerCase().includes(searchText.toLowerCase()),
      );
    } else {
      return actualNotes;
    }
  }, [selectedCategories, actualNotes, searchText]);

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

  function handleToggleModal(): void {
    setAddModalShow(prevState => !prevState);
  }

  const handleAddNote = useCallback(
    async (formData: TFormData): Promise<void> => {
      setLoading(prevState => !prevState);

      return new Promise(resolve => {
        const newNotes = [
          {
            ...formData,
            id: String(Number(notes.length ? notes[0].id : 0) + 1),
            date: new Date().toISOString(),
            isCompleted: false,
          },
          ...notes,
        ] as INote[];

        setTimeout(() => {
          localStorage.setItem('notes', JSON.stringify(newNotes));
          setLoading(prevState => !prevState);
          setNotes(newNotes);
          resolve();
        }, 1000);
      });
    },
    [notes],
  );

  function handleAfterAdd(): void {
    handleToggleModal();
    scroll({ left: 0, top: 0, behavior: 'smooth' });
  }

  function handleToggleEditModal(note?: INote): void {
    setEditedNoteData(note ? { id: note.id, name: note.name, text: note.text, category: note.category } : null);
  }

  const handleEdit = useCallback(
    (formData: TFormData): Promise<void> => {
      setLoading(prevState => !prevState);

      return new Promise(resolve => {
        const newNotes = [...notes].map(note => (formData.id !== note.id ? note : { ...note, ...formData }));

        setTimeout(() => {
          localStorage.setItem('notes', JSON.stringify(newNotes));
          setLoading(prevState => !prevState);
          setNotes(newNotes);
          resolve();
        }, 1000);
      });
    },
    [notes],
  );

  function handleAfterEdit(): void {
    handleToggleEditModal();
  }

  const handleDelete = useCallback(
    (note: INote): void => {
      const filteredNotes = notes.filter(({ id }) => id !== note.id);
      localStorage.setItem('notes', JSON.stringify(filteredNotes));
      setNotes(filteredNotes);
    },
    [notes],
  );

  const handleComplete = useCallback(
    (completedNote: INote): void => {
      const newNotes = notes.map(note => (note.id !== completedNote.id ? note : completedNote));
      localStorage.setItem('notes', JSON.stringify(newNotes));
      setNotes(newNotes);
    },
    [notes],
  );

  return (
    <>
      <div className="container py-8 min-h-full">
        <Heading>All notes</Heading>
        <Subheading className="mb-6">
          {actualNotes.length ? (
            'Here is a list of your active notes'
          ) : (
            <>
              <span>You don't have active notes...</span> <br />{' '}
              <span className="text-sm">
                But you can add some on the{' '}
                <NavLink to={PageUrn.Home} className="underline underline-offset-2 hover:no-underline">
                  Home page
                </NavLink>
              </span>
            </>
          )}
        </Subheading>
        <div className="flex flex-col gap-2">
          {actualNotes.length > 0 && (
            <div className="flex flex-col lg:flex-row-reverse sm:justify-between lg:justify-start items-center sm:items-center gap-4 lg:gap-6 mb-2">
              <div className="flex flex-col xs:flex-row-reverse xs:justify-between lg:justify-start items-center gap-6 xs:gap-3 lg:gap-6 w-full lg:w-auto">
                <button
                  className="px-4 py-2 lg:py-[11px] rounded-full whitespace-nowrap text-white bg-orange-400 hover:bg-orange-500 transition-colors"
                  onClick={handleToggleModal}
                >
                  Add a new note
                </button>
                <Tabs<Category> tabs={tabs} selectedCategories={selectedCategories} onChange={handleChangeTabs} />
              </div>
              <Search value={searchText} onSearch={handleSearch} />
            </div>
          )}

          {filteredNotes.length > 0 ? (
            <>
              <NotesGrid>
                {filteredNotes.map(note => (
                  <Note
                    note={note}
                    onComplete={handleComplete}
                    onEdit={handleToggleEditModal}
                    onDelete={handleDelete}
                    key={note.id}
                  />
                ))}
              </NotesGrid>
            </>
          ) : (
            actualNotes.length > 0 && (
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
      <Modal isShow={isAddModalShow} onClose={handleToggleModal}>
        <Form title="Add a new note" isLoading={isLoading} onSubmit={handleAddNote} afterSubmit={handleAfterAdd} />
      </Modal>
      <Modal isShow={Boolean(editedNoteData)} onClose={handleToggleEditModal}>
        <Form
          title="Edit a note"
          formData={editedNoteData}
          isLoading={isLoading}
          onSubmit={handleEdit}
          afterSubmit={handleAfterEdit}
        />
      </Modal>
    </>
  );
}

export default Notes;
