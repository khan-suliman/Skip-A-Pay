import axios from "axios";

const API_URL = "http://localhost:3001/admins";

// Login user
const login = async (data) => {
  const response = await axios.post(`${API_URL}/login`, data);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const logout = async (data) => {
  localStorage.removeItem("user");
};

const authService = {
  login,
  logout,
};

export default authService;
