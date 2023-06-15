import {
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Stack } from "react-bootstrap";
import "./style.scss";
import { Link } from "react-router-dom";

const Header = ({ handleClick }) => {
  return (
    <header className="top-navbar">
      <Stack direction="horizontal" gap={3}>
        <button className="btn toggle-btn" onClick={handleClick}>
          <Bars3Icon />
        </button>
        <div className="ms-auto profile">
          <UserCircleIcon />
          {/* <img src='' alt="profile" /> */}
          <div className="profile-dropdown">
            <ul>
              <li>User Name</li>
              <li>
                <Link to="/">
                  <Stack direction="horizontal" className="auth" gap={2}>
                    <span>
                      <ArrowLeftOnRectangleIcon />
                    </span>
                    <span>Logout</span>
                  </Stack>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Stack>
    </header>
  );
};

export default Header;
