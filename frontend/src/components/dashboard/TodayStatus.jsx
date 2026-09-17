import React from 'react';

function TodayStatus({ classCount, unreadCount }) {
  return (
    <div className="bg-white border-2 border-gray-800 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{classCount > 0 ? '📚' : '🎉'}</span>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {classCount > 0 ? `${classCount} classes today` : 'No classes today'}
            </p>
            <p className="text-xs text-gray-500">
              {unreadCount > 0 ? `${unreadCount} unread announcement${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
            </p>
          </div>
        </div>
        <span className="text-xs text-gray-400">
          {classCount > 0 ? '📅' : '😎'}
        </span>
      </div>
    </div>
  );
}

export default TodayStatus;