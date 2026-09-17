import React from 'react';

function SectionHeader({ icon, title }) {
  return (
    <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-800 pb-1 flex items-center gap-2">
      <span>{icon}</span> {title}
    </h2>
  );
}

export default SectionHeader;