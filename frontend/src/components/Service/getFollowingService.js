import axios from "axios";

const getFollowing_service = async (arg) => {
    try {
        const server_response = await axios.post('http://localhost:8000/api/users/profile/following', arg)
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

export default getFollowing_service