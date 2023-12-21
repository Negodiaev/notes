import { ChangeEventHandler, useState } from 'react';
import { FormFieldType } from '../types/form.ts';
import { validateTextField } from '../utils/validateTextField.ts';

type THandleChange = ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
type TUseTextField = [string, THandleChange, boolean];

export function useTextField(initialState: string, type: FormFieldType): TUseTextField {
  const [value, setValue] = useState<string>(initialState);
  const [isError, setError] = useState<boolean>(false);

  const handleChange: THandleChange = ({ target: { value } }): void => {
    setValue(value);
    setError(validateTextField(value, type));
  };

  return [value, handleChange, isError];
}
