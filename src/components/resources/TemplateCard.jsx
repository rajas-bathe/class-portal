import React from 'react';

function TemplateCard({ icon, name, description, fileUrl, size }) {
  return (
    <div className="bg-white border-2 border-gray-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <h4 className="text-sm font-bold text-gray-900">{name}</h4>
          <p className="text-xs text-gray-500">{description}</p>
          <p className="text-[10px] text-gray-400">{size}</p>
        </div>
      </div>
      <a
        href={fileUrl}
        download
        className="bg-gray-800 text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors whitespace-nowrap"
      >
        📥 Download
      </a>
    </div>
  );
}

export default TemplateCard;