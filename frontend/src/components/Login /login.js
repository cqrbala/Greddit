import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import login_service from "../Service/loginService";

export default function Login(props) {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('variable') === 'true') {
            navigate("/profile")
        }
        else {
            // console.log(localStorage.getItem('variable'));
        }
    });

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        const userdata = {
            username,
            password,
        }

        console.log(userdata)
        const result = await login_service(userdata)
        console.log('result:', result)
        if (result === 200) {
            localStorage.setItem('variable', true)
            console.log('successful login')
            navigate("/profile")
        }
        if (result === 400) {
            window.alert('Incorrect Login credentials')
        }
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            { }
            <form className="login-form" onSubmit={handleSubmit}>
                <label>username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="greddit_username" id="username" name="username" />
                <label htmlFor="password">password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" placeholder="secret" id="password" name="password" />
                {(username && password) && <button type="submit">Log In</button>}
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}