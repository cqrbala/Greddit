import axios from "axios";

const register_service = async (userdata) => {
    try {
        const server_response = await axios.post('http://localhost:8000/api/users/register', userdata)
        if (server_response.status === 201) {
            return 201;
        }
    }
    catch (error) {
        console.error('Axios request failed:', error)
        if (error.response) {
            return error.response.status
        }
    }
}

export default register_service;