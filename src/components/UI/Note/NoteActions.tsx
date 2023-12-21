import { ChangeEvent, JSX, useId } from 'react';
import IconButton from '../IconButton.tsx';

import IconCheckCircle from '../../../assets/icons/check-circle.svg?react';
import IconArrowLeftStartOnRectangle from '../../../assets/icons/arrow-left-start-on-rectangle.svg?react';
import IconPencilSquare from '../../../assets/icons/pencil-square.svg?react';
import IconTrash from '../../../assets/icons/trash.svg?react';

interface INoteActionsProps {
  isCompleted: boolean;
  onComplete: (event: ChangeEvent<HTMLInputElement>) => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function NoteActions({ isCompleted, onComplete, onEdit, onDelete }: INoteActionsProps): JSX.Element {
  const completedId = useId();

  return (
    <div className="flex items-center gap-3 dark:text-gray-600">
      <input
        type="checkbox"
        id={`completed-${completedId}`}
        checked={isCompleted}
        className="hidden"
        onChange={onComplete}
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
          onClick={onEdit}
        />
      )}
      <IconButton
        icon={<IconTrash className="w-5 h-5 transition-colors hover:text-gray-500" />}
        title="Delete"
        onClick={onDelete}
      />
    </div>
  );
}
