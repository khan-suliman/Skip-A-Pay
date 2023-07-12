import React, { Suspense, lazy, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import config from "../config/config";
import Loader from "components/Loader";

const Sidebar = lazy(() => import("./Sidebar"));

const Layout = () => {
  let root = document.documentElement;
  let screenWidth = window.innerWidth;

  const [sidebar, setSidebar] = useState(screenWidth <= config.hideSidebar);

  const handleSidebar = () => {
    if (screenWidth <= config.hideSidebar) {
      root.style.setProperty("--sidebar", 0);
      root.style.setProperty("--menu-indicator-width", "calc(100% - 40px)");

      if (!sidebar) {
        document.querySelector("body").classList.add("sidebar-open");
      } else {
        document.querySelector("body").classList.remove("sidebar-open");
      }
    } else {
      document.querySelector("body").classList.remove("sidebar-open");
      root.style.setProperty("--menu-indicator-width", "42px");
      root.style.setProperty(
        "--sidebar",
        sidebar && root.style.getPropertyValue("--sidebar") === "270px"
          ? "60px"
          : "270px"
      );
    }

    setSidebar(!sidebar);
  };
  const handleResize = () => {
    screenWidth = window.innerWidth;

    document.querySelector("body").classList.remove("sidebar-open");

    if (screenWidth <= config.hideSidebar) {
      setSidebar(false);

      root.style.setProperty("--sidebar", 0);
      root.style.setProperty("--menu-indicator-width", "calc(100% - 40px)");
    } else {
      setSidebar(true);

      document.querySelector("body").classList.remove("sidebar-open");
      root.style.setProperty(
        "--sidebar",
        !sidebar && !root.style.getPropertyValue("--sidebar") === "270px"
          ? "60px"
          : "270px"
      );
      root.style.setProperty(
        "--menu-indicator-width",
        root.style.getPropertyValue("--sidebar") === "270px"
          ? "calc(100% - 40px)"
          : "42px"
      );
    }
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
    <Suspense fallback={<Loader />}>
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
    </Suspense>
  );
};

export default Layout;
