import React, { ChangeEvent, JSX, useId } from 'react';
import clsx from 'clsx';
import { ITab } from '../../../types/tabs.ts';

interface ITabProps<T extends string> {
  tab: ITab<T>;
  isSelected: boolean;
  className?: string;
  onChange: (value: T, isSelected: boolean) => void;
}

function Tab<T extends string>({ tab: { name, value }, isSelected, className, onChange }: ITabProps<T>): JSX.Element {
  const id = useId();

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const {
      target: { value, checked },
    } = event;
    onChange(value as T, checked);
  }

  return (
    <li>
      <input
        type="checkbox"
        id={`tab-${id}`}
        value={value}
        checked={isSelected}
        className="hidden peer/tab"
        onChange={handleChange}
      />
      <label
        htmlFor={`tab-${id}`}
        className={clsx(
          'inline-block px-3 xs:px-4 py-2 lg:py-[9px] text-sm xs:text-base text-gray-500 font-medium bg-white shadow-sm border-2 border-gray-200 rounded-full cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 hover:text-gray-600 peer-checked/tab:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 peer-checked/tab:border-transparent dark:peer-checked/tab:text-gray-600',
          className,
        )}
      >
        {name}
      </label>
    </li>
  );
}

export default Tab;
