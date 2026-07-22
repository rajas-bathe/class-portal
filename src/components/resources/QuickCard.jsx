import React from 'react';

function QuickCard({ icon, title, subtitle, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white border-2 border-gray-800 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] w-full touch-manipulation"
    >
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-sm font-bold text-gray-900">{title}</h3>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </button>
  );
}

export default QuickCard;