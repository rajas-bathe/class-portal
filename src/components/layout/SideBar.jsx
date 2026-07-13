import React from 'react';
import { Link } from 'react-router-dom';
import { useSidebar } from '../../context/SidebarContext';

function SideBar() {
  const { isSidebarOpen, closeSidebar } = useSidebar();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/academics', label: 'Academics', icon: '👤' },
    { path: '/resources', label: 'Resoruces', icon: '⚙️' },
    { path: '/announcements', label: 'Announcements', icon: '⚙️' },
    { path: '/class', label: 'Class', icon: '⚙️' },
  ];

  return (
    <>
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar - Changed bg-white to bg-neutral-200 */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-neutral-200 shadow-2xl z-50
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:relative lg:shadow-lg
      `}
      >

        {/* Logo - Only visible on desktop (lg and above) */}
        <div className="hidden lg:block p-6 border-b border-neutral-300">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">CP</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Class Portal</h1>
              <p className="text-xs text-gray-500">Admin Dashboard</p>
            </div>
          </Link>
        </div>

        {/* Close button - mobile only */}
        <div className="p-4 border-b border-neutral-300 flex justify-between items-center lg:hidden">
          <h2 className="font-bold text-xl">Menu</h2>
          <button
            onClick={closeSidebar}
            className="text-3xl hover:bg-neutral-300 p-2 rounded-lg"
          >
            ✕
          </button>
        </div>

        {/* Navigation - Changed hover from blue-50 to neutral-300 */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={closeSidebar}
                  className="block p-3 hover:bg-neutral-300 rounded-lg transition-colors flex items-center gap-3"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default SideBar;