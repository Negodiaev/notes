import { FormEvent, JSX, useId, useMemo, useState } from 'react';
import clsx from 'clsx';

import { useCategoryOptions } from '../../../hooks/useCategoryOptions.ts';
import { useTextField } from '../../../hooks/useTextField.ts';
import { Category } from '../../../types/note.ts';
import { FormFieldType, TFormData } from '../../../types/form.ts';
import { Button } from '../Button.tsx';
import { Select } from './Select.tsx';
import { ButtonLoader } from '../ButtonLoader.tsx';

interface IFormProps {
  title: string;
  isLoading: boolean;
  formData?: TFormData | null;
  className?: string;
  onSubmit: (formData: TFormData) => Promise<void>;
  afterSubmit: () => void;
}

const FIELD_STYLES = 'px-4 py-2 rounded-md dark:text-gray-900';

export function Form({ title, formData, isLoading, onSubmit, afterSubmit }: IFormProps): JSX.Element {
  const id = useId();
  const categoryOptions = useCategoryOptions();
  const [name, handleChangeName, isNameError] = useTextField(formData?.name || '', FormFieldType.Text);
  const [text, handleChangeText, isTextError] = useTextField(formData?.text || '', FormFieldType.Textarea);
  const [category, setCategory] = useState<Category>(formData?.category || Category.Personal);

  const error: string | null = useMemo(() => {
    if (isNameError) {
      return "Text's length must be at least 3 symbols";
    } else if (isTextError) {
      return "Name's length must be at least 5 symbols";
    } else {
      return null;
    }
  }, [isNameError, isTextError]);

  const isDisabled: boolean = useMemo(() => {
    return Boolean(error) || isLoading;
  }, [error, isLoading]);

  function handleChangeCategory(category: Category): void {
    setCategory(category);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    onSubmit({ ...formData, name, text, category }).then(afterSubmit);
  }

  return (
    <div className="fixed top-1/2 left-1/2 z-[3] p-4 xs:p-6 w-[500px] max-w-[calc(100%-32px)] min-h-[300px] max-h-full rounded-xl bg-gray-200 dark:bg-gray-700 -translate-y-1/2 -translate-x-1/2">
      <h2 className="mb-4 text-xl font-medium text-center">{title}</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name={`note-name-${id}`}
          value={name}
          placeholder="Title"
          className={FIELD_STYLES}
          onChange={handleChangeName}
        />
        <textarea
          name={`note-text-${id}`}
          value={text}
          placeholder="Text"
          className={clsx('resize-none overflow-y-auto min-h-[200px]', FIELD_STYLES)}
          onChange={handleChangeText}
        />
        <Select<Category>
          options={categoryOptions}
          selected={category}
          fieldStyles={clsx('h-[40px]', FIELD_STYLES)}
          onChange={handleChangeCategory}
        />
        {error && <p className="text-sm text-rose-500 dark:text-red-500">{error}</p>}
        <Button type="submit" disabled={isDisabled}>
          <ButtonLoader title="Save" isLoading={isLoading} />
        </Button>
      </form>
    </div>
  );
}
