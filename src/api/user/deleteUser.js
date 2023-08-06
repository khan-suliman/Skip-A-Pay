import axios from "util/axios";

// Login user
const handleDeleteUsers = async (id = "") => {
  try {
    const response = await axios.delete(`users/${id}`);
    return {
      status: response.status,
      data: response.data,
    };
  } catch (e) {
    return {
      status: e.response.status,
      message: e.response.data.error,
    };
  }
};

export default handleDeleteUsers;
