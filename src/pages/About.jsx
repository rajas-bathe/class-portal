import React from 'react';

function About() {
  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="border-b-2 border-gray-800 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">👨‍💻 About</h1>
        <p className="text-sm text-gray-500 mt-1">Class Portal — Built for students, by a student</p>
      </div>

      {/* Developer Card */}
      <div className="bg-white border-2 border-gray-800 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gray-800 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
            RB
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Rajas Bathe</h2>
            <p className="text-gray-600">Full Stack Developer · React Enthusiast</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full">SY B.Tech (UG)</span>
              <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full">Computer Engineering</span>
            </div>
          </div>
        </div>
      </div>

      {/* About Project */}
      <div className="bg-white border-2 border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">📖 About Class Portal</h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          Class Portal is a student‑facing web application that centralizes academic resources, 
          class schedules, announcements, and important documents in one place. It's designed 
          to help students manage their academic life more efficiently.
        </p>
        <ul className="mt-3 space-y-1 text-sm text-gray-600">
          <li>📅 <span className="font-medium">Timetable:</span> View class and lab schedules with real‑time indicators.</li>
          <li>📁 <span className="font-medium">Resources:</span> Access lecture notes, lab manuals, and templates.</li>
          <li>📢 <span className="font-medium">Announcements:</span> Stay updated with college and club announcements.</li>
          <li>📸 <span className="font-medium">Gallery:</span> Browse class photos and event memories.</li>
        </ul>
      </div>

      {/* Tech Stack */}
      <div className="bg-white border-2 border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">🛠️ Tech Stack</h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">React</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">Vite</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">Tailwind CSS</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">React Router</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">Google Drive API</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">Airtable</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">JSONBin</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">Imgur API</span>
        </div>
      </div>

      {/* Connect */}
      <div className="bg-white border-2 border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">🔗 Connect with Me</h3>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://github.com/rajas-bathe"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm font-medium"
          >
            <span>🐙</span> GitHub
          </a>
          <a
            href="mailto:rajasbathe9@gmail.com"
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm font-medium"
          >
            <span>✉️</span> Email
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm font-medium"
          >
            <span>🔗</span> LinkedIn
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-400 pt-4 border-t border-gray-200">
        © 2026 Class Portal · Built with ❤️ by Rajas Bathe
      </div>
    </div>
  );
}

export default About;