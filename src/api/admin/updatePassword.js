import axios from "util/axios";

// Login user
const updatePassword = async (data) => {
    try {
        const response = await axios.post(`/admins/changepassword/`, { ...data });
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

export default updatePassword;
