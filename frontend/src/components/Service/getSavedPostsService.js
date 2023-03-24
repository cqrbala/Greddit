import axios from "axios";

const getSavedPosts_service = async (arg) => {
    try {
        const server_response = await axios.post('http://localhost:8000/api/users/savedposts', arg)
        if (server_response.status === 200) {
            console.log('retrieved saved posts from server')
            console.log(server_response.data)
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

export default getSavedPosts_service