import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import getSubGredditPosts_service from "../../Service/getSubGredditPostsService";
import handleBlockReport_service from "../../Service/HandleBlockReportService";
import handleIgnoreReport_service from "../../Service/HandleIgnoreReportService";
import handleDeletePost_service from "../../Service/HandleDeletePostService";

export default function MySubGredditReports() {
    const [posts, setSubPosts] = useState([])
    const { name } = useParams()
    // const [timer, setTimer] = useState(null);
    // const [isBlocked, setIsBlocked] = useState(false);
    // const [isCancelled, setIsCancelled] = useState(false);
    // const [isBlockedPermanently, setIsBlockedPermanently] = useState(false);
    const [isIgnored, setIsIgnored] = useState(false);
    const [activeCancels, setActiveCancels] = useState([]);
    const [timers, setTimers] = useState([]);
    const [report_ids, setReportIDS] = useState([]);
    const [block_user_action, setBlockUserAction] = useState(false);
    const [report_id_for_blocking, setReportIDForBlocking] = useState('');
    const [post_id_for_reportblocking, setPostIDForReportBlocking] = useState('');
    const [ignore_user_action, setIgnoreUserAction] = useState(false);
    const [report_id_for_ignoring, setReportIDForIgnoring] = useState('');
    const [post_id_for_reportignoring, setPostIDForReportIgnoring] = useState('');
    const [delete_user_action, setDeleteUserAction] = useState(false);
    const [post_id_for_reportdeleting, setPostIDForDeleting] = useState('');
    const [rerender, setRerender] = useState(false)

    useEffect(() => {
        async function fetchSubGredditPosts() {
            const arg = {
                username: (JSON.parse(localStorage.getItem('user'))).username,
                id: (JSON.parse(localStorage.getItem('user')))._id,
                token: (JSON.parse(localStorage.getItem('user'))).token,
                subgreddit: name,
            }
            const documents = await getSubGredditPosts_service(arg)
            console.log('recieved the posts in frontend')
            console.log(documents)

            const posts_with_reports = documents.filter(obj => obj.reports.length !== 0)

            if (documents === 400) {
                window.alert('Error occured in retrieving your posts')
            }
            else {
                setSubPosts(posts_with_reports)
            }
        }
        fetchSubGredditPosts()
    }, [])

    async function getSubGredditPosts() {
        const arg = {
            username: (JSON.parse(localStorage.getItem('user'))).username,
            id: (JSON.parse(localStorage.getItem('user')))._id,
            token: (JSON.parse(localStorage.getItem('user'))).token,
            subgreddit: name,
        }
        const documents = await getSubGredditPosts_service(arg)
        console.log('recieved the posts in frontend')
        console.log(documents)

        const posts_with_reports = documents.filter(obj => obj.reports.length !== 0)

        if (documents === 400) {
            window.alert('Error occured in retrieving your posts')
        }
        else {
            setSubPosts(posts_with_reports)
        }
    }

    useEffect(() => {
        console.log(report_ids)
    }, [rerender])

    useEffect(() => {
        async function block_report() {
            console.log(report_id_for_blocking)
            console.log(post_id_for_reportblocking)
            const arg = {
                username: (JSON.parse(localStorage.getItem('user'))).username,
                id: (JSON.parse(localStorage.getItem('user')))._id,
                token: (JSON.parse(localStorage.getItem('user'))).token,
                postid: post_id_for_reportblocking,
                reportid: report_id_for_blocking,
            }

            const result = await handleBlockReport_service(arg)

            if (result === 400) {
                window.alert('Error occured in blocking the report')
            }
            else {
                await getSubGredditPosts();
                setRerender(!rerender);
            }
        }
        if (report_id_for_blocking && post_id_for_reportblocking) {
            block_report();
        }
    }, [block_user_action])

    useEffect(() => {
        async function ignore_report() {
            console.log(report_id_for_ignoring)
            console.log(post_id_for_reportignoring)
            const arg = {
                username: (JSON.parse(localStorage.getItem('user'))).username,
                id: (JSON.parse(localStorage.getItem('user')))._id,
                token: (JSON.parse(localStorage.getItem('user'))).token,
                postid: post_id_for_reportignoring,
                reportid: report_id_for_ignoring,
            }

            const result = await handleIgnoreReport_service(arg)

            if (result === 400) {
                window.alert('Error occured in blocking the report')
            }
            else {
                await getSubGredditPosts();
                setRerender(!rerender);
            }
        }
        if (report_id_for_ignoring && post_id_for_reportignoring) {
            ignore_report();
        }
    }, [ignore_user_action])

    useEffect(() => {
        async function delete_post() {
            console.log(post_id_for_reportdeleting)
            const arg = {
                username: (JSON.parse(localStorage.getItem('user'))).username,
                id: (JSON.parse(localStorage.getItem('user')))._id,
                token: (JSON.parse(localStorage.getItem('user'))).token,
                postid: post_id_for_reportdeleting,
            }

            const result = await handleDeletePost_service(arg)

            if (result === 400) {
                window.alert('Error occured in deleting the post')
            }
            else {
                await getSubGredditPosts();
                setRerender(!rerender);
            }
        }
        if (post_id_for_reportdeleting) {
            delete_post();
        }
    }, [delete_user_action])

    const handleBlock = (reportid, postid) => {
        console.log("setting active cancel")
        setActiveCancels((prevActiveCancels) => [...prevActiveCancels, reportid]);
        setTimers((prevTimers) => ({ ...prevTimers, [reportid]: 5 }));
        setReportIDS((prevreportids) => ({ ...prevreportids, [reportid]: postid }))
        setRerender(!rerender);
    };

    const handleCancel = (reportid, post_id) => {
        setActiveCancels((prevActiveCancels) => prevActiveCancels.filter((activeCancel) => activeCancel !== reportid));
        setTimers((prevTimers) => ({ ...prevTimers, [reportid]: 0 }));
        const updatedReportIDs = { ...report_ids };
        delete updatedReportIDs[reportid];
        setReportIDS(updatedReportIDs);
        setRerender(!rerender);
    };

    useEffect(() => {
        const intervalIds = [];
        activeCancels.forEach((reportid) => {
            if (timers[reportid] > 0) {
                const intervalId = setInterval(() => {
                    setTimers((prevTimers) => ({ ...prevTimers, [reportid]: prevTimers[reportid] - 1 }));
                }, 1000);
                intervalIds.push(intervalId);
            } else {
                setActiveCancels((prevActiveCancels) => prevActiveCancels.filter((activeCancel) => activeCancel !== reportid));
                // perform action when timer reaches 0
                console.log('beeeeep')
                const updatedReportIDs = { ...report_ids };
                delete updatedReportIDs[reportid];
                setReportIDS(updatedReportIDs);
                setReportIDForBlocking(reportid);
                setPostIDForReportBlocking(report_ids[reportid]);
                setBlockUserAction(!block_user_action);
                console.log(activeCancels, timers)
            }
        });
        return () => intervalIds.forEach((intervalId) => clearInterval(intervalId));
    }, [activeCancels, timers]);

    return (
        <>
            <section className='heading'>
                <p>Reports</p>
            </section>
            {posts ? (
                <>
                    {posts.map((item, index) => (
                        <>
                            {item.reports.map((report, reportIndex) => {
                                const isCancelActive = activeCancels.includes(report._id);
                                return (
                                    <section className='postform' style={{ paddingBottom: '60px' }}>
                                        <div className='postform-group'>
                                            <textarea type='text'
                                                className='postform-control'
                                                id='name'
                                                name='name'
                                                value={item.content}
                                                placeholder='Subgreddit Name'
                                                rows={4}>
                                            </textarea>
                                        </div>
                                        <p><b>Posted by:</b> {item.creator}</p>
                                        <p><b>Reported by:</b> {report.reported_by}</p>
                                        <p><b>Concern:</b> {report.concern}</p>
                                        {
                                            report.ignored_status ? (
                                                <p>
                                                    <button style={{ color: "black" }}>Block</button>
                                                    <button style={{ color: "black" }}>Delete</button>
                                                    <button style={{ color: "black" }}>Ignored</button>
                                                </p>
                                            ) : (
                                                isCancelActive ? (
                                                    <>
                                                        <button onClick={() => handleCancel(report._id, item._id)}>{`Cancel in ${timers[report._id]} secs`}</button>
                                                        <button onClick={() => {
                                                            setActiveCancels((prevActiveCancels) => prevActiveCancels.filter((activeCancel) => activeCancel !== report._id));
                                                            // perform action when timer reaches 0
                                                            console.log('beeeeep')
                                                            setReportIDForIgnoring(report._id)
                                                            setPostIDForReportIgnoring(item._id)
                                                            const updatedReportIDs = { ...report_ids };
                                                            delete updatedReportIDs[report._id];
                                                            setReportIDS(updatedReportIDs);
                                                            setIgnoreUserAction(!ignore_user_action)
                                                        }}>Ignore</button>
                                                        <button onClick={() => {
                                                            setActiveCancels((prevActiveCancels) => prevActiveCancels.filter((activeCancel) => activeCancel !== report._id));
                                                            // perform action when timer reaches 0
                                                            console.log('beeeeep')
                                                            setPostIDForDeleting(item._id);
                                                            const updatedReportIDs = { ...report_ids };
                                                            delete updatedReportIDs[report._id];
                                                            setReportIDS(updatedReportIDs);
                                                            setDeleteUserAction(!delete_user_action)
                                                        }} >Delete</button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button onClick={() => handleBlock(report._id, item._id)}>Block</button>
                                                        <button onClick={() => {
                                                            console.log('ignored');
                                                            setReportIDForIgnoring(report._id)
                                                            setPostIDForReportIgnoring(item._id)
                                                            setIgnoreUserAction(!ignore_user_action)
                                                        }}>Ignore</button>
                                                        <button onClick={() => {
                                                            console.log('deleted');
                                                            setPostIDForDeleting(item._id);
                                                            setDeleteUserAction(!delete_user_action)
                                                        }}>Delete</button>
                                                    </>
                                                )
                                            )
                                        }


                                    </section>
                                );
                            })}

                        </>
                    ))}
                </>
            ) : (
                <p></p>
            )
            }
        </>
    );



}