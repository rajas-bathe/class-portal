import React from 'react';

function ScheduleCard({ item }) {
  // Get color based on subject
  const getColor = (subject) => {
    const colors = {
      'Mathematics': 'bg-blue-50 border-blue-500',
      'Science': 'bg-green-50 border-green-500',
      'History': 'bg-purple-50 border-purple-500',
      'English': 'bg-orange-50 border-orange-500',
      'Art': 'bg-pink-50 border-pink-500',
      'Physics Lab': 'bg-blue-50 border-blue-500',
      'Chemistry Lab': 'bg-green-50 border-green-500',
      'Biology Lab': 'bg-purple-50 border-purple-500',
    };
    return colors[subject] || 'bg-gray-50 border-gray-500';
  };

  const getEmoji = (subject) => {
    const emojis = {
      'Mathematics': '📐',
      'Science': '🔬',
      'History': '📜',
      'English': '📚',
      'Art': '🎨',
      'Physics Lab': '⚛️',
      'Chemistry Lab': '🧪',
      'Biology Lab': '🧬',
    };
    return emojis[subject] || '📖';
  };

  const isLab = item.subject.includes('Lab');

  return (
    <div className={`
      p-4 rounded-xl border-l-4 shadow-sm
      ${getColor(item.subject)}
    `}>
      <div className="flex items-start gap-3">
        {/* Time */}
        <div className="min-w-[70px]">
          <span className="text-xs font-bold bg-white px-2 py-1 rounded-full shadow-sm">
            {item.time}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xl">{getEmoji(item.subject)}</span>
            <h3 className="font-bold text-gray-800">{item.subject}</h3>
            {isLab && (
              <span className="text-xs bg-purple-200 text-purple-700 px-2 py-0.5 rounded-full">
                Lab
              </span>
            )}
          </div>
          <div className="mt-1 flex flex-wrap gap-3 text-sm text-gray-600">
            <span>👨‍🏫 {item.teacher}</span>
            <span>🏫 {item.room}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleCard;