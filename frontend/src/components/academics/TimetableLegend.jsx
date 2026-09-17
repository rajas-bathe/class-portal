import React from 'react';

function TimetableLegend() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex flex-wrap items-center gap-4">
        <h3 className="text-sm font-semibold text-gray-700">📖 Legend:</h3>
        <div className="flex flex-wrap gap-3">
          <span className="px-2 py-1 bg-blue-100 rounded text-xs">📐 Math</span>
          <span className="px-2 py-1 bg-green-100 rounded text-xs">🔬 Science</span>
          <span className="px-2 py-1 bg-purple-100 rounded text-xs">📜 History</span>
          <span className="px-2 py-1 bg-orange-100 rounded text-xs">📚 English</span>
          <span className="px-2 py-1 bg-pink-100 rounded text-xs">🎨 Art</span>
          <span className="px-2 py-1 border-2 border-dashed border-purple-300 rounded text-xs">🔬 Lab</span>
          <span className="px-2 py-1 bg-blue-500 text-white rounded text-xs animate-pulse">● Live</span>
        </div>
      </div>
    </div>
  );
}

export default TimetableLegend;