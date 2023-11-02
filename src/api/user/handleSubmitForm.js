import axios from "util/axios";

// apply user loan
const handleSubmitForm = {
  create: async (data) => {
    try {
      const response = await axios.post("users", data);
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
  },
  update: async (data) => {
    try {
      const response = await axios.patch("users", data);
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
  },
};

export default handleSubmitForm;
