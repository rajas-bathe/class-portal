import React, { useState } from 'react';

function DocCard({ icon, title, description, fileUrl, size, type = 'template' }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white border-2 border-gray-800 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Top — Icon + Type Badge */}
      <div className="p-4 pb-2 flex items-start justify-between">
        <span className="text-4xl">{icon}</span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full ${type === 'template' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
          {type === 'template' ? '📄 Template' : '📋 Form'}
        </span>
      </div>

      {/* Card Body — Title + Description + Size */}
      <div className="px-4 pb-2">
        <h4 className="text-sm font-bold text-gray-900 leading-tight">{title}</h4>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{description}</p>
        <p className="text-[10px] text-gray-400 mt-1">{size}</p>
      </div>

      {/* Card Footer — Download (appears on hover) */}
      <div className={`px-4 pb-4 transition-all duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <a
          href={fileUrl}
          download
          className="block w-full bg-gray-800 text-white text-xs font-medium px-3 py-2 rounded-lg hover:bg-gray-900 transition-colors text-center"
        >
          📥 Download
        </a>
      </div>

      {/* Preview Bar (Optional — keeps card height consistent) */}
      <div className="h-1 w-full bg-gray-100">
        <div className="h-full bg-gray-300 rounded-full" style={{ width: '15%' }}></div>
      </div>
    </div>
  );
}

export default DocCard;