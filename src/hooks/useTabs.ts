import { ITab } from '../types/tabs.ts';
import { Category } from '../types/note.ts';

const tabs: ITab<Category>[] = [
  { name: 'Personal', value: Category.Personal },
  { name: 'Business', value: Category.Business },
  { name: 'Home', value: Category.Home },
];

export function useTabs(): ITab<Category>[] {
  return tabs;
}
