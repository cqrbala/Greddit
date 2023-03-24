import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import getFollowers_service from "../../Service/getFollowersService";
import updateFollowers_service from "../../Service/updateFollowersService";


export default function Followers() {
    const navigate = useNavigate();
    const [Followers, setFollowers] = useState([]);
    const [follwer_to_remove, setFollowerToRemove] = useState('');
    const [remove_clicked, setRemoveClicked] = useState(false);
    const [rerender_activate, setRerender] = useState(false)
    useEffect(() => {
        if (localStorage.getItem('variable') === 'false') {
            console.log("breach");
            navigate("/");
        }
        async function fetchFollowers() {
            const arg = {
                username: (JSON.parse(localStorage.getItem('user'))).username,
                id: (JSON.parse(localStorage.getItem('user')))._id,
                token: (JSON.parse(localStorage.getItem('user'))).token
            }
            const followers = await getFollowers_service(arg)

            if (followers === 400) {
                window.alert('Error occured in retrieving followers list')
            }
            else {
                setFollowers(followers)
                console.log(followers)
            }
        }
        fetchFollowers()
    }, []);

    useEffect(() => {
        console.log("rerendered")
    }, [rerender_activate])

    async function getFollowers() {
        const arg = {
            username: (JSON.parse(localStorage.getItem('user'))).username,
            id: (JSON.parse(localStorage.getItem('user')))._id,
            token: (JSON.parse(localStorage.getItem('user'))).token
        }
        const followers = await getFollowers_service(arg)

        if (followers === 400) {
            window.alert('Error occured in retrieving followers list')
        }
        else {
            setFollowers(followers)
            console.log(followers)
        }
    }

    useEffect(() => {
        async function updateFollowers() {
            const arg = {
                username: (JSON.parse(localStorage.getItem('user'))).username,
                id: (JSON.parse(localStorage.getItem('user')))._id,
                token: (JSON.parse(localStorage.getItem('user'))).token,
                target_user: follwer_to_remove,
            }

            const result = await updateFollowers_service(arg)

            if (result === 400) {
                window.alert('Something went wrong in updating your followers')
            }
            if (result === 200) {
                await getFollowers();
                setRerender(!rerender_activate)
            }

        }
        if (follwer_to_remove) {
            updateFollowers()
        }
    }, [remove_clicked])

    return (
        <>
            {Followers.length !== 0 ? (
                <>
                    <section className='heading'>
                        <p>Users that follow you</p>
                    </section>
                    {Followers.map((item, index) => (
                        <p key={index}>
                            {item}
                            <button
                                onClick={() => {
                                    console.log('remove button clicked')
                                    setFollowerToRemove(item)
                                    setRemoveClicked(!remove_clicked)
                                }}
                            >
                                Remove
                            </button>
                        </p>
                    ))}
                </>
            ) : (
                <section className='heading'>
                    <p>You don't have any followers</p>
                </section>
            )}
        </>
    );
}
