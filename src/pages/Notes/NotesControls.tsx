import React, { JSX } from 'react';
import { useTabs } from '../../hooks/useTabs.ts';
import { Category } from '../../types/note.ts';
import { Tabs } from '../../components/UI/Tabs/Tabs.tsx';
import { Search } from '../../components/UI/Search.tsx';

interface INoteControlsProps {
  selectedCategories: Category[];
  searchValue: string;
  onShowAddModal: () => void;
  onChangeTabs: (value: Category, isSelected: boolean) => void;
  onSearch: (value: string) => void;
}

export function NotesControls({
  selectedCategories,
  searchValue,
  onShowAddModal,
  onChangeTabs,
  onSearch,
}: INoteControlsProps): JSX.Element {
  const tabs = useTabs();

  return (
    <>
      <div className="flex flex-col lg:flex-row-reverse sm:justify-between lg:justify-start items-center sm:items-center gap-4 lg:gap-6 mb-2">
        <div className="flex flex-col xs:flex-row-reverse xs:justify-between lg:justify-start items-center gap-6 xs:gap-3 lg:gap-6 w-full lg:w-auto">
          <button
            className="px-4 py-2 lg:py-[11px] rounded-full whitespace-nowrap text-white bg-orange-400 hover:bg-orange-500 transition-colors"
            onClick={onShowAddModal}
          >
            Add a new note
          </button>
          <Tabs<Category> tabs={tabs} selectedCategories={selectedCategories} onChange={onChangeTabs} />
        </div>
        <Search value={searchValue} onSearch={onSearch} />
      </div>
    </>
  );
}
