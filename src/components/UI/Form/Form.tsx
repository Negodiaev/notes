import { ChangeEvent, FormEvent, JSX, useId, useState, useMemo } from 'react';
import clsx from 'clsx';

import useCategoryOptions from '../../../hooks/useCategoryOptions.ts';
import { Category } from '../../../types/note.ts';
import { TFormData } from '../../../types/form.ts';
import Button from '../Button.tsx';
import Select from './Select.tsx';

interface IFormProps {
  title: string;
  formData?: TFormData | null;
  isLoading: boolean;
  className?: string;
  onSubmit: (formData: TFormData) => Promise<void>;
  afterSubmit: () => void;
}

const FIELD_STYLES = 'px-4 py-2 rounded-md dark:text-gray-900';
const NAME_LENGTH: number = 3;
const TEXT_LENGTH: number = 5;

const initialData: TFormData = { name: '', text: '', category: Category.Personal };

function Form({ title, formData, isLoading, onSubmit, afterSubmit }: IFormProps): JSX.Element {
  const id = useId();
  const categoryOptions = useCategoryOptions();
  const [data, setData] = useState<TFormData>(formData || initialData);
  const [error, setError] = useState<string | null>(null);

  const isDisabled: boolean = useMemo(() => {
    return Boolean(error || !data.name.trim() || !data.text.trim() || isLoading);
  }, [error, data.name, data.text, isLoading]);

  function handleChangeName({ target: { value } }: ChangeEvent<HTMLInputElement>): void {
    setData(prevState => ({ ...prevState, name: value }));

    if (value.trim().length < NAME_LENGTH) {
      setError(`Title's length must be at least ${NAME_LENGTH} symbols`);
    } else {
      setError(null);
    }
  }

  function handleChangeText({ target: { value } }: ChangeEvent<HTMLTextAreaElement>): void {
    setData(prevState => ({ ...prevState, text: value }));

    if (value.trim().length < TEXT_LENGTH) {
      setError(`Text's length must be at least ${TEXT_LENGTH} symbols`);
    } else {
      setError(null);
    }
  }

  function handleChangeCategory(category: Category): void {
    setData(prevState => ({ ...prevState, category }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    onSubmit(data).then(afterSubmit);
  }

  return (
    <div className="fixed top-1/2 left-1/2 z-[1] p-4 xs:p-6 w-[500px] max-w-[calc(100%-32px)] min-h-[300px] max-h-full rounded-xl bg-gray-200 dark:bg-gray-700 -translate-y-1/2 -translate-x-1/2">
      <h2 className="mb-4 text-xl font-medium text-center">{title}</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name={`note-name-${id}`}
          value={data.name}
          placeholder="Title"
          className={FIELD_STYLES}
          onChange={handleChangeName}
        />
        <textarea
          name={`note-text-${id}`}
          value={data.text}
          placeholder="Text"
          className={clsx('resize-none overflow-y-auto min-h-[200px]', FIELD_STYLES)}
          onChange={handleChangeText}
        />
        <Select<Category>
          options={categoryOptions}
          selected={data.category}
          fieldStyles={FIELD_STYLES}
          onChange={handleChangeCategory}
        />
        {error && <p className="text-sm text-rose-500 dark:text-red-500">{error}</p>}
        <Button type="submit" disabled={isDisabled}>
          {isLoading ? (
            <div className="flex justify-center gap-4">
              <span className="w-6 h-6 border-2 border-r-0 rounded-full animate-spin" /> Loading...
            </div>
          ) : (
            'Save'
          )}
        </Button>
      </form>
    </div>
  );
}

export default Form;
