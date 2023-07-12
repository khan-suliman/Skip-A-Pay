import axios from "util/axios";

// Login user
const handleSubmitForm = async (data) => {
    try {
        console.log('data in handlesubmitform application', data);
        const response = await axios.post("users", data);
        console.log('response in handlesubmitform application', response);
        return {
            status: response.status,
            data: response.data,
        };
    } catch (e) {
        console.log('error handlesubmitform application', e);
        return {
            status: e.response.status,
            message: e.response.data.error,
        };
    }
};

export default handleSubmitForm;
