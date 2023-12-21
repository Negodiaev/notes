import React, { JSX } from 'react';

interface IButtonLoaderProps {
  isLoading: boolean;
}

function ButtonLoader({ isLoading }: IButtonLoaderProps): JSX.Element | string {
  return isLoading ? (
    <div className="flex justify-center gap-4">
      <span className="w-6 h-6 border-2 border-r-0 rounded-full animate-spin" /> Loading...
    </div>
  ) : (
    'Save'
  );
}

export default ButtonLoader;
