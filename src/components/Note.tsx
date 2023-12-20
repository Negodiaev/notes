import { ChangeEvent, JSX, useCallback, useId, useMemo } from 'react';
import clsx from 'clsx';

import { formatDate } from '../utils/formatDate.ts';
import { Category, INote } from '../types/note.ts';
import IconButton from './UI/IconButton.tsx';

import IconCheckCircle from '../assets/icons/check-circle.svg?react';
import IconArrowLeftStartOnRectangle from '../assets/icons/arrow-left-start-on-rectangle.svg?react';
import IconPencilSquare from '../assets/icons/pencil-square.svg?react';
import IconTrash from '../assets/icons/trash.svg?react';

const bgCategoryColors: Record<Category, string> = {
  [Category.Personal]: 'bg-amber-200',
  [Category.Business]: 'bg-blue-200',
  [Category.Home]: 'bg-green-200',
};

interface INoteProps {
  note: INote;
  onComplete: (note: INote) => void;
  onEdit?: (note: INote) => void;
  onDelete: (note: INote) => void;
}

function Note({ note, onComplete, onEdit, onDelete }: INoteProps): JSX.Element {
  const completedId = useId();
  const { name, text, category, date, isCompleted } = note;
  const bgCategoryColor = useMemo(() => bgCategoryColors[category], [category]);

  const handleChangeCompleted = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onComplete({ ...note, isCompleted: event.target.checked });
    },
    [note, onComplete],
  );

  function handleEdit(): void {
    onEdit?.(note);
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
        <div className="flex items-center gap-3 dark:text-gray-600">
          <input
            type="checkbox"
            id={`completed-${completedId}`}
            checked={isCompleted}
            className="hidden"
            onChange={handleChangeCompleted}
          />
          <label
            htmlFor={`completed-${completedId}`}
            title={isCompleted ? 'Restore' : 'Complete'}
            className="p-1 cursor-pointer"
          >
            {!isCompleted ? (
              <IconCheckCircle className="w-6 h-6 transition-colors hover:text-gray-500" />
            ) : (
              <IconArrowLeftStartOnRectangle className="w-6 h-6 transition-colors hover:text-gray-500" />
            )}
          </label>
          {!isCompleted && (
            <IconButton
              icon={<IconPencilSquare className="w-5 h-5 transition-colors hover:text-gray-500" />}
              title="Edit"
              onClick={handleEdit}
            />
          )}
          <IconButton
            icon={<IconTrash className="w-5 h-5 transition-colors hover:text-gray-500" />}
            title="Delete"
            onClick={() => onDelete(note)}
          />
        </div>
      </div>
      <div className="px-4 xs:px-6 text-gray-800">
        <h2 className="mb-2 text-2xl font-semibold break-words">{name}</h2>
        <p className="break-words">{text}</p>
      </div>
      <div className="p-4 xs:p-6  text-right text-sm text-gray-800 text-opacity-60">{formatDate(date)}</div>
    </div>
  );
}

export default Note;
