import { ChangeEvent, JSX, useCallback, useMemo } from 'react';
import clsx from 'clsx';

import { formatDate } from '../../../utils/formatDate.ts';
import { Category, INote, TNoteCompleted, TNoteId } from '../../../types/note.ts';
import { NoteActions } from './NoteActions.tsx';

const bgCategoryColors: Record<Category, string> = {
  [Category.Personal]: 'bg-amber-200',
  [Category.Business]: 'bg-blue-200',
  [Category.Home]: 'bg-green-200',
};

export interface INoteProps {
  note: INote;
  onToggleComplete: (id: TNoteId, isCompleted: TNoteCompleted) => void;
  onDelete: (id: TNoteId) => void;
  onEdit?: (note: INote) => void;
}

export function Note({ note, onToggleComplete, onEdit, onDelete }: INoteProps): JSX.Element {
  const { id, name, text, category, date, isCompleted } = note;
  const bgCategoryColor = useMemo(() => bgCategoryColors[category], [category]);

  const handleToggleComplete = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onToggleComplete(id, event.target.checked);
    },
    [id, onToggleComplete],
  );

  function handleEdit(): void {
    onEdit?.(note);
  }

  function handleDelete(): void {
    onDelete(id);
  }

  return (
    <div
      className={clsx('grid grid-rows-[auto,1fr,auto] w-full min-h-[300px] rounded shadow-lg', bgCategoryColor, {
        ['opacity-75']: isCompleted,
      })}
    >
      <div className="flex justify-between items-center p-4 xs:p-6">
        <div
          className={clsx(
            'inline-block px-4 py-2 rounded-full text-sm font-medium dark:text-gray-600 shadow saturate-[.75]',
            bgCategoryColor,
          )}
        >
          {category}
        </div>
        <NoteActions
          isCompleted={isCompleted}
          onToggleComplete={handleToggleComplete}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      <div className="px-4 xs:px-6 text-gray-800">
        <h2 className="mb-2 text-2xl font-semibold break-words">{name}</h2>
        <p className="break-words">{text}</p>
      </div>
      <div className="p-4 xs:p-6  text-right text-sm text-gray-800 text-opacity-60">{formatDate(date)}</div>
    </div>
  );
}
