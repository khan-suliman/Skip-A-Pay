import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "util/axios";

const AuthGuard = ({ children }) => {
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!(user && token)) {
      delete axios.defaults.headers.common.Authorization;
      navigate("/login", { replace: true });
    } else {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }, [user, token, navigate]);
  return children;
};

export default AuthGuard;
