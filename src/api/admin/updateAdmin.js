import axios from "util/axios";

// Login user
const updateAdmin = async (data) => {
    try {
        const response = await axios.patch(`/admins/me/`, { ...data });
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

export default updateAdmin;
