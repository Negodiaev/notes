import { ISelectOption } from '../types/form.ts';
import { Category } from '../types/note.ts';

const categoryOptions: ISelectOption<Category>[] = [
  { label: 'Personal', value: Category.Personal },
  { label: 'Business', value: Category.Business },
  { label: 'Home', value: Category.Home },
];

export function useCategoryOptions(): ISelectOption<Category>[] {
  return categoryOptions;
}
