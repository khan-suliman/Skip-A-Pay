import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import config from "../config/config";

const Layout = () => {
  let root = document.documentElement;
  let screenWidth = window.innerWidth;

  const [sidebar, setSidebar] = useState(false);
  const handleSidebar = () => {
    setSidebar(!sidebar);
    if (screenWidth <= config.hideSidebar) {
      root.style.setProperty("--sidebar", 0);
    } else {
      root.style.setProperty(
        "--sidebar",
        sidebar && root.style.getPropertyValue("--sidebar") === "270px"
          ? "60px"
          : "270px"
      );
    }
  };
  const handleResize = () => {
    screenWidth = window.innerWidth;
    handleSidebar();
  };
  useEffect(() => {
    handleSidebar();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      style={{
        paddingLeft: "var(--sidebar)",
        transition: "all 300ms ease-in-out",
      }}
    >
      <Sidebar handleSidebar={handleSidebar} isOpenSidebar={sidebar} />
      <Header handleClick={handleSidebar} />
      <div style={{ padding: "40px 25px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
