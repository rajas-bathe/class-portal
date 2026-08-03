import React from 'react';
import { useNavigate } from 'react-router-dom';

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    { icon: '📚', label: 'Timetable', path: '/academics' },
    { icon: '📁', label: 'Resources', path: '/resources' },
    { icon: '📢', label: 'Announcements', path: '/announcements' },
    { icon: '📸', label: 'Gallery', path: '/class' },
  ];

  return (
    <div className="bg-white border-2 border-gray-800 rounded-xl p-4">
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action) => (
          <button
            key={action.path}
            onClick={() => navigate(action.path)}
            className="flex flex-col items-center justify-center p-3 border-2 border-gray-200 rounded-lg hover:border-gray-800 transition-colors hover:bg-gray-50 active:scale-95"
          >
            <span className="text-2xl">{action.icon}</span>
            <span className="text-xs font-medium text-gray-700 mt-1">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;