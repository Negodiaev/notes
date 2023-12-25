import { JSX } from 'react';
import { IModalProps, Modal } from './UI/Modal.tsx';
import { Button } from './UI/Button.tsx';
import { ButtonLoader } from './UI/ButtonLoader.tsx';

interface IConfirmationModalProps extends IModalProps {
  title?: string;
  isLoading: boolean;
  onConfirm: () => void;
}

export function ConfirmationModal({
  title = 'Are you sure?',
  isLoading,
  onConfirm,
  ...props
}: IConfirmationModalProps): JSX.Element {
  return (
    <Modal {...props}>
      <div className="fixed top-1/2 left-1/2 z-[3] flex flex-col justify-center items-center gap-6 pt-6 py-4 pb-8 xs:p-6 w-[360px] max-w-[calc(100%-32px)] min-h-[180px] max-h-full rounded-xl bg-gray-200 dark:bg-gray-700 -translate-y-1/2 -translate-x-1/2">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="grid grid-cols-[repeat(2,minmax(130px,1fr))] gap-4">
          <Button
            className="px-2 min-h-[48px] text-sm bg-gray-500 hover:bg-gray-600 dark:hover:text-gray-800 dark:hover:bg-gray-300"
            onClick={props.onClose}
          >
            Cancel
          </Button>
          <Button
            className="px-2 min-h-[48px] text-sm dark:text-white bg-orange-600 hover:bg-orange-700 dark:bg-orange-600"
            disabled={isLoading}
            onClick={onConfirm}
          >
            <ButtonLoader title="Yes" isLoading={isLoading} className="gap-2" />
          </Button>
        </p>
      </div>
    </Modal>
  );
}
