import { underline } from "colors";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import getMySubGreddits_service from "../Service/getMySubGredditService";
import updateMySubGreddits_service from "../Service/updateMySubGredditService";


export default function MySubGreddits() {
    const navigate = useNavigate();
    const [selectedSubreddit, setSelectedSubreddit] = useState(null);
    const [mysubgreddits, setMysubgreddits] = useState([]);
    const [subgredditnames, setSubGredditNames] = useState([]);
    useEffect(() => {
        if (localStorage.getItem('variable') === 'false') {
            console.log("breach");
            navigate("/");
        }
        async function fetchMySubGreddits() {
            const arg = {
                username: (JSON.parse(localStorage.getItem('user'))).username,
                id: (JSON.parse(localStorage.getItem('user')))._id,
                token: (JSON.parse(localStorage.getItem('user'))).token
            }
            const documents = await getMySubGreddits_service(arg)
            console.log('recieved in frontend')
            console.log(documents)

            if (documents === 400) {
                window.alert('Error occured in retrieving your subgreddits')
            }
            else {
                setMysubgreddits(documents)
                console.log('assigned value to mysubgreddits')
                if (documents) {
                    setSubGredditNames(documents.map(obj => obj.name))
                }
            }
        }
        fetchMySubGreddits()
    }, []);
    useEffect(() => {
        if (mysubgreddits.length) {
            console.log('trying to update')
            console.log(subgredditnames)
            async function updateMySubGreddits() {
                const arg = {
                    username: (JSON.parse(localStorage.getItem('user'))).username,
                    id: (JSON.parse(localStorage.getItem('user')))._id,
                    token: (JSON.parse(localStorage.getItem('user'))).token,
                    subgredditnames,
                }

                const result = await updateMySubGreddits_service(arg)

                if (result === 400) {
                    window.alert('Something went wrong in updating your followers')
                }
                setMysubgreddits(mysubgreddits.filter(document => subgredditnames.includes(document.name)))

            }
            updateMySubGreddits()
        }
    }, [subgredditnames])

    return (
        <>
            <section className='heading'>
                <p>MySubGreddits</p>
            </section>
            <button className="btn" onClick={() => {
                navigate('/createSubGreddit')
            }}>Add SubGreddit</button>
            {mysubgreddits !== undefined ? <section className="p-3 ">
                {mysubgreddits.map((item, index) => (
                    <div className=" row mb-3 d-flex" key={index}>
                        <div className="col-md-9 d-flex">
                            {item.name}
                        </div>
                        <div className="col-md-3 d-flex">
                            <button
                                className=" btn-primary btn-sm"
                                onClick={() => {
                                    if (selectedSubreddit === item) {
                                        setSelectedSubreddit(null);
                                    } else {
                                        setSelectedSubreddit(item);
                                    }
                                }}
                            >
                                Click
                            </button>
                            <button
                                className=" btn-primary btn-sm"
                                onClick={() => {
                                    setSubGredditNames(subgredditnames.filter(name => name !== item.name))
                                }}
                            >
                                Delete
                            </button>
                            <button
                                className=" btn-primary btn-sm"
                                onClick={() => {
                                    localStorage.setItem('subgreddit', item.name)
                                    navigate(`/mySubGreddits/${item.name}`)
                                }}
                            >
                                Open
                            </button>
                        </div>
                        {selectedSubreddit === item && (
                            <div className="card p-3 mt-3 ">
                                <p>
                                    <strong>Description:</strong> {item.description}
                                </p>
                                <p>
                                    <strong>Number of people:</strong> {item.valid_users.length}
                                </p>
                                <p>
                                    <strong>Number of posts:</strong> {item.posts.length}
                                </p>
                                <p>
                                    <strong>Banned keywords:</strong>{" "}
                                    {item.banned_keywords.join(", ")}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </section> : <p></p>}



        </>
    )

}