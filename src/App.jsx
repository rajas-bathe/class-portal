import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SidebarProvider } from "./context/SidebarContext";
import SideBar from "./components/layout/SideBar";
import Dashboard from "./pages/Dashboard";
import MobileNavbar from "./components/layout/MobileNavbar";
import Profile from "./pages/Profile";

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
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;