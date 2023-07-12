import axios from "util/axios";

// download user
const formDownload = async (params = {}) => {
  try {
    const response = await axios.get("users/download", {
      params,
      responseType: "blob",
    });
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

export default formDownload;
