import React, { useState } from 'react';
import { useDrive } from '../../hooks/useDrive';
import DriveFileViewer from './DriveFileViewer';

function DriveBrowser({ folderId, excludeFolderId, onNavigate }) {
  const { items, loading, error } = useDrive(folderId, excludeFolderId);
  const [viewerFile, setViewerFile] = useState(null);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-gray-200 rounded-xl h-32 animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 text-center">
        <p className="text-red-600 font-medium">⚠️ Failed to load Drive</p>
        <p className="text-sm text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 bg-gray-800 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-gray-900"
        >
          Retry
        </button>
      </div>
    );
  }

  const { folders, files } = items;

  // Helper to get file icon
  const getFileIcon = (mimeType) => {
    if (mimeType.includes('pdf')) return '📄';
    if (mimeType.includes('presentation')) return '📊';
    if (mimeType.includes('document') || mimeType.includes('word')) return '📝';
    if (mimeType.includes('spreadsheet')) return '📈';
    return '📎';
  };

  return (
    <>
      {/* Folders */}
      {folders.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-1">📁 Folders</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => onNavigate && onNavigate(folder.id)}
                className="bg-white border-2 border-gray-800 rounded-xl p-4 text-center hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex flex-col items-center"
              >
                <span className="text-4xl mb-2">📁</span>
                <h4 className="text-sm font-bold text-gray-900">{folder.name}</h4>
                <p className="text-xs text-gray-500">Click to open</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Files */}
      {files.length > 0 && (
        <div className="space-y-4 mt-6">
          <h3 className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-1">📄 Files</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {files.map((file) => {
              const icon = getFileIcon(file.mimeType);
              return (
                <button
                  key={file.id}
                  onClick={() => setViewerFile(file)}
                  className="bg-white border-2 border-gray-800 rounded-xl p-4 text-center hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex flex-col items-center"
                >
                  <span className="text-4xl mb-2">{icon}</span>
                  <h4 className="text-sm font-bold text-gray-900 truncate w-full">{file.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">Click to view</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {folders.length === 0 && files.length === 0 && (
        <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-8 text-center">
          <p className="text-gray-500">This folder is empty</p>
        </div>
      )}

      {/* File Viewer Modal */}
      {viewerFile && (
        <DriveFileViewer
          file={viewerFile}
          onClose={() => setViewerFile(null)}
        />
      )}
    </>
  );
}

export default DriveBrowser;