import axios from "axios";

const createSubGreddit_service = async (gredditdata) => {
    try {
        const server_response = await axios.post('http://localhost:8000/api/users/createSubGreddit', gredditdata)
        if (server_response.status === 201) {
            return 201;
        }
    }
    catch (error) {
        console.error('Axios request failed:', error)
        if (error.response) {
            console.log(error.response)
            return error.response.status
        }
    }
}

export default createSubGreddit_service;