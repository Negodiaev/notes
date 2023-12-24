import React from 'react';

export function NotFoundNotes({ onClearFilters }: { onClearFilters: () => void }) {
  return (
    <div className="text-center">
      <p className="text-lg">Nothing has been found...</p>
      <button className="text-blue-400 underline hover:no-underline" onClick={onClearFilters}>
        Clear filters
      </button>
    </div>
  );
}
