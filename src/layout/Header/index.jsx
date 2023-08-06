import {
  ArrowLeftOnRectangleIcon,
  ArrowPathIcon,
  Bars3Icon,
  LockClosedIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Stack } from "react-bootstrap";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "components/ChangePasswordModal";
import UpdateUserModal from "components/UpdateUserModal";

const Header = ({ handleClick }) => {
  // handle change passowrd modal
  const [showChangePassword, setShowChangePassword] = useState(false);
  const handleShowChangePasswordModal = () => setShowChangePassword(true);
  const handleCloseChangePasswordModal = () => setShowChangePassword(false);

  // handle update user
  const [showUpdateUserModal, setshowUpdateUserModal] = useState(false);
  const handleShowUpdateUserModal = () => setshowUpdateUserModal(true);
  const handleCloseUpdateUserModal = () => setshowUpdateUserModal(false);

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
                  onClick={handleShowUpdateUserModal}
                >
                  <span>
                    <ArrowPathIcon />
                  </span>
                  <span>Update</span>
                </Stack>
              </li>
              <li>
                <Stack
                  direction="horizontal"
                  className="auth"
                  gap={2}
                  onClick={handleShowChangePasswordModal}
                >
                  <span>
                    <LockClosedIcon />
                  </span>
                  <span>Security</span>
                </Stack>
              </li>
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
      {/* update name and email */}
      <UpdateUserModal
        show={showUpdateUserModal}
        handleClose={handleCloseUpdateUserModal}
      />
      {/* change password modal */}
      <ChangePasswordModal
        show={showChangePassword}
        handleClose={handleCloseChangePasswordModal}
      />
    </header>
  );
};

export default Header;
