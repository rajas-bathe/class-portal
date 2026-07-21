import React from 'react';
import { useExamTimetable } from '../../hooks/useExamTimetable';
import { examTypes, examData } from '../../data/examData';

function ExamTimetable() {
  const { activeExam, setActiveExam, currentData } = useExamTimetable();

  return (
    <div className="space-y-4">
      {/* Section Title */}
      <div className="border-b-2 border-gray-800 pb-1">
        <h2 className="text-lg font-bold text-gray-900">📋 Exams & Academics</h2>
      </div>

      {/* Three Big Buttons */}
      <div className="grid grid-cols-3 gap-3">
        {examTypes.map((type) => {
          const label = type.toUpperCase();
          const emoji = type === 'mse' ? '📝' : type === 'ese' ? '📄' : '📊';
          return (
            <button
              key={type}
              onClick={() => setActiveExam(type)}
              className={`
                py-3 px-2 rounded-lg font-bold text-sm transition-all duration-200 border-2
                ${activeExam === type 
                  ? 'bg-gray-800 text-white border-gray-800' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-800'}
              `}
            >
              {emoji} {label}
            </button>
          );
        })}
      </div>

      {/* Exam Schedule Card */}
      {currentData && (
        <div className="bg-white border-2 border-gray-800 rounded-xl overflow-hidden">
          <div className="bg-gray-100 border-b-2 border-gray-800 px-4 py-2.5">
            <span className="text-sm font-bold text-gray-800">{currentData.name}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Subject</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Date</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Time</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Syllabus</th>
                </tr>
              </thead>
              <tbody>
                {currentData.schedule.map((item, idx) => (
                  <tr key={idx} className={`border-b border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-4 py-2.5 font-medium text-gray-800">{item.subject}</td>
                    <td className="px-4 py-2.5 text-gray-600">{item.date}</td>
                    <td className="px-4 py-2.5 text-gray-600">{item.time}</td>
                    <td className="px-4 py-2.5 text-gray-500 text-sm">{item.syllabus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExamTimetable;