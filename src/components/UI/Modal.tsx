import { JSX, PropsWithChildren, useEffect } from 'react';

interface IModalProps extends PropsWithChildren {
  isShow: boolean;
  onClose: () => void;
}

function Modal({ isShow, children, onClose }: IModalProps): JSX.Element | null {
  useEffect(() => {
    if (isShow) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isShow]);

  if (!isShow) {
    return null;
  }

  return (
    <>
      <div
        className="fixed left-0 right-0 top-0 bottom-0 z-[1] bg-gray-950 bg-opacity-80 backdrop:bg-gray-50"
        onClick={() => onClose()}
      >
        <button className="absolute top-4 right-4 text-xl font-bold text-gray-200">╳</button>
      </div>
      {children}
    </>
  );
}

export default Modal;