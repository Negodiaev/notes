import { JSX, useContext, useMemo, useState } from 'react';

import { NotesContext } from '../../context/NotesContext.ts';
import { useAddNote } from '../../hooks/useAddNote.ts';
import { useEditNote } from '../../hooks/useEditNote.ts';
import { useSelectedCategories } from '../../hooks/useSelectCategories.ts';
import { useSearch } from '../../hooks/useSearch.ts';
import { useFilterNotes } from '../../hooks/useFilterNotes.ts';
import { INote } from '../../types/note.ts';
import { TFormData } from '../../types/form.ts';
import { Heading } from '../../components/UI/Heading.tsx';
import { NotesGrid } from '../../components/NotesGrid.tsx';
import { Form } from '../../components/UI/Form/Form.tsx';
import { Modal } from '../../components/UI/Modal.tsx';
import { NotesSubheading } from './NotesSubheading.tsx';
import { NotesControls } from './NotesControls.tsx';
import { NotFoundNotes } from './NotFoundNotes.tsx';

function Notes(): JSX.Element {
  const { notes, isLoading } = useContext(NotesContext);
  const [selectedCategories, handleChangeCategories, resetSelectedCategories] = useSelectedCategories();
  const [searchValue, handleSearch] = useSearch();
  const [isAddModalShow, setAddModalShow] = useState<boolean>(false);
  const addNote = useAddNote(1000);
  const editNote = useEditNote(1000);
  const [editedNoteData, setEditedNoteData] = useState<TFormData | null>(null);
  const actualNotes: INote[] = useMemo(() => {
    return notes.filter(({ isCompleted }) => !isCompleted);
  }, [notes]);
  const areActualNotes = useMemo(() => Boolean(actualNotes.length), [actualNotes.length]);
  const filteredNotes = useFilterNotes(actualNotes, selectedCategories, searchValue);

  function handleClearFilters(): void {
    resetSelectedCategories();
    handleSearch('');
  }

  function handleToggleAddModal(): void {
    setAddModalShow(prevState => !prevState);
  }

  function handleAfterAdd(): void {
    handleToggleAddModal();
    scroll({ left: 0, top: 0, behavior: 'smooth' });
  }

  function handleToggleEditModal(note?: INote): void {
    setEditedNoteData(note ? { id: note.id, name: note.name, text: note.text, category: note.category } : null);
  }

  return (
    <>
      <div className="container py-8 min-h-full">
        <Heading>All notes</Heading>
        <NotesSubheading areNoNotes={!actualNotes.length} />
        <div className="flex flex-col gap-2">
          {areActualNotes && (
            <NotesControls
              selectedCategories={selectedCategories}
              searchValue={searchValue}
              onShowAddModal={handleToggleAddModal}
              onChangeTabs={handleChangeCategories}
              onSearch={handleSearch}
            />
          )}
          {filteredNotes.length > 0 ? (
            <NotesGrid notes={filteredNotes} onEdit={handleToggleEditModal} />
          ) : (
            areActualNotes && <NotFoundNotes onClearFilters={handleClearFilters} />
          )}
        </div>
      </div>
      <Modal isShow={isAddModalShow} onClose={handleToggleAddModal}>
        <Form title="Add a new note" isLoading={isLoading} onSubmit={addNote} afterSubmit={handleAfterAdd} />
      </Modal>
      <Modal isShow={Boolean(editedNoteData)} onClose={handleToggleEditModal}>
        <Form
          title="Edit a note"
          formData={editedNoteData}
          isLoading={isLoading}
          onSubmit={editNote}
          afterSubmit={handleToggleEditModal}
        />
      </Modal>
    </>
  );
}

export default Notes;
