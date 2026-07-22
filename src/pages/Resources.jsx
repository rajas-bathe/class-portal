import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { templates } from '../data/templatesData';
import { forms } from '../data/formsData';
import DocCard from '../components/resources/DocCard';
import DriveFolderCard from '../components/resources/DriveFolderCard';
import SectionHeader from '../components/resources/SectionHeader';

function Resources() {
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">📁 Resources</h1>
        <p className="text-sm text-gray-500">Access study materials, templates, and important documents</p>
      </div>

      {/* Section 1: Google Drive */}
      <div className="space-y-4">
        <SectionHeader icon="📂" title="Google Drive" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DriveFolderCard
            title="Lecture Notes"
            count="6 files"
            onClick={() => navigate('/resources/drive')}
          />
          <DriveFolderCard
            title="Lab Manuals"
            count="4 files"
            onClick={() => navigate('/resources/drive')}
          />
          <DriveFolderCard
            title="Question Papers"
            count="3 files"
            onClick={() => navigate('/resources/drive')}
          />
          <button
            onClick={() => navigate('/resources/drive')}
            className="bg-gray-800 text-white border-2 border-gray-800 rounded-xl p-6 text-center hover:bg-gray-700 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex flex-col items-center justify-center"
          >
            <span className="text-4xl">→</span>
            <p className="mt-2 text-sm font-bold">View All</p>
            <p className="text-xs text-gray-400">Browse all folders</p>
          </button>
        </div>
      </div>

      {/* Section 2: Document Templates — Vertical Cards */}
      <div className="space-y-4">
        <SectionHeader icon="📄" title="Document Templates" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {templates.map((template) => (
            <DocCard
              key={template.id}
              {...template}
              type="template"
            />
          ))}
        </div>
      </div>

      {/* Section 3: Common Forms — Vertical Cards */}
      <div className="space-y-4">
        <SectionHeader icon="📋" title="Common Forms" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {forms.map((form) => (
            <DocCard
              key={form.id}
              {...form}
              type="form"
            />
          ))}
        </div>
      </div>

      {/* Section 4: Syllabus & Academic Calendar — Direct Links */}
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