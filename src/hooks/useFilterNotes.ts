import { useMemo } from 'react';
import { isTextIncluded } from '../utils/isTextIncluded.ts';
import { Category, INote } from '../types/note.ts';

export function useFilterNotes(notes: INote[], selectedCategories: Category[], searchText: string): INote[] {
  return useMemo(() => {
    if (selectedCategories.length && searchText) {
      return notes.filter(({ category, name, text }) =>
        selectedCategories.some(
          selectedCategory =>
            selectedCategory === category && (isTextIncluded(name, searchText) || isTextIncluded(text, searchText)),
        ),
      );
    } else if (selectedCategories.length) {
      return notes.filter(({ category }) => selectedCategories.some(selectedCategory => selectedCategory === category));
    } else if (searchText) {
      return notes.filter(({ name, text }) => isTextIncluded(name, searchText) || isTextIncluded(text, searchText));
    } else {
      return notes;
    }
  }, [selectedCategories, notes, searchText]);
}
