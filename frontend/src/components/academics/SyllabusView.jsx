import React from 'react';

function SyllabusView() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">Full semester syllabus will be displayed here.</p>
      <div className="space-y-2">
        <div className="border-b border-gray-200 pb-2">
          <h4 className="font-semibold">Module 1: Introduction</h4>
          <p className="text-sm text-gray-600">Topics: OS basics, types, history</p>
        </div>
        <div className="border-b border-gray-200 pb-2">
          <h4 className="font-semibold">Module 2: Process Management</h4>
          <p className="text-sm text-gray-600">Topics: Process states, scheduling, IPC</p>
        </div>
      </div>
    </div>
  );
}

export default SyllabusView;