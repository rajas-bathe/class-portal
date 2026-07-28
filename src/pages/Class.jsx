import React from 'react';
import Gallery from '../components/class/Gallery';
import { classInfo } from '../data/classData';

function Class() {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">👥 Class Hub</h1>
        <p className="text-sm text-gray-500">Class information and photo gallery</p>
      </div>

      {/* Class Information Card */}
      <div className="bg-white border-2 border-gray-800 rounded-xl overflow-hidden">
        <div className="bg-gray-100 border-b-2 border-gray-800 px-4 py-2.5">
          <span className="text-sm font-bold text-gray-800">📋 Class Information</span>
        </div>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-gray-500">Class</p>
            <p className="text-sm font-bold text-gray-900">{classInfo.className} - {classInfo.division}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Class Teacher</p>
            <p className="text-sm font-bold text-gray-900">{classInfo.classTeacher}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Total Students</p>
            <p className="text-sm font-bold text-gray-900">{classInfo.totalStudents}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Academic Year</p>
            <p className="text-sm font-bold text-gray-900">{classInfo.academicYear}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Semester</p>
            <p className="text-sm font-bold text-gray-900">{classInfo.semester}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Batch</p>
            <p className="text-sm font-bold text-gray-900">{classInfo.batch}</p>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-800 pb-1">📸 Class Gallery</h2>
          <span className="text-xs text-gray-400">Auto-updates from Drive</span>
        </div>
        <Gallery />
      </div>

    </div>
  );
}

export default Class;