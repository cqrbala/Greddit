import axios from "axios";

const removeSavedPosts_service = async (arg) => {
    try {
        const server_response = await axios.post('http://localhost:8000/api/users/savedposts/remove', arg)
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

export default removeSavedPosts_service