import axios from "util/axios";

// Login user
const submittedApplications = async () => {
    try {
        const response = await axios.get('users');
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
export default submittedApplications;
