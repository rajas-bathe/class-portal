import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DriveBrowser from '../components/resources/DriveBrowser';

function DriveView() {
  const navigate = useNavigate();
  const { folderId } = useParams();

  // Use root folder from .env if no folderId is provided
  const rootFolderId = folderId || import.meta.env.VITE_DRIVE_FOLDER_ID;
  const galleryFolderId = import.meta.env.VITE_GALLERY_FOLDER_ID;

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
        <p className="text-sm text-gray-500">Browse all files and folders</p>
      </div>
      <DriveBrowser
        folderId={rootFolderId}
        excludeFolderId={galleryFolderId}
        onNavigate={(subFolderId) => navigate(`/resources/drive/${subFolderId}`)}
      />
    </div>
  );
}

export default DriveView;