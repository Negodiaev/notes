import React, { ChangeEvent, JSX, useId } from 'react';

interface ISearchProps {
  value: string;
  onSearch: (value: string) => void;
}

function Search({ value, onSearch }: ISearchProps): JSX.Element {
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
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 50 50" fill="currentColor">
          <path d="M21 3C11.621 3 4 10.621 4 20s7.621 17 17 17c3.71 0 7.14-1.195 9.938-3.219l13.156 13.125 2.812-2.812-13-13.032A16.923 16.923 0 0 0 38 20c0-9.379-7.621-17-17-17Zm0 2c8.297 0 15 6.703 15 15s-6.703 15-15 15S6 28.297 6 20 12.703 5 21 5Z" />
        </svg>
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

export default Search;
