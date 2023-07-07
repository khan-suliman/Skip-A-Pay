// ProtectedRoute.js
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";
import axios from "util/axios";

const ProtectedRoute = ({ path, element }) => {
  const { user, token } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!(user && token)) {
      delete axios.defaults.headers.common.Authorization;
    } else {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }, [user, token]);
  return user && token ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
