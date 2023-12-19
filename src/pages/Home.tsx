import { JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useNotes from '../hooks/useNotes.ts';
import { PageUrn } from '../types/nav.ts';
import { INote } from '../types/note.ts';
import { TFormData } from '../types/form.ts';
import Heading from '../components/UI/Heading.tsx';
import Subheading from '../components/UI/Subheading.tsx';
import Button from '../components/UI/Button.tsx';
import Modal from '../components/UI/Modal.tsx';
import Form from '../components/UI/Form/Form.tsx';

function Home(): JSX.Element {
  const navigate = useNavigate();
  const notes = useNotes();
  const [isModalShow, setModalShow] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  function handleToggleModal(): void {
    setModalShow(prevState => !prevState);
  }

  function handleAddNote(formData: TFormData): Promise<void> {
    setLoading(prevState => !prevState);

    return new Promise(resolve => {
      setTimeout(() => {
        localStorage.setItem(
          'notes',
          JSON.stringify([
            {
              ...formData,
              id: String(Number(notes.length ? notes[0].id : 0) + 1),
              date: new Date().toISOString(),
              isCompleted: false,
            },
            ...notes,
          ] as INote[]),
        );

        setLoading(prevState => !prevState);
        resolve();
      }, 1000);
    });
  }

  function handleAfterSubmit(): void {
    handleToggleModal();
    navigate(PageUrn.Notes);
  }

  return (
    <div className="container flex flex-col justify-center items-center gap-4 py-8 min-h-full">
      <div className="flex flex-col gap-2 mb-4">
        <Heading>Create a note</Heading>
        <Subheading>You can create a note right here. Add the button below.</Subheading>
      </div>
      <Button onClick={handleToggleModal}>Add a note</Button>
      <Modal isShow={isModalShow} onClose={handleToggleModal}>
        <Form title="Add a new note" isLoading={isLoading} onSubmit={handleAddNote} afterSubmit={handleAfterSubmit} />
      </Modal>
    </div>
  );
}

export default Home;
