import React from 'react';

function ViewToggle({ viewMode, setViewMode }) {
  return (
    <div className="w-full sm:w-auto flex border-2 border-gray-800 rounded-lg overflow-hidden bg-white">
      <button
        onClick={() => setViewMode('lectures')}
        className={`
          flex-1 px-3 py-2 text-sm font-medium transition-all duration-150
          ${viewMode === 'lectures' 
            ? 'bg-gray-800 text-white' 
            : 'bg-white text-gray-700 hover:bg-gray-100'}
          border-r border-gray-800 last:border-r-0
        `}
      >
        📚 Lectures
      </button>
      <button
        onClick={() => setViewMode('labs')}
        className={`
          flex-1 px-3 py-2 text-sm font-medium transition-all duration-150
          ${viewMode === 'labs' 
            ? 'bg-gray-800 text-white' 
            : 'bg-white text-gray-700 hover:bg-gray-100'}
          border-r border-gray-800 last:border-r-0
        `}
      >
        🔬 Labs
      </button>
    </div>
  );
}

export default ViewToggle;