import { ChangeEvent, JSX, useCallback, useId, useMemo } from 'react';
import clsx from 'clsx';

import { formatDate } from '../utils/formatDate.ts';
import { Category, INote } from '../types/note.ts';
import IconButton from './UI/IconButton.tsx';

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                data-slot="icon"
                className="w-6 h-6 transition-colors hover:text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                data-slot="icon"
                className="w-6 h-6 transition-colors hover:text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
            )}
          </label>
          {!isCompleted && (
            <IconButton
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  data-slot="icon"
                  className="w-5 h-5 transition-colors hover:text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              }
              title="Edit"
              onClick={handleEdit}
            />
          )}
          <IconButton
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                data-slot="icon"
                className="w-5 h-5 transition-colors hover:text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            }
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
