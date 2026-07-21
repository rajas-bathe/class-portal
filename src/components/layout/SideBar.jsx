import React from 'react';
import { Link } from 'react-router-dom';
import { useSidebar } from '../../context/SidebarContext';

function SideBar() {
  const { isSidebarOpen, closeSidebar } = useSidebar();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/academics', label: 'Academics', icon: '📚' },
    { path: '/resources', label: 'Resources', icon: '📁' },
    { path: '/announcements', label: 'Announcements', icon: '📢' },
    { path: '/class', label: 'Class', icon: '🎓' },
  ];

  return (
    <>
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar — Clean white, black borders, minimal */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white border-r-2 border-gray-800 z-50
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:relative lg:shadow-lg
      `}>

        {/* Logo — Minimal black & white */}
        <div className="hidden lg:block p-5 border-b-2 border-gray-800">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">CP</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 tracking-tight">Class Portal</h1>
            </div>
          </Link>
        </div>

        {/* Close button - mobile only */}
        <div className="p-4 border-b-2 border-gray-800 flex justify-between items-center lg:hidden">
          <h2 className="font-bold text-gray-900">Menu</h2>
          <button
            onClick={closeSidebar}
            className="text-2xl text-gray-600 hover:text-gray-900 p-1"
          >
            ✕
          </button>
        </div>

        {/* Navigation — Clean, minimal */}
        <nav className="p-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={closeSidebar}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom — Optional user info / version */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t-2 border-gray-800">
          <p className="text-[10px] text-gray-400 text-center">v1.0 · SY B.Tech (UG)</p>
        </div>
      </aside>
    </>
  );
}

export default SideBar;