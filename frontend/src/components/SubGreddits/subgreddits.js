import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import getAllSubGreddits_service from "../Service/getAllSubGredditsService";
import LeaveSubGreddit_service from "../Service/LeaveSubGredditService";
import JoinSubgreddit_service from "../Service/JoinSubGredditService";

export default function SubGredditspage() {
    const navigate = useNavigate();
    const loggedin_username = (JSON.parse(localStorage.getItem('user'))).username
    const [searchinput, setSearchInput] = useState('');
    const [taginput, setTagInput] = useState('');
    const [parsedtaginput, setParsedTagInput] = useState([]);
    const [subgreddits, setSubGreddits] = useState([]);
    const [selectedSubreddit, setSelectedSubreddit] = useState(null);
    const [joinedsubgreddits, setJoinedSubGreddits] = useState([]);
    const [notjoinedsubgreddits, setNotJoinedSubGreddits] = useState([]);
    const [copyjoinedsubgreddits, setCopyJoinedSubGreddits] = useState([]);
    const [copynotjoinedsubgreddits, setCopyNotJoinedSubGreddits] = useState([]);
    const [sortoption, setSortOption] = useState(0);
    const [subwishtojoin, setSubWishToJoin] = useState('');
    const [initialrender, setInitialRender] = useState(true);


    useEffect(() => {
        if (localStorage.getItem('variable') === 'false') {
            console.log("breach");
            navigate("/");
        }
        async function fetchSubGreddits() {
            const arg = {
                username: (JSON.parse(localStorage.getItem('user'))).username,
                id: (JSON.parse(localStorage.getItem('user')))._id,
                token: (JSON.parse(localStorage.getItem('user'))).token
            }
            const documents = await getAllSubGreddits_service(arg)
            console.log('recieved all subgreddit data in frontend')
            console.log(documents)

            if (documents === 400) {
                window.alert('Error occured in retrieving your subgreddits')
            }
            else {
                setSubGreddits(documents)
                setJoinedSubGreddits(documents.filter(obj => obj.valid_users.includes(loggedin_username)))
                setNotJoinedSubGreddits(documents.filter(obj => !obj.valid_users.includes(loggedin_username)))
                setCopyJoinedSubGreddits(documents.filter(obj => obj.valid_users.includes(loggedin_username)))
                setCopyNotJoinedSubGreddits(documents.filter(obj => !obj.valid_users.includes(loggedin_username)))
                setInitialRender(false)
            }
        }
        fetchSubGreddits()
    }, []);

    useEffect(() => {
        console.log('entered here')
        setCopyJoinedSubGreddits(joinedsubgreddits.filter(subgreddit => { return (subgreddit.name).toLowerCase().includes(searchinput.toLowerCase()) }))
        setCopyNotJoinedSubGreddits(notjoinedsubgreddits.filter(subgreddit => { return (subgreddit.name).toLowerCase().includes(searchinput.toLowerCase()) }))
    }, [searchinput])

    useEffect(() => {
        if (parsedtaginput.length) {
            setCopyJoinedSubGreddits(copyjoinedsubgreddits.filter(obj => obj.tags.some(tag => parsedtaginput.includes(tag))))
            setCopyNotJoinedSubGreddits(copynotjoinedsubgreddits.filter(obj => obj.tags.some(tag => parsedtaginput.includes(tag))))
        }
    }, [parsedtaginput])

    useEffect(() => {
        console.log("safe")
    }, [sortoption]);

    useEffect(() => {
        async function leavesub() {
            console.log('updated version:', joinedsubgreddits)
            const arg = {
                username: (JSON.parse(localStorage.getItem('user'))).username,
                id: (JSON.parse(localStorage.getItem('user')))._id,
                token: (JSON.parse(localStorage.getItem('user'))).token,
                joinedsubgreddits,
            }

            const result = await LeaveSubGreddit_service(arg)

            if (result === 400) {
                window.alert('Error occured in leaving the subgreddit')
            }
        }
        if (!initialrender) {
            console.log('calling leave sub')
            leavesub();
        }
    }, [joinedsubgreddits]);

    useEffect(() => {
        async function tryjoining() {
            const arg = {
                username: (JSON.parse(localStorage.getItem('user'))).username,
                id: (JSON.parse(localStorage.getItem('user')))._id,
                token: (JSON.parse(localStorage.getItem('user'))).token,
                subwishtojoin,
            }

            const result = await JoinSubgreddit_service(arg)

            if (result === 403) {
                window.alert("Due to your leaving from the SubGreddit, you're banned from ever joining it")
            }
            if (result === 400) {
                window.alert("Error occurred in the backend.")
            }
            if (result === 200) {
                const updatedCopyNotJoinedSubGreddits = copynotjoinedsubgreddits.map(sub => {
                    if (sub.name === subwishtojoin) {
                        return {
                            ...sub,
                            requested_users: [...sub.requested_users, loggedin_username],
                        };
                    }
                    return sub;
                });
                setCopyNotJoinedSubGreddits(updatedCopyNotJoinedSubGreddits);
                setSortOption(200)
            }
        }
        if (!initialrender) {
            tryjoining()
        }
    }, [subwishtojoin])




    return (
        <>
            <section className='form'>
                <div className='form-group'>
                    <input
                        type='text'
                        className='form-control'
                        id='searchinput'
                        name='searchinput'
                        value={searchinput}
                        placeholder='Search'
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        className='form-control'
                        id='tags'
                        name='tags'
                        value={taginput}
                        placeholder='Enter comma separated tags and press Tag Search'
                        onChange={(e) => setTagInput(e.target.value)}
                    />
                    <button className="sortbtn" onClick={() => {
                        let input_tags = taginput.split(",").map(str => str.trim());
                        input_tags = input_tags.filter(tag => tag !== "");
                        setParsedTagInput(input_tags);
                    }}>Tag Search</button>
                    <button className="sortbtn" onClick={() => {
                        setTagInput('');
                        setParsedTagInput([]);
                        setCopyJoinedSubGreddits(joinedsubgreddits.filter(subgreddit => { return (subgreddit.name).toLowerCase().includes(searchinput.toLowerCase()) }))
                        setCopyNotJoinedSubGreddits(notjoinedsubgreddits.filter(subgreddit => { return (subgreddit.name).toLowerCase().includes(searchinput.toLowerCase()) }))
                    }}>Remove Tag Search</button>
                </div>
            </section>
            <section>
                <div className="srtbtn-container">
                    <p style={{ fontSize: '20px' }}>Sort:</p>
                    <button className="sortbtn" onClick={() => {
                        setCopyJoinedSubGreddits(
                            copyjoinedsubgreddits.sort((a, b) => {
                                if (a.name < b.name) {
                                    return -1;
                                }
                                if (a.name > b.name) {
                                    return 1;
                                }
                                return 0;
                            })
                        );


                        setCopyNotJoinedSubGreddits(
                            copynotjoinedsubgreddits.sort((a, b) => {
                                if (a.name < b.name) {
                                    return -1;
                                }
                                if (a.name > b.name) {
                                    return 1;
                                }
                                return 0;
                            })
                        );

                        setSortOption(1)
                    }}>Name Ascending</button>
                    <button className="sortbtn" onClick={() => {
                        setCopyJoinedSubGreddits(
                            copyjoinedsubgreddits.sort((a, b) => {
                                if (a.name > b.name) {
                                    return -1;
                                }
                                if (a.name < b.name) {
                                    return 1;
                                }
                                return 0;
                            })
                        );


                        setCopyNotJoinedSubGreddits(
                            copynotjoinedsubgreddits.sort((a, b) => {
                                if (a.name > b.name) {
                                    return -1;
                                }
                                if (a.name < b.name) {
                                    return 1;
                                }
                                return 0;
                            })
                        );

                        setSortOption(2)
                    }}>Name Descending</button>
                    <button className="sortbtn" onClick={() => {
                        setCopyJoinedSubGreddits(copyjoinedsubgreddits.sort((a, b) => {
                            return b.valid_users.length - a.valid_users.length;
                        }));
                        setCopyNotJoinedSubGreddits(copynotjoinedsubgreddits.sort((a, b) => {
                            return b.valid_users.length - a.valid_users.length;
                        }));

                        setSortOption(3)
                    }}>Followers</button>
                    <button className="sortbtn" onClick={() => {
                        setCopyJoinedSubGreddits(copyjoinedsubgreddits.sort((a, b) => {
                            return new Date(b.createdAt) - new Date(a.createdAt);
                        }));
                        setCopyNotJoinedSubGreddits(copynotjoinedsubgreddits.sort((a, b) => {
                            return new Date(b.createdAt) - new Date(a.createdAt);
                        }));

                        setSortOption(4);
                    }}>Creation Date</button>
                </div>
            </section>
            {
                copyjoinedsubgreddits !== undefined ? <section className="p-3 ">
                    <section className='heading'>
                        <p>Joined SubGreddits</p>
                    </section>
                    {copyjoinedsubgreddits.map((item, index) => (
                        <div className=" row mb-3 d-flex userelements" key={index}>
                            <div className="col-md-9 d-flex">
                                {item.name}
                            </div>
                            <div className="col-md-3 d-flex">
                                <button
                                    className=" btn-primary btn-sm "
                                    onClick={() => {
                                        if (selectedSubreddit === item) {
                                            setSelectedSubreddit(null);
                                        } else {
                                            setSelectedSubreddit(item);
                                        }
                                    }}
                                >
                                    Info
                                </button>
                                {item.moderator !== loggedin_username ? <button
                                    className=" btn-primary btn-sm "
                                    onClick={() => {
                                        setJoinedSubGreddits(joinedsubgreddits.filter(obj => obj !== item))
                                        setCopyJoinedSubGreddits(joinedsubgreddits.filter(obj => obj !== item))
                                        setCopyNotJoinedSubGreddits([...copynotjoinedsubgreddits, item]);
                                    }}
                                >
                                    Leave
                                </button> : <p></p>}
                                <button
                                    className=" btn-primary btn-sm "
                                    onClick={() => {
                                        navigate(`/SubGreddits/${item.name}`)
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
                </section> : <p></p>
            }


            {
                copynotjoinedsubgreddits !== undefined ? <section className="p-3 ">
                    <section className='heading'>
                        <p>SubGreddits Not Joined</p>
                    </section>
                    {copynotjoinedsubgreddits.map((item, index) => (
                        <div className=" row mb-3 d-flex userelements" key={index}>
                            <div className="col-md-9 d-flex">
                                {item.name}
                            </div>
                            <div className="col-md-3 d-flex">
                                <button
                                    className=" btn-primary btn-sm "
                                    onClick={() => {
                                        if (selectedSubreddit === item) {
                                            setSelectedSubreddit(null);
                                        } else {
                                            setSelectedSubreddit(item);
                                        }
                                    }}
                                >
                                    Info
                                </button>
                                {item.requested_users.includes(loggedin_username) ? <p>Requested</p> : <button
                                    className=" btn-primary btn-sm "
                                    onClick={() => {
                                        setSubWishToJoin(item.name)
                                    }}
                                >
                                    Join
                                </button>}

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
                </section> : <p></p>
            }
        </>

    )
}