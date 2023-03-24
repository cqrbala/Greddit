import axios from "axios";

const JoinSubgreddit_service = async (arg) => {
    try {
        const server_response = await axios.post('http://localhost:8000/api/users/SubGreddits/join', arg)
        if (server_response.status === 200) {
            return 200
        }
    }
    catch (error) {
        console.error('Axios request failed:', error)
        if (error.response) {
            return error.response.status
        }
    }

}

export default JoinSubgreddit_service