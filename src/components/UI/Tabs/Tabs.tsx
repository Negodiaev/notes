import React, { JSX } from 'react';
import { ITab } from '../../../types/tabs.ts';
import { Category } from '../../../types/note.ts';
import { Tab } from './Tab.tsx';

const bgColors: Record<Category, string> = {
  [Category.Personal]: 'peer-checked/tab:bg-amber-200',
  [Category.Business]: 'peer-checked/tab:bg-blue-200',
  [Category.Home]: 'peer-checked/tab:bg-green-200',
};

export interface ITabsProps<T extends string> {
  tabs: ITab<T>[];
  selectedCategories: T[];
  onChange: (value: T, isSelected: boolean) => void;
}

export function Tabs<T extends string>({ tabs, selectedCategories, onChange }: ITabsProps<T>): JSX.Element | null {
  if (!tabs.length) {
    return null;
  }

  return (
    <ul className="flex justify-center gap-2 xs:gap-1 sm:gap-3">
      {tabs.map(tab => (
        <Tab<T>
          tab={tab}
          isSelected={selectedCategories.includes(tab.value)}
          className={bgColors[tab.value as Category]}
          key={tab.value}
          onChange={onChange}
        />
      ))}
    </ul>
  );
}
