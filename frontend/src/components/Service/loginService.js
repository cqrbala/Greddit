import axios from "axios";

const login_service = async (userdata) => {
    try {
        console.log('enter')
        const server_response = await axios.post('http://localhost:8000/api/users/login', userdata)
        console.log(server_response.status)
        if (server_response.status === 200) {
            localStorage.setItem('user', JSON.stringify(server_response.data))
            return 200;
        }
    }
    catch (error) {
        console.error('Axios request failed:', error)
        if (error.response) {
            return error.response.status
        }
    }

}

export default login_service