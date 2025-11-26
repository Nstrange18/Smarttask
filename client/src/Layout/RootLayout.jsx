import { Outlet } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import { useState } from "react";

const RootLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <main className="flex-1 sm:ml-20 p-0">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
