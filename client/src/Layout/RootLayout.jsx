import { Outlet } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import { useState } from "react";

const RootLayout = () => {
  const [sidebarHover, setSidebarHover] = useState(false);

  return (
    <div>
      <Sidebar setSidebarHover={setSidebarHover} />

      {sidebarHover && (
        <div className="fixed top-0 left-20 w-[calc(100%-5rem)] h-full bg-black/30 backdrop-blur-sm z-50 transition-all ease-in duration-700 delay-150"></div>
      )}
      <Outlet />
    </div>
  );
};

export default RootLayout;
