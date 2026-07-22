import React from 'react';

const calendarEvents = [
  { date: '25/07/2026', event: 'MSE Exams Begin', type: 'exam' },
  { date: '28/07/2026', event: 'MP Exam', type: 'exam' },
  { date: '30/07/2026', event: 'FES Exam', type: 'exam' },
  { date: '01/08/2026', event: 'College Holiday (Maharashtra Day)', type: 'holiday' },
  { date: '05/08/2026', event: 'Assignment Submission Deadline', type: 'deadline' },
  { date: '10/08/2026', event: 'CIAP Quiz 1', type: 'exam' },
  { date: '20/08/2026', event: 'Workshop on Embedded Systems', type: 'event' },
];

function AcademicCalendar() {
  const getTypeColor = (type) => {
    const colors = {
      exam: 'border-blue-500 bg-blue-50 text-blue-700',
      holiday: 'border-red-500 bg-red-50 text-red-700',
      deadline: 'border-orange-500 bg-orange-50 text-orange-700',
      event: 'border-purple-500 bg-purple-50 text-purple-700',
    };
    return colors[type] || 'border-gray-500 bg-gray-50 text-gray-700';
  };

  return (
    <div className="space-y-3">
      {calendarEvents.map((item, idx) => (
        <div
          key={idx}
          className={`
            flex items-center gap-4 p-3 rounded-lg border-l-4
            ${getTypeColor(item.type)}
          `}
        >
          <span className="text-sm font-bold text-gray-800 min-w-[100px]">{item.date}</span>
          <span className="text-sm text-gray-700 flex-1">{item.event}</span>
          <span className="text-xs font-medium uppercase px-2 py-0.5 rounded-full bg-white/70">
            {item.type}
          </span>
        </div>
      ))}
    </div>
  );
}

export default AcademicCalendar;