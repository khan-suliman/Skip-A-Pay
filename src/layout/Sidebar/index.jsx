import React, { useEffect, useRef, useState } from "react";
import "./sidebar.scss";
import { Stack } from "react-bootstrap";
import Navigation from "./Navigation";
import Title from "./Title";
import { useLocation } from "react-router-dom";
import menuItems from "menu-items";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Sidebar = ({ isOpenSidebar, handleSidebar }) => {
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicateHeight, setIndicateHeight] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      const sidebarItem = sidebarRef.current.querySelector(".sidebar-item");
      indicatorRef.current.style.height = `${sidebarItem.clientHeight - 13}px`;
      setIndicateHeight(sidebarItem.clientHeight);
    }, 50);
  }, []);

  useEffect(() => {
    const currentUrl = window.location.pathname.replace(/\/+$/g, '');
    let menuIndex = menuItems.findIndex((item) => item.url === currentUrl);
    setActiveIndex(menuIndex ?? 0);
  }, [location]);

  return (
    <aside
      ref={sidebarRef}
      className={`sidebar ${isOpenSidebar ? "open" : ""}`}
    >
      <button className="btn toggle-btn" onClick={handleSidebar}>
        <XMarkIcon />
      </button>
      <div className="sidebar-header">
        <Title />
      </div>
      <div className="sidebar-menu">
        <div
          ref={indicatorRef}
          style={{
            transform: `translateY(${activeIndex * indicateHeight + 7}px)`,
          }}
          className="menu-indicator"
        ></div>
        <Stack>
          <Navigation />
        </Stack>
      </div>
    </aside>
  );
};

export default Sidebar;
