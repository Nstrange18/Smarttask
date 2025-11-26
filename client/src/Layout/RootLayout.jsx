import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import { useState, useEffect } from "react";

const RootLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // AUTO COLLAPSE SIDEBAR ON PAGE CHANGE
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(prev => !prev)}
      />

      <div className="flex-1 ml-0 sm:ml-20 p-0 sm:p-0">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
