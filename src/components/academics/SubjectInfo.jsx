import React from 'react';

const subjects = [
  { 
    name: 'Operating System', 
    code: 'OS', 
    faculty: 'Mr. Amol Dhumal', 
    credits: 4, 
    cia: 20, 
    mse: 30, 
    ese: 50 
  },
  { 
    name: 'Microprocessor', 
    code: 'MP', 
    faculty: 'Ms. Vaishnavi V. Mestry', 
    credits: 4, 
    cia: 20, 
    mse: 30, 
    ese: 50 
  },
  { 
    name: 'Foundation of Embedded System', 
    code: 'FES', 
    faculty: 'Ms. Amruta Kulkarni', 
    credits: 3, 
    cia: 20, 
    mse: 30, 
    ese: 50 
  },
  { 
    name: 'Engineering Career Navigation', 
    code: 'ECN', 
    faculty: 'Ms. Ranjana Deshmukh', 
    credits: 2, 
    cia: 30, 
    mse: 30, 
    ese: 40 
  },
];

function SubjectInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {subjects.map((subject, idx) => (
        <div key={idx} className="border-2 border-gray-200 rounded-lg p-4 hover:border-gray-800 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">{subject.code}</span>
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {subject.credits} Credits
            </span>
          </div>
          <div className="text-sm font-medium text-gray-800 mt-0.5">{subject.name}</div>
          <div className="text-xs text-gray-500 mt-0.5">{subject.faculty}</div>
          <div className="flex gap-2 mt-2 text-[10px] font-medium">
            <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">CIA: {subject.cia}%</span>
            <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full">MSE: {subject.mse}%</span>
            <span className="bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">ESE: {subject.ese}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SubjectInfo;