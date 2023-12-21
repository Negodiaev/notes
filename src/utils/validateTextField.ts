import { FormFieldType } from '../types/form.ts';

const fieldMaxLength: Record<FormFieldType.Text | FormFieldType.Textarea, number> = {
  [FormFieldType.Text]: 3,
  [FormFieldType.Textarea]: 5,
};

export function validateTextField(value: string, type: FormFieldType): boolean {
  return value.trim().length < fieldMaxLength[type];
}
