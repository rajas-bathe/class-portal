import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { subjectData } from '../data/subjectData';

function SubjectDetail() {
  const navigate = useNavigate();
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjectData[0]?.id || 1);

  const selectedSubject = subjectData.find(s => s.id === selectedSubjectId);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      
      {/* Back Button */}
      <button
        onClick={() => navigate('/academics')}
        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
      >
        ← Back to Academics
      </button>

      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
          📋 Subject Information
        </h1>
        <p className="text-sm text-gray-500">Select a subject to view its syllabus, marking scheme & resources</p>
      </div>

      {/* Subject Buttons — Like Day Selector */}
      <div className="flex flex-wrap gap-2">
        {subjectData.map((subject) => (
          <button
            key={subject.id}
            onClick={() => setSelectedSubjectId(subject.id)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2
              ${selectedSubjectId === subject.id 
                ? 'bg-gray-800 text-white border-gray-800' 
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-800'}
            `}
          >
            {subject.code}
          </button>
        ))}
      </div>

      {/* Subject Detail Card — Only shows for selected subject */}
      {selectedSubject && (
        <div className="bg-white border-2 border-gray-800 rounded-xl overflow-hidden">
          
          {/* Subject Header */}
          <div className="bg-gray-100 border-b-2 border-gray-800 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <span className="text-sm font-bold text-gray-500">{selectedSubject.code}</span>
              <h2 className="text-lg font-bold text-gray-900">{selectedSubject.name}</h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full font-medium text-gray-700">
                {selectedSubject.credits} Credits
              </span>
              <span className="text-xs text-gray-600">{selectedSubject.faculty}</span>
            </div>
          </div>

          {/* Marking Scheme */}
          <div className="px-4 py-3 border-b border-gray-200 flex flex-wrap gap-4">
            <span className="text-xs font-semibold text-gray-500">Marking Scheme:</span>
            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
              CIA: {selectedSubject.marking.cia}%
            </span>
            <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
              MSE: {selectedSubject.marking.mse}%
            </span>
            <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">
              ESE: {selectedSubject.marking.ese}%
            </span>
          </div>

          {/* Syllabus */}
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-xs font-semibold text-gray-500 mb-2">📖 Syllabus:</p>
            <div className="space-y-2">
              {selectedSubject.syllabus.map((module) => (
                <div key={module.module} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-600 bg-gray-200 px-2 py-0.5 rounded-full">
                      Module {module.module}
                    </span>
                    <span className="text-sm font-medium text-gray-800">{module.topic}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{module.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          {selectedSubject.resources && selectedSubject.resources.length > 0 && (
            <div className="px-4 py-3">
              <p className="text-xs font-semibold text-gray-500 mb-1">📚 Resources:</p>
              <ul className="list-disc list-inside text-xs text-gray-700 space-y-0.5">
                {selectedSubject.resources.map((resource, idx) => (
                  <li key={idx}>{resource}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SubjectDetail;