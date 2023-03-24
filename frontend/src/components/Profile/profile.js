import React from "react";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useState } from "react";
import data_service from "../Service/dataService";
import updateUserdata_service from "../Service/updateUserdataService";

export default function Profile() {
    const navigate = useNavigate();
    const [Firstname, setFirstName] = useState('');
    const [Lastname, setLastName] = useState('');
    const [Username, setUserName] = useState('')
    const [Contact, setContact] = useState('');
    const [Email, setEmail] = useState('');
    const [Age, setAge] = useState(0);
    const [FollowerCount, setFollowerCount] = useState(0);
    const [FollowingCount, setFollowingCount] = useState(0);

    useEffect(() => {
        if (localStorage.getItem('variable') === 'false') {
            console.log("breach");
            navigate("/");
        }
        async function fetchData() {
            const arg = {
                username: (JSON.parse(localStorage.getItem('user'))).username,
                id: (JSON.parse(localStorage.getItem('user')))._id,
                token: (JSON.parse(localStorage.getItem('user'))).token
            }
            const userdata = await data_service(arg)
            if (userdata === 400) {
                window.alert('Error occurred in getting user data')
            }
            else {
                console.log('success getting user data')
                setFirstName(userdata.firstname)
                setLastName(userdata.lastname)
                setUserName(userdata.username)
                setContact(userdata.contact)
                setEmail(userdata.email)
                setAge(userdata.age)
                setFollowerCount((userdata.followers).length)
                setFollowingCount((userdata.following).length)
            }
        }

        fetchData()

    }, []);

    async function changedata() {
        const newuserdata = {
            Firstname,
            Lastname,
            Username,
            Contact,
            Email,
            Age,
            id: (JSON.parse(localStorage.getItem('user')))._id,
            token: (JSON.parse(localStorage.getItem('user'))).token
        }
        const result = await updateUserdata_service(newuserdata)

        if (result === 400) {
            window.alert('Something went wrong in updating your profile')
        }
    }

    const followersfunc = (e) => {
        navigate("/followers");
    }
    const followingfunc = (e) => {
        navigate("/following");
    }

    return (
        <body>
            <p>Welcome to the profile page !</p>
            <form className="register-form">
                <label htmlFor="Firstname">First name</label>
                <input value={Firstname} name="firstname" onChange={(e) => setFirstName(e.target.value)} id="firstname" placeholder="First Name" />
                <label htmlFor="Lastname">Last name</label>
                <input value={Lastname} name="lastname" onChange={(e) => setLastName(e.target.value)} id="lastname" placeholder="Last Name" />
                <label htmlFor="email">email</label>
                <input value={Email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="Username">Username</label>
                <input value={Username} type="username" placeholder="greddit_username" id="username" name="username" />
                <label htmlFor="Age">Age</label>
                <input value={Age} name="age" onChange={(e) => setAge(e.target.value)} id="age" placeholder="Your Age" />
                <label htmlFor="Contact">Contact</label>
                <input value={Contact} name="contact" onChange={(e) => setContact(e.target.value)} id="contact" placeholder="Your Contact" />
                <button onClick={changedata}>Save Changes</button>
                <button onClick={followersfunc}>Followers : {FollowerCount}</button>
                <button onClick={followingfunc}>Following : {FollowingCount}</button>
            </form>

        </body>
    )
}