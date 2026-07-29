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