import React from 'react';

function DriveFolderCard({ icon = '📁', title, count, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group bg-white border-2 border-gray-800 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] w-full touch-manipulation"
    >
      <div className="text-5xl mb-2 transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-200">
        {icon}
      </div>
      <h3 className="text-sm font-bold text-gray-900">{title}</h3>
      <p className="text-xs text-gray-500">{count}</p>
      <div className="mt-2 text-xs font-medium text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
        Click to open →
      </div>
    </button>
  );
}

export default DriveFolderCard;