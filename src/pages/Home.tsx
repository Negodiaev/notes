import { JSX, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { NotesContext } from '../context/NotesContext.ts';
import { useAddNote } from '../hooks/useAddNote.ts';
import { PageUrn } from '../types/nav.ts';
import { Heading } from '../components/UI/Heading.tsx';
import { Subheading } from '../components/UI/Subheading.tsx';
import { Button } from '../components/UI/Button.tsx';
import { Modal } from '../components/UI/Modal.tsx';
import { Form } from '../components/UI/Form/Form.tsx';

function Home(): JSX.Element {
  const navigate = useNavigate();
  const [isModalShow, setModalShow] = useState<boolean>(false);
  const { isLoading } = useContext(NotesContext);
  const addNote = useAddNote(1000);

  function handleToggleModal(): void {
    setModalShow(prevState => !prevState);
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
        <Form title="Add a new note" isLoading={isLoading} onSubmit={addNote} afterSubmit={handleAfterSubmit} />
      </Modal>
    </div>
  );
}

export default Home;
