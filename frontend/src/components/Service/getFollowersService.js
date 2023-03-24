import axios from "axios";

const getFollowers_service = async (arg) => {
    try {
        const server_response = await axios.post('http://localhost:8000/api/users/profile/followers', arg)
        if (server_response.status === 200) {
            return server_response.data
        }
    }
    catch (error) {
        console.error('Axios request failed:', error)
        if (error.response) {
            return 400
        }
    }

}

export default getFollowers_service