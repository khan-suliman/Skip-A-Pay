import axios from "util/axios";

// Login user
const formSubmission = async (data) => {
    try {
        const response = await axios.post('users/loan', data);
        return {
            status: response.status,
            data: response.data
        };
    } catch (e) {
        return {
            status: e.response.status,
            message: e.response.data.error
        };
    }
};
export default formSubmission;
