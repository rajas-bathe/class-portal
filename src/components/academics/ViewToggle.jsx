import React from 'react';

function ViewToggle({ viewMode, setViewMode }) {
  return (
    <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
      <button
        onClick={() => setViewMode('lectures')}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
          viewMode === 'lectures' 
            ? 'bg-white text-blue-600 shadow-sm' 
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        📚 Lectures
      </button>
      <button
        onClick={() => setViewMode('labs')}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
          viewMode === 'labs' 
            ? 'bg-white text-purple-600 shadow-sm' 
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        🔬 Labs
      </button>
    </div>
  );
}

export default ViewToggle;