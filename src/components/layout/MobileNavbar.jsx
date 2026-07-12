import React from 'react';
import { useSidebar } from '../../context/SidebarContext';

function MobileNavbar() {
  const { openSidebar } = useSidebar();

  return (
    <div className="lg:hidden bg-white shadow-md">
      <header className="flex justify-between items-center p-4">
        <button 
          onClick={openSidebar}
          className="p-2 text-3xl font-bold hover:bg-neutral-200 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          ☰
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Class Portal</h1>
        <div className="bg-neutral-300 w-10 h-10 rounded-full flex items-center justify-center">
          <span className="text-gray-600 font-bold">P</span>
        </div>
      </header>
    </div>
  );
}

export default MobileNavbar;