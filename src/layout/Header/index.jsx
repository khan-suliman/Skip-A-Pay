import {
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Stack } from "react-bootstrap";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Header = ({ handleClick }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(reset());
    dispatch(logout());
    navigate("/login");
  };

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
              <li>{user?.name}</li>
              <li>
                <Stack
                  direction="horizontal"
                  className="auth"
                  gap={2}
                  onClick={handleLogout}
                >
                  <span>
                    <ArrowLeftOnRectangleIcon />
                  </span>
                  <span>Logout</span>
                </Stack>
              </li>
            </ul>
          </div>
        </div>
      </Stack>
    </header>
  );
};

export default Header;
