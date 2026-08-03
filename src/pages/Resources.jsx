import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { templates } from '../data/templatesData';
import { forms } from '../data/formsData';
import DocCard from '../components/resources/DocCard';
import SectionHeader from '../components/resources/SectionHeader';
import DriveFolderCard from '../components/resources/DriveFolderCard';
import { useDrive } from '../hooks/useDrive';
import { InfoCards } from '../components/academics';

function Resources() {
  const navigate = useNavigate();

  const driveFolderId = import.meta.env.VITE_DRIVE_FOLDER_ID;
  const galleryFolderId = import.meta.env.VITE_GALLERY_FOLDER_ID;

  // Fetch Drive folders for the preview strip. If there are more than 4,

  const { items, loading, error } = useDrive(driveFolderId, galleryFolderId);
  const allFolders = items.folders || [];
  const hasMoreFolders = allFolders.length > 4;
  const previewFolders = hasMoreFolders ? allFolders.slice(0, 3) : allFolders.slice(0, 4);
  const remainingCount = allFolders.length - previewFolders.length;

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
          {/* Only shown below the lg breakpoint (mobile/tablet); hidden on
              desktop where the 4th grid card serves as View All instead. */}
          <button
            onClick={() => navigate('/resources/drive')}
            className="flex lg:hidden items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 text-sm border border-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-800"
          >
            <span className="text-lg">→</span>
            View All
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-32 animate-pulse"></div>
            ))}
          </div>
        ) : error ? (
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
        ) : previewFolders.length === 0 ? (
          <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-8 text-center">
            <p className="text-3xl mb-2">🗂️</p>
            <p className="text-gray-500 text-sm">No folders here yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {previewFolders.map((folder) => (
              <DriveFolderCard
                key={folder.id}
                title={folder.name}
                count="Open folder"
                onClick={() => navigate(`/resources/drive/${folder.id}`)}
              />
            ))}
            {hasMoreFolders && (
              <button
                onClick={() => navigate('/resources/drive')}
                className="bg-gray-800 text-white border-2 border-gray-800 rounded-xl p-6 text-center hover:bg-gray-700 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex flex-col items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-800"
                aria-label={`View all folders, ${remainingCount} more`}
              >
                <span className="text-4xl">→</span>
                <p className="mt-2 text-sm font-bold">View All</p>
                <p className="text-xs text-gray-400">
                  {remainingCount} more folder{remainingCount === 1 ? '' : 's'}
                </p>
              </button>
            )}
          </div>
        )}
      </div>

        
      {/* Document Templates 
      <div className="space-y-4">
        <SectionHeader icon="📄" title="Document Templates" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {templates.map((template) => (
            <DocCard key={template.id} {...template} type="template" />
          ))}
        </div>
      </div> */}

      {/* Common Forms 
      <div className="space-y-4">
        <SectionHeader icon="📋" title="Common Forms" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {forms.map((form) => (
            <DocCard key={form.id} {...form} type="form" />
          ))}
        </div>
      </div> */}

      {/* Syllabus & Academic Calendar */}
      <div className="space-y-4">
        <SectionHeader icon="📚" title="Syllabus & Academic Calendar" />
        <InfoCards />
      </div>

    </div>
  );
}

export default Resources;