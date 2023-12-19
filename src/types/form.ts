import { INote } from './note.ts';

export interface ISelectOption<T extends string> {
  label: string;
  value: T;
}

export type TFormData = Pick<INote, 'name' | 'text' | 'category'> & Partial<Pick<INote, 'id'>>;
