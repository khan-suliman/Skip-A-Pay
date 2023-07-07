import axios from "util/axios";

// get loans
export const loans = async () => {
  try {
    const response = await axios.get("loans");
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
