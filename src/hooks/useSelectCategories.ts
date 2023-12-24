import { useState } from 'react';
import { Category } from '../types/note.ts';

type THandleChangeCategories = (value: Category, isSelected: boolean) => void;

export function useSelectedCategories(): [Category[], THandleChangeCategories, () => void] {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const changeCategories: THandleChangeCategories = (value, isSelected) => {
    setSelectedCategories(prevState => {
      if (isSelected) {
        return [...prevState, value];
      } else {
        return [...prevState].filter(val => val !== value);
      }
    });
  };

  function resetCategories(): void {
    setSelectedCategories([]);
  }

  return [selectedCategories, changeCategories, resetCategories];
}
