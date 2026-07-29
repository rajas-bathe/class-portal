import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import DriveBrowser from '../components/resources/DriveBrowser';

function DriveView() {
  const navigate = useNavigate();
  const { folderId } = useParams();
  const location = useLocation();

  // Get folder path from navigation state, or initialize with root
  const [folderPath, setFolderPath] = useState(() => {
    if (location.state?.folderPath) {
      return location.state.folderPath;
    }
    return [{ id: import.meta.env.VITE_DRIVE_FOLDER_ID, name: 'Root' }];
  });

  // Update folder path when location state changes
  useEffect(() => {
    if (location.state?.folderPath) {
      setFolderPath(location.state.folderPath);
    }
  }, [location.state]);

  const rootFolderId = folderId || import.meta.env.VITE_DRIVE_FOLDER_ID;
  const galleryFolderId = import.meta.env.VITE_GALLERY_FOLDER_ID;

  const navigateToFolder = (id, name, index) => {
    const newPath = folderPath.slice(0, index + 1);
    setFolderPath(newPath);
    navigate(`/resources/drive/${id}`, { state: { folderPath: newPath } });
  };

  const goUp = () => {
    if (folderPath.length > 1) {
      const newPath = folderPath.slice(0, -1);
      setFolderPath(newPath);
      const parent = newPath[newPath.length - 1];
      navigate(`/resources/drive/${parent.id}`, { state: { folderPath: newPath } });
    } else {
      navigate('/resources');
    }
  };

  const handleSubfolderNavigate = (subFolderId, subFolderName) => {
    const newPath = [...folderPath, { id: subFolderId, name: subFolderName }];
    setFolderPath(newPath);
    navigate(`/resources/drive/${subFolderId}`, { state: { folderPath: newPath } });
  };

  // ✅ Pass folderPath when navigating to a file
  const handleFileClick = (fileId) => {
    navigate(`/resources/drive/file/${fileId}`, {
      state: { fromFolderId: rootFolderId, folderPath: folderPath }
    });
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* Navigation Bar */}
      <div className="bg-white border-2 border-gray-800 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-500 mr-1">📂</span>
            {folderPath.map((folder, index) => (
              <React.Fragment key={folder.id}>
                {index > 0 && <span className="text-gray-400 text-sm">›</span>}
                <button
                  onClick={() => navigateToFolder(folder.id, folder.name, index)}
                  className={`text-sm font-medium transition-colors ${
                    index === folderPath.length - 1
                      ? 'text-gray-900 cursor-default'
                      : 'text-gray-600 hover:text-blue-600 hover:underline'
                  }`}
                  disabled={index === folderPath.length - 1}
                >
                  {folder.name}
                </button>
              </React.Fragment>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={goUp}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
            >
              ↑ Up
            </button>
            <button
              onClick={() => navigate('/resources')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm font-medium transition-colors"
            >
              ← Resources
            </button>
          </div>
        </div>

        {/* Current folder indicator */}
        <div className="mt-3 pt-3 border-t border-gray-200 flex items-center gap-2 text-xs text-gray-500">
          <span>📍</span>
          <span>
            {folderPath.length > 1
              ? `Viewing: ${folderPath[folderPath.length - 1].name}`
              : 'Root folder'}
          </span>
        </div>
      </div>

      {/* Drive Browser */}
      <DriveBrowser
        folderId={rootFolderId}
        excludeFolderId={galleryFolderId}
        onNavigate={handleSubfolderNavigate}
        onFileClick={handleFileClick}
      />
    </div>
  );
}

export default DriveView;