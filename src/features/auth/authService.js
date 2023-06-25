import axios from "util/axios";

// Login user
const login = async (data) => {
  const response = await axios.post(`admins/login`, data);
  return response.data;
};
const logout = async (token) => {};

const authService = {
  login,
  logout,
};

export default authService;
