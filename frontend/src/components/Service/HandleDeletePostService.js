import axios from "axios";

const handleDeletePost_service = async (arg) => {
    try {
        console.log('called func')
        const server_response = await axios.post('http://localhost:8000/api/users/MySubGreddits/reports/delete', arg)
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

export default handleDeletePost_service