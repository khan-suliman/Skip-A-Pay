import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div
      style={{
        paddingTop: "6px",
        paddingLeft: "var(--sidebar)",
      }}
    >
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Layout;
