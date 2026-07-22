import React from 'react';
import { useNavigate } from 'react-router-dom';
import { driveFolders } from '../data/driveData';

function DriveView() {
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <button
        onClick={() => navigate('/resources')}
        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
      >
        ← Back to Resources
      </button>

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">📂 Google Drive</h1>
        <p className="text-sm text-gray-500">Browse study materials, notes, and resources</p>
      </div>

      <div className="space-y-6">
        {driveFolders.map((folder) => (
          <div key={folder.id} className="bg-white border-2 border-gray-800 rounded-xl overflow-hidden">
            <div className="bg-gray-100 border-b-2 border-gray-800 px-4 py-3 flex items-center gap-2">
              <span className="text-xl">📁</span>
              <span className="text-sm font-bold text-gray-900">{folder.name}</span>
              <span className="ml-auto text-xs text-gray-500">{folder.files.length} files</span>
            </div>
            <div className="p-3 divide-y divide-gray-100">
              {folder.files.map((file) => (
                <a
                  key={file.id}
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 py-2 hover:bg-gray-50 px-2 rounded transition-colors"
                >
                  <span className="text-gray-400 text-sm">📄</span>
                  <span className="text-sm text-gray-800 hover:text-gray-900">{file.name}</span>
                  <span className="ml-auto text-xs text-gray-400">🔗</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DriveView;