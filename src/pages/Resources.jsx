import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { templates } from '../data/templatesData';
import { forms } from '../data/formsData';
import DocCard from '../components/resources/DocCard';
import SectionHeader from '../components/resources/SectionHeader';
import DriveFolderCard from '../components/resources/DriveFolderCard';
import { useDrive } from '../hooks/useDrive';

function Resources() {
  const navigate = useNavigate();

  const driveFolderId = import.meta.env.VITE_DRIVE_FOLDER_ID;
  const galleryFolderId = import.meta.env.VITE_GALLERY_FOLDER_ID;

  // ✅ Fetch only the first 4 folders from Drive
  const { items, loading, error } = useDrive(driveFolderId, galleryFolderId);
  const previewFolders = items.folders?.slice(0, 4) || [];

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
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 text-sm border border-gray-700"
          >
            <span className="text-lg">→</span>
            View All
          </button>
        </div>

        {/* ✅ Show only 4 folders as preview */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
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
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {previewFolders.map((folder) => (
              <DriveFolderCard
                key={folder.id}
                title={folder.name}
                count={`${folder.files?.length || 0} files`}
                onClick={() => navigate(`/resources/drive/${folder.id}`)}
              />
            ))}
            {/* ✅ "View All" card as the 4th slot if there are fewer than 4 folders */}
            {previewFolders.length < 4 && (
              <button
                onClick={() => navigate('/resources/drive')}
                className="bg-gray-800 text-white border-2 border-gray-800 rounded-xl p-6 text-center hover:bg-gray-700 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex flex-col items-center justify-center col-span-1"
              >
                <span className="text-4xl">→</span>
                <p className="mt-2 text-sm font-bold">View All</p>
                <p className="text-xs text-gray-400">Browse all folders</p>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Document Templates */}
      <div className="space-y-4">
        <SectionHeader icon="📄" title="Document Templates" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {templates.map((template) => (
            <DocCard key={template.id} {...template} type="template" />
          ))}
        </div>
      </div>

      {/* Common Forms */}
      <div className="space-y-4">
        <SectionHeader icon="📋" title="Common Forms" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {forms.map((form) => (
            <DocCard key={form.id} {...form} type="form" />
          ))}
        </div>
      </div>

      {/* Syllabus & Academic Calendar */}
      <div className="space-y-4">
        <SectionHeader icon="📚" title="Syllabus & Academic Calendar" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/academics/subjects"
            className="bg-white border-2 border-gray-800 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] block"
          >
            <div className="text-4xl mb-2">📖</div>
            <h3 className="text-sm font-bold text-gray-900">View Full Syllabus</h3>
            <p className="text-xs text-gray-500">Complete semester syllabus with modules & resources</p>
            <div className="mt-3 text-xs font-medium text-gray-400">Click to view →</div>
          </Link>
          <Link
            to="/academics/calendar"
            className="bg-white border-2 border-gray-800 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] block"
          >
            <div className="text-4xl mb-2">📅</div>
            <h3 className="text-sm font-bold text-gray-900">Academic Calendar</h3>
            <p className="text-xs text-gray-500">Upcoming events, holidays & deadlines</p>
            <div className="mt-3 text-xs font-medium text-gray-400">Click to view →</div>
          </Link>
        </div>
      </div>

    </div>
  );
}

export default Resources;