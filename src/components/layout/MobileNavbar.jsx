import React from 'react';
import { useSidebar } from '../../context/SidebarContext';

function MobileNavbar() {
  const { openSidebar } = useSidebar();
  const today = new Date();

  const formattedDate = today.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="lg:hidden bg-white shadow-md">
      <header className="flex justify-between items-center p-1">
        {/* Hamburger Menu */}
        <button
          onClick={openSidebar}
          className="p-2 text-3xl font-bold hover:bg-neutral-200 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          ☰
        </button>

        <h1 className="text-2xl font-bold text-gray-800">Class Portal</h1>

        <span className="text-sm font-medium text-gray-800">
          {formattedDate}
        </span>
      </header>
    </div>
  );
}

export default MobileNavbar;