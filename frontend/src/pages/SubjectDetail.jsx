import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { subjectData } from '../data/subjectData';

function SubjectDetail() {
  const navigate = useNavigate();
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjectData[0]?.id || 1);

  useEffect(() => {
    window.scrollTo(0, 0);
    const main = document.querySelector('main');
    if (main) main.scrollTop = 0;
  }, []);

  const selectedSubject = subjectData.find((s) => s.id === selectedSubjectId);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-800 rounded-xl text-xs md:text-sm font-bold text-gray-900 hover:bg-gray-100 shadow-xs hover:shadow-sm active:scale-95 transition-all group"
        >
          <span className="text-base transition-transform group-hover:-translate-x-1 leading-none font-extrabold">←</span>
          <span>Back</span>
        </button>
      </div>

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
          📋 Subject Syllabus
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Select a subject to view its complete module-wise syllabus & sub-topics
        </p>
      </div>

      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-2.5">
        {subjectData.map((subject) => {
          const isSelected = selectedSubjectId === subject.id;
          return (
            <button
              key={subject.id}
              onClick={() => setSelectedSubjectId(subject.id)}
              className={`
                p-2.5 sm:px-5 sm:py-2.5 rounded-lg transition-all duration-150 border-2 flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 text-center
                ${
                  isSelected
                    ? 'bg-gray-800 text-white border-gray-800 shadow-md'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-800 hover:bg-gray-50'
                }
              `}
            >
              <span className="font-extrabold text-sm">{subject.code}</span>
              <span className="text-[11px] sm:text-sm font-medium opacity-90 truncate max-w-full">
                {subject.name}
              </span>
            </button>
          );
        })}
      </div>

      {selectedSubject && (
        <div className="bg-white border-2 border-gray-800 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-yellow-300 border-b-2 border-gray-800 px-5 py-3 flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-mono font-bold text-gray-800 bg-white/80 border border-gray-800/30 px-2 py-0.5 rounded">
                {selectedSubject.courseCode}
              </span>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mt-1 tracking-tight">
                {selectedSubject.name}
              </h2>
            </div>
            <span className="text-xs font-bold bg-white border border-gray-800 px-3 py-1 rounded">
              {selectedSubject.syllabus.length} Modules
            </span>
          </div>

          <div className="p-4 md:p-6 space-y-4">
            {selectedSubject.syllabus.map((mod) => (
              <div
                key={mod.module}
                className="border-2 border-gray-800 rounded-xl overflow-hidden shadow-xs"
              >
                <div className="bg-gray-100 border-b-2 border-gray-800 px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold bg-gray-800 text-white px-2.5 py-0.5 rounded">
                      Module {mod.module}
                    </span>
                    <h3 className="text-sm md:text-base font-bold text-gray-900">
                      {mod.topic}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-gray-800 bg-white border border-gray-800 px-2 py-0.5 rounded">
                    ⏱️ {mod.hours} Hours
                  </span>
                </div>

                <div className="p-4 bg-white">
                  <ul className="space-y-2">
                    {mod.subtopics.map((sub, sIdx) => (
                      <li
                        key={sIdx}
                        className="flex items-start gap-2.5 text-xs md:text-sm text-gray-800 leading-relaxed font-medium"
                      >
                        <span className="text-gray-400 font-bold select-none">•</span>
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SubjectDetail;