import { ChangeEvent, JSX } from 'react';
import { ISelectOption } from '../../../types/form.ts';

interface ISelectProps<T extends string> {
  options: ISelectOption<T>[];
  selected: T;
  fieldStyles?: string;
  onChange: (value: T) => void;
}

function Select<T extends string>({ options, selected, fieldStyles = '', onChange }: ISelectProps<T>): JSX.Element {
  function handleChange(event: ChangeEvent<HTMLSelectElement>): void {
    onChange(event.target.value as T);
  }

  return (
    <select name="note-category" id="note-category" value={selected} className={fieldStyles} onChange={handleChange}>
      {options.map(({ label, value }) => (
        <option value={value} key={value}>
          {label}
        </option>
      ))}
    </select>
  );
}

export default Select;
