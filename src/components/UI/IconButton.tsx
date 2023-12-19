import React from 'react';

interface IIconButtonProps {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}

function IconButton({ icon, title, onClick }: IIconButtonProps) {
  return (
    <button className="flex justify-center items-center p-1" title={title} onClick={onClick}>
      {icon}
    </button>
  );
}

export default IconButton;
