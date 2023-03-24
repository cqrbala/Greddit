import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate()
    useEffect(() => {
        localStorage.setItem('variable', false)
        localStorage.removeItem('user')
        navigate("/")

    }, []);
    return (
        <p>done</p>
    )
}
