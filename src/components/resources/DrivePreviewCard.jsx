import React from 'react';

function DrivePreviewCard({ icon = '📁', title, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={`Open folder ${title}`}
      className="
        group relative bg-white border-2 border-gray-800 rounded-xl
        p-3.5 w-full touch-manipulation text-left
        flex items-center gap-3
        transition-all duration-200
        hover:shadow-lg hover:-translate-y-0.5
        active:translate-y-0 active:shadow-none
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-800
      "
    >
      <div
        className="
          flex-shrink-0 w-11 h-11 rounded-lg bg-gray-100
          flex items-center justify-center text-2xl
          transition-colors duration-200 group-hover:bg-gray-200
        "
        aria-hidden="true"
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-bold text-gray-900 truncate">{title}</h3>
        <p className="text-xs text-gray-400 mt-0.5 truncate group-hover:text-gray-600 transition-colors">
          Open folder
        </p>
      </div>
      <span
        className="flex-shrink-0 text-gray-300 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all duration-200"
        aria-hidden="true"
      >
        →
      </span>
    </button>
  );
}

export default DrivePreviewCard;