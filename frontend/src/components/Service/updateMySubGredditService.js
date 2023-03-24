import axios from "axios";

const updateMySubGreddits_service = async (arg) => {
    try {
        console.log('trying to update')
        const server_response = await axios.post('http://localhost:8000/api/users/MySubGreddits/update', arg)
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

export default updateMySubGreddits_service