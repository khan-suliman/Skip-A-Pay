import axios from "util/axios";

// get loans
export const getLoans = async (params = {}) => {
  try {
    const response = await axios.get("loans", { params });
    return {
      status: response?.status,
      data: response?.data,
    };
  } catch (e) {
    return {
      status: e.response?.status,
      message: e.response?.data?.error,
    };
  }
};
