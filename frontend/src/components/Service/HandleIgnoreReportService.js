import axios from "axios";

const handleIgnoreReport_service = async (arg) => {
    try {
        console.log('called func')
        const server_response = await axios.post('http://localhost:8000/api/users/MySubGreddits/reports/ignore', arg)
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

export default handleIgnoreReport_service