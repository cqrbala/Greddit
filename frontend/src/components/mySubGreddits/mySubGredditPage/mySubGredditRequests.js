import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import getMySubGreddits_service from "../../Service/getMySubGredditService";
import handleSubGredditRequests_service from "../../Service/SubGredditRequestsService";


export default function MySubGredditRequests() {
    const navigate = useNavigate();
    const { name } = useParams()
    const [requests, setRequests] = useState([])
    const [accept, setAccept] = useState([])
    const [reject, setReject] = useState([])
    const [initialrender, setInitialRender] = useState(true)

    useEffect(() => {
        if (localStorage.getItem('variable') === 'false') {
            console.log("breach");
            navigate("/");
        }
        async function fetchRequests() {
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
                console.log('recieved in userside')
                console.log('documents:', documents)
                const subgredditdata = documents.filter(document => (document.name === name))

                if (subgredditdata) {
                    setRequests(subgredditdata[0].requested_users)
                }
                setInitialRender(false)

                // console.log('normal users:', Nor)
                // console.log('blocked users:', blocked_users)

            }
        }
        fetchRequests()
    }, []);

    useEffect(() => {
        async function updateRequests() {
            console.log('trying to update requests: ', requests)
            const arg = {
                username: (JSON.parse(localStorage.getItem('user'))).username,
                id: (JSON.parse(localStorage.getItem('user')))._id,
                token: (JSON.parse(localStorage.getItem('user'))).token,
                requests,
                accept,
                reject,
                name,
            }

            const result = await handleSubGredditRequests_service(arg)

            if (result === 400) {
                window.alert('Something went wrong in updating your followers')
            }
            if (result === 200) {
                console.log("Requests satisfied")
            }

        }
        if (!initialrender) {
            updateRequests();
        }
    }, [requests])

    return (
        <body>
            <section className='heading'>
                <p>Pending Requests</p>
            </section>
            <div className="userelements">
                {requests !== undefined ? (requests.map((item, index) => (
                    <p key={index}>{item} <button onClick={() => {
                        setAccept([...accept, item]);
                        console.log(accept)
                        setRequests(requests.filter(user => user !== item))
                    }}
                    >Accept</button> <button onClick={() => {
                        setReject([...reject, item]);
                        console.log(reject);
                        setRequests(requests.filter(user => user !== item))
                    }}
                    >Reject</button></p>
                ))) : <p></p>}
            </div>

        </body>
    )
}