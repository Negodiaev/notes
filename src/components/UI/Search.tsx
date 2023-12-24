import React, { ChangeEvent, JSX, useId } from 'react';
import IconMagnifier from '../../assets/icons/magnifier.svg?react';

interface ISearchProps {
  value: string;
  onSearch: (value: string) => void;
}

export function Search({ value, onSearch }: ISearchProps): JSX.Element {
  const id: string = useId();

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onSearch(event.target.value);
  }

  return (
    <div className="relative w-full">
      <label
        htmlFor={`search-${id}`}
        className="absolute top-0 left-0 bottom-0 flex justify-center items-center w-10 h-full text-sm font-medium text-gray-400"
      >
        <IconMagnifier />
      </label>
      <input
        type="search"
        id={`search-${id}`}
        value={value}
        className="w-full px-4 py-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-white shadow focus:outline-gray-300 focus:outline-offset-0 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:border-gray-500"
        placeholder="Filter notes by name..."
        onChange={handleChange}
      />
    </div>
  );
}
