import React from 'react';

function ClassTimetable({ classes = [] }) {
  const getSubjectColor = (subject) => {
    const colors = {
      'Mathematics': 'bg-blue-50 border-blue-500',
      'Science': 'bg-green-50 border-green-500',
      'History': 'bg-purple-50 border-purple-500',
      'English': 'bg-orange-50 border-orange-500',
      'Art': 'bg-pink-50 border-pink-500',
    };
    return colors[subject] || 'bg-gray-50 border-gray-500';
  };

  const getSubjectEmoji = (subject) => {
    const emojis = {
      'Mathematics': '📐',
      'Science': '🔬',
      'History': '📜',
      'English': '📚',
      'Art': '🎨',
    };
    return emojis[subject] || '📖';
  };

  if (classes.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 text-center">
        <p className="text-gray-500">No classes scheduled</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {classes.map((item) => (
        <div
          key={item.id}
          className={`
            flex items-center gap-3 p-3 rounded-lg border-l-4
            ${getSubjectColor(item.subject)}
          `}
        >
          <span className="text-2xl">{getSubjectEmoji(item.subject)}</span>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold bg-white px-2 py-0.5 rounded-full shadow-sm">
                {item.time}
              </span>
              <h4 className="font-medium text-gray-800">{item.subject}</h4>
            </div>
            <div className="mt-1 flex flex-wrap gap-3 text-xs text-gray-500">
              <span>👨‍🏫 {item.teacher}</span>
              <span>🏫 Room {item.room}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ClassTimetable;