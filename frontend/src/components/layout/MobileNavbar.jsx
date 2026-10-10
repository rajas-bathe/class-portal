import React from 'react';
import { useSidebar } from '../../context/SidebarContext';

function MobileNavbar() {
  const { openSidebar } = useSidebar();
  const today = new Date();

  const formattedDate = today.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const formattedDay = today.toLocaleDateString('en-US', {
    weekday: 'long',
  });

  return (
    <div className="lg:hidden bg-white border-b-2 border-gray-800">
      <header className="flex justify-between items-center px-4 py-2.5">
        <button
          onClick={openSidebar}
          className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-gray-800 bg-white hover:bg-gray-100 active:scale-95 transition-all text-gray-800 shadow-xs"
          aria-label="Open menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <line x1="3.75" y1="6.75" x2="20.25" y2="6.75" />
            <line x1="3.75" y1="12" x2="20.25" y2="12" />
            <line x1="3.75" y1="17.25" x2="20.25" y2="17.25" />
          </svg>
        </button>

        <h1 className="text-lg font-bold text-gray-900 tracking-tight">
          Class Post
        </h1>

        <div className="text-right leading-tight select-none">
          <div className="text-xs font-extrabold text-gray-900">
            {formattedDate}
          </div>
          <div className="text-[11px] font-semibold text-gray-500">
            {formattedDay}
          </div>
        </div>
      </header>
    </div>
  );
}

export default MobileNavbar;