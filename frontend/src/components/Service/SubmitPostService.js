import axios from "axios";

const SubmitPost_service = async (arg) => {
    try {
        const server_response = await axios.post('http://localhost:8000/api/users/SubGreddits/postSubmit', arg)
        if (server_response.status === 200) {
            return 200;
        }
        if (server_response.status === 201) {
            return 201;
        }
    }
    catch (error) {
        console.error('Axios request failed:', error)
        if (error.response) {
            return 400
        }
    }

}

export default SubmitPost_service