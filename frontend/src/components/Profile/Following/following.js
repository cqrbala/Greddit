import React from "react";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import getFollowing_service from "../../Service/getFollowingService";
import updateFollowing_service from "../../Service/updateFollowingService";


export default function Following() {
    const navigate = useNavigate();
    const [Following, setFollowing] = useState([]);
    const [follwing_to_remove, setFollowingToRemove] = useState('');
    const [remove_clicked, setRemoveClicked] = useState(false);
    const [rerender_activate, setRerender] = useState(false)
    useEffect(() => {
        if (localStorage.getItem('variable') === 'false') {
            console.log("breach");
            navigate("/");
        }
        async function fetchFollowing() {
            const arg = {
                username: (JSON.parse(localStorage.getItem('user'))).username,
                id: (JSON.parse(localStorage.getItem('user')))._id,
                token: (JSON.parse(localStorage.getItem('user'))).token
            }
            const following = await getFollowing_service(arg)

            if (following === 400) {
                window.alert('Error occured in retrieving following list')
            }
            else {
                setFollowing(following)
                console.log(following)
            }
        }
        fetchFollowing()
    }, []);

    useEffect(() => {
        console.log("rerendered")
    }, [rerender_activate])

    async function getFollowing() {
        const arg = {
            username: (JSON.parse(localStorage.getItem('user'))).username,
            id: (JSON.parse(localStorage.getItem('user')))._id,
            token: (JSON.parse(localStorage.getItem('user'))).token
        }
        const following = await getFollowing_service(arg)

        if (following === 400) {
            window.alert('Error occured in retrieving following list')
        }
        else {
            setFollowing(following)
            console.log(following)
        }
    }

    useEffect(() => {
        async function updateFollowing() {
            const arg = {
                username: (JSON.parse(localStorage.getItem('user'))).username,
                id: (JSON.parse(localStorage.getItem('user')))._id,
                token: (JSON.parse(localStorage.getItem('user'))).token,
                target_user: follwing_to_remove,
            }

            const result = await updateFollowing_service(arg)

            if (result === 400) {
                window.alert('Something went wrong in updating your following list')
            }
            if (result === 200) {
                await getFollowing();
                setRerender(!rerender_activate)
            }
        }
        if (follwing_to_remove) {
            updateFollowing()
        }
    }, [remove_clicked])

    return (
        <>
            {Following.length !== 0 ? (
                <>
                    <section className='heading'>
                        <p>Users you follow</p>
                    </section>
                    {Following.map((item, index) => (
                        <p key={index}>
                            {item}
                            <button
                                onClick={() => {
                                    console.log('remove button clicked')
                                    setFollowingToRemove(item)
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
                    <p>You don't follow any user</p>
                </section>
            )}
        </>
    );


}