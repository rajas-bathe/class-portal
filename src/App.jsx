//Importing Pages
import Dashboard from "./pages/Dashboard";
import Academics from "./pages/Academics"; 
import Resources from "./pages/Resources";
import Announcements from "./pages/Announcements";
import Class from "./pages/Class";
//Improting Components
import SideBar from "./components/layout/SideBar";
import MobileNavbar from "./components/layout/MobileNavbar";
//Importing Context
import { SidebarProvider } from "./context/SidebarContext";
//Importing BrowserRouter
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen">
        <MobileNavbar />
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar - neutral-200 */}
          <SideBar />
          {/* Main content background - neutral-300 */}
          <main className="flex-1 overflow-y-auto bg-neutral-300">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/academics" element={<Academics />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/class" element={<Class />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;