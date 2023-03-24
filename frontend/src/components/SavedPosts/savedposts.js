import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import getSavedPosts_service from "../Service/getSavedPostsService";
import removeSavedPosts_service from "../Service/RemoveSavedPostsService";
import updatePostVotes_service from "../Service/updatePostVotesService";
import publishComment_service from "../Service/PublishCommentService";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
export default function SavedPosts() {
    const [savedposts, setSavedPosts] = useState([])
    const [unsave_clicked, setUnsaveClicked] = useState(false);
    const [postToUnsave, setPostToUnsave] = useState({});


    const [votetarget_post, setVoteTargetPost] = useState({})
    const [voting_mode, setVotingMode] = useState(0)
    const [votingeffect, setVotingEffect] = useState(false)

    const [rerender, setRerender] = useState(false)


    const [comment_input, setCommentInput] = useState('');
    const [commentstate, setCommentState] = useState(false);
    const [commenttarget_post, setCommentTargetPost] = useState({});





    useEffect(() => {
        async function FetchSavedPosts() {
            const arg = {
                username: (JSON.parse(localStorage.getItem('user'))).username,
                id: (JSON.parse(localStorage.getItem('user')))._id,
                token: (JSON.parse(localStorage.getItem('user'))).token,
            }
            const documents = await getSavedPosts_service(arg)
            console.log('recieved the posts in frontend')
            console.log(documents)

            if (documents === 400) {
                window.alert('Error occured in retrieving your saved posts')
            }
            else {
                setSavedPosts(documents)
            }
        }
        FetchSavedPosts()
    }, [])

    async function getSavedPosts() {
        const arg = {
            username: (JSON.parse(localStorage.getItem('user'))).username,
            id: (JSON.parse(localStorage.getItem('user')))._id,
            token: (JSON.parse(localStorage.getItem('user'))).token,
        }
        const documents = await getSavedPosts_service(arg)
        console.log('recieved the posts in frontend')
        console.log(documents)

        if (documents === 400) {
            window.alert('Error occured in retrieving your saved posts')
        }
        else {
            setSavedPosts(documents)
        }
    }

    useEffect(() => {
        console.log('rerendered')
    }, [rerender])

    useEffect(() => {
        async function removesavedpost() {
            const arg = {
                username: (JSON.parse(localStorage.getItem('user'))).username,
                id: (JSON.parse(localStorage.getItem('user')))._id,
                token: (JSON.parse(localStorage.getItem('user'))).token,
                postid: postToUnsave._id,
            }

            const result = await removeSavedPosts_service(arg)

            if (result === 400) {
                window.alert("An error occurred in the backend. So unable to remove saved post.")
            }

            if (result === 200) {
                await getSavedPosts();
                rerender_page();
            }
        }
        if ((Object.keys(postToUnsave).length !== 0)) {
            removesavedpost();
        }
    }, [unsave_clicked])

    useEffect(() => {
        console.log('use effect function')
        async function updateVotes() {
            const arg = {
                username: (JSON.parse(localStorage.getItem('user'))).username,
                id: (JSON.parse(localStorage.getItem('user')))._id,
                token: (JSON.parse(localStorage.getItem('user'))).token,
                postid: votetarget_post._id,
                voting_mode: voting_mode,
            }

            const result = await updatePostVotes_service(arg)

            if (result === 400) {
                window.alert("An error occurred in the backend. So unable to update votes.")
            }
            if (result === 200) {
                await getSavedPosts();
                rerender_page();
            }
        }
        console.log('target post details:', votetarget_post)
        if ((Object.keys(votetarget_post).length !== 0) && (voting_mode !== 0)) {
            // console.log('suii')
            updateVotes();
        }

    }, [votingeffect])

    useEffect(() => {
        async function comment() {
            const arg = {
                username: (JSON.parse(localStorage.getItem('user'))).username,
                id: (JSON.parse(localStorage.getItem('user')))._id,
                token: (JSON.parse(localStorage.getItem('user'))).token,
                postid: commenttarget_post._id,
                comment: comment_input,
            }

            console.log(arg)

            const result = await publishComment_service(arg)

            if (result === 400) {
                window.alert("An error occurred in the backend due to which adding comment failed.")
            }
            if (result === 200) {
                await getSavedPosts();
                rerender_page();
            }

        }
        if (comment_input) {
            comment();
        }
    }, [commentstate])

    function rerender_page() {
        console.log('rerender function call')
        if (rerender) {
            setRerender(false)
        }
        else {
            setRerender(true)
        }
    }

    function voting_effect() {
        console.log('voting effect function call')
        if (votingeffect) {
            setVotingEffect(false)
        }
        else {
            setVotingEffect(true)
        }
    }

    return (
        <>
            <section className='heading'>
                <p>Saved posts</p>
            </section>
            <div>
                {savedposts ? (
                    savedposts.map((item, index) => {
                        return (
                            <>
                                <section className='postheading'>
                                    <p>Posted By : {item.creator_name_for_feed}</p>
                                    <p>Subgreddit : {item.subgreddit}</p>
                                </section>
                                <section className='postform'>
                                    <div className='postform-group'>
                                        <textarea
                                            type='text'
                                            className='postform-control'
                                            id='name'
                                            name='name'
                                            value={item.content}
                                            placeholder='Subgreddit Name'
                                            rows={4}
                                        />
                                    </div>
                                </section>
                                <p className='postformicons'>
                                    <div className='vote-icon'>
                                        <span className='upvotes'>{item.liked_users.length}</span>
                                        <ThumbUpOffAltIcon
                                            onClick={() => {
                                                console.log('upvote');
                                                setVoteTargetPost(item);
                                                setVotingMode(1);
                                                voting_effect();
                                            }}
                                        />
                                    </div>
                                    <div className='vote-icon'>
                                        <ThumbDownOffAltIcon
                                            onClick={() => {
                                                console.log('downvote');
                                                setVoteTargetPost(item);
                                                setVotingMode(2);
                                                voting_effect();
                                            }}
                                        />
                                        <span className='downvotes'>{item.disliked_users.length}</span>
                                    </div>
                                    <div className='vote-icon'>
                                        <BookmarkRemoveIcon
                                            onClick={() => {
                                                console.log('trying to remove this');
                                                setPostToUnsave(item);
                                                setUnsaveClicked(!unsave_clicked);
                                            }}
                                        />
                                    </div>

                                </p>
                                <section className='form'>
                                    <form>
                                        <div className='form-group' style={{ display: 'flex', justifyContent: 'space-between', }}>
                                            <input
                                                type='text'
                                                className='form-control'
                                                id='name'
                                                name='name'
                                                onChange={(e) => { setCommentInput(e.target.value) }}
                                                placeholder='Enter Comment'
                                            />
                                            <button onClick={(e) => {
                                                e.preventDefault()
                                                console.log(comment_input)
                                                setCommentTargetPost(item)
                                                if (commentstate) {
                                                    console.log('case 1')
                                                    setCommentState(false)
                                                }
                                                else {
                                                    console.log('case 2')
                                                    setCommentState(true)
                                                }
                                            }}>Comment</button>
                                        </div>
                                        <div className="postform-group">
                                            {item.comments.length ?
                                                <>
                                                    <h3>Comments:</h3>
                                                    {item.comments.map((comment, index) => (
                                                        <div className="comment" key={index} style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <p>{comment.comment_content}</p>
                                                            <p>By: {comment.commentor}</p>
                                                        </div>
                                                    ))}
                                                </>
                                                : <p></p>
                                            }
                                        </div>


                                    </form>
                                </section>
                            </>
                        );
                    })
                ) : (
                    <p></p>
                )}
            </div>
        </>
    );

}