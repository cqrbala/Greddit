import axios from "axios";

const data_service = async (arg) => {
    try {
        const server_response = await axios.post('http://localhost:8000/api/users/profile', arg)
        console.log(server_response.data)
        if (server_response.status === 200) {
            return server_response.data
        }
        return 400
    }
    catch (error) {
        console.error('Axios request failed:', error)
        if (error.response) {
            return 400
        }
    }

}

export default data_service