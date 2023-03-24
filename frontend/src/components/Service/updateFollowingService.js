import axios from "axios";

const updateFollowing_service = async (arg) => {
    try {
        const server_response = await axios.post('http://localhost:8000/api/users/profile/update/following', arg)
        if (server_response.status === 200) {
            return 200
        }
    }
    catch (error) {
        console.error('Axios request failed:', error)
        if (error.response) {
            return 400
        }
    }

}

export default updateFollowing_service