import { useState } from 'react';

export function useSearch(): [string, (searchValue: string) => void] {
  const [searchValue, setSearchValue] = useState<string>('');

  function handleSearch(searchValue: string): void {
    setSearchValue(searchValue);
  }

  return [searchValue, handleSearch];
}
