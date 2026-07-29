import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { templates } from '../data/templatesData';
import { forms } from '../data/formsData';
import DocCard from '../components/resources/DocCard';
import SectionHeader from '../components/resources/SectionHeader';
import DriveBrowser from '../components/resources/DriveBrowser';

function Resources() {
  const navigate = useNavigate();

  const driveFolderId = import.meta.env.VITE_DRIVE_FOLDER_ID;
  const galleryFolderId = import.meta.env.VITE_GALLERY_FOLDER_ID;

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-8">

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">📁 Resources</h1>
        <p className="text-sm text-gray-500">Access study materials, templates, and important documents</p>
      </div>

      {/* Google Drive Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <SectionHeader icon="📂" title="Google Drive" />
          <button
            onClick={() => navigate('/resources/drive')}
            className="text-sm text-blue-600 hover:underline"
          >
            View All →
          </button>
        </div>
        <DriveBrowser
          folderId={driveFolderId}
          excludeFolderId={galleryFolderId}
          onNavigate={(subFolderId) => navigate(`/resources/drive/${subFolderId}`)}
        />
      </div>

      {/* Templates and Forms */}
      {/* ... unchanged */}
    </div>
  );
}

export default Resources;