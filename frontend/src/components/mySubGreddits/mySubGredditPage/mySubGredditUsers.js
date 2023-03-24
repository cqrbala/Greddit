import React from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import getMySubGreddits_service from "../../Service/getMySubGredditService";
export default function MySubGredditUsers() {
    const navigate = useNavigate();
    const { name } = useParams()
    const [normal_users, setNormalUsers] = useState([])
    const [blocked_users, setBlockedUsers] = useState([])
    useEffect(() => {
        if (localStorage.getItem('variable') === 'false') {
            console.log("breach");
            navigate("/");
        }
        async function fetchUsers() {
            const arg = {
                username: (JSON.parse(localStorage.getItem('user'))).username,
                id: (JSON.parse(localStorage.getItem('user')))._id,
                token: (JSON.parse(localStorage.getItem('user'))).token,
            }
            console.log(arg)
            const documents = await getMySubGreddits_service(arg)


            if (documents === 400) {
                window.alert('Error occured in retrieving your subgreddits')
            }
            else {
                //console.log('recieved in userside')
                //console.log('documents:', documents)
                const subgredditdata = documents.filter(document => (document.name === name))

                setNormalUsers(subgredditdata[0].valid_users)
                setBlockedUsers(subgredditdata[0].blocked_users)

                // console.log('normal users:', Nor)
                // console.log('blocked users:', blocked_users)

                if (normal_users) {
                    normal_users.map((user, index) => {
                        console.log('iterating')
                        console.log('user: ', user)
                    })
                }
            }
        }
        fetchUsers()
    }, []);


    return (
        <body>
            <section className='heading'>
                <p>Users of - {name}</p>
            </section>
            <div>
                <ul>
                    {normal_users !== undefined ? (
                        normal_users.map((user, index) => (
                            <li className="userelements" key={index} style={{ color: 'green' }}>
                                {user}
                            </li>
                        ))
                    ) : <p></p>}
                </ul>
                <ul>
                    {blocked_users !== undefined ? (blocked_users.map((user, index) => (
                        <li className="userelements" key={index} style={{ color: 'red' }}>
                            {user}
                        </li>
                    ))) : <p></p>}
                </ul>
            </div>

        </body>
    )
}