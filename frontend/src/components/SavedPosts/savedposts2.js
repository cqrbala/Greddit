import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import SubmitPost_service from "../../Service/SubmitPostService";
import getSubGredditPosts_service from "../../Service/getSubGredditPostsService";
import publishComment_service from "../../Service/PublishCommentService";
import updatePostVotes_service from "../../Service/updatePostVotesService";
import SavePost_service from "../../Service/SavePostService";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import "./modal.css";



export default function SubGredditpage() {
    const loggedin_username = (JSON.parse(localStorage.getItem('user'))).username
    const { name } = useParams()
    const [bookmarkClicked, setBookmarkClicked] = useState(false);
    const [postToBookmark, setPostToBookmark] = useState({});
    const [comment_input, setCommentInput] = useState('');
    const [commentstate, setCommentState] = useState(false);
    const [commenttarget_post, setCommentTargetPost] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [post_text, setPostText] = useState('');
    const [post_submit, setPostSubmit] = useState(false);
    const [votes, setVotes] = useState([{
        post_id: '',
        voting_mode: 0
    }]);
    const [initialrender, setInitialRender] = useState(true)
    const [rerender, setRerender] = useState(false)
    const [posts, setPosts] = useState([])
    const [votetarget_post, setVoteTargetPost] = useState({})
    const [voting_mode, setVotingMode] = useState(0)
    const [votingeffect, setVotingEffect] = useState(false)

    // useEffect(() => {
    //     async function fetchSubGredditPosts() {
    //         const arg = {
    //             username: (JSON.parse(localStorage.getItem('user'))).username,
    //             id: (JSON.parse(localStorage.getItem('user')))._id,
    //             token: (JSON.parse(localStorage.getItem('user'))).token,
    //             subgreddit: name,
    //         }
    //         const documents = await getSubGredditPosts_service(arg)
    //         console.log('recieved the posts in frontend')
    //         console.log(documents)

    //         if (documents === 400) {
    //             window.alert('Error occured in retrieving your posts')
    //         }
    //         else {
    //             setPosts(documents)
    //             setInitialRender(false)
    //         }
    //     }
    //     fetchSubGredditPosts()
    // }, [])

    // async function getSubGredditPosts() {
    //     const arg = {
    //         username: (JSON.parse(localStorage.getItem('user'))).username,
    //         id: (JSON.parse(localStorage.getItem('user')))._id,
    //         token: (JSON.parse(localStorage.getItem('user'))).token,
    //         subgreddit: name,
    //     }
    //     const documents = await getSubGredditPosts_service(arg)
    //     console.log('got the updated docs')
    //     console.log(documents)

    //     if (documents === 400) {
    //         window.alert('Error occured in retrieving your posts')
    //     }
    //     else {
    //         setPosts(documents)
    //     }
    // }

    // useEffect(() => {
    //     console.log('rerendered')
    // }, [rerender])

    // useEffect(() => {
    //     async function addsavedpost() {
    //         const arg = {
    //             username: (JSON.parse(localStorage.getItem('user'))).username,
    //             id: (JSON.parse(localStorage.getItem('user')))._id,
    //             token: (JSON.parse(localStorage.getItem('user'))).token,
    //             postid: postToBookmark._id,
    //         }

    //         const result = await SavePost_service(arg);

    //         if (result === 400) {
    //             window.alert("An error occurred in the backend. So unable to save post.")
    //         }

    //         if (result === 200) {
    //             await getSubGredditPosts();
    //             rerender_page();
    //         }
    //     }
    //     if ((Object.keys(postToBookmark).length !== 0)) {
    //         addsavedpost();
    //     }
    // }, [bookmarkClicked])

    // useEffect(() => {
    //     console.log('use effect function')
    //     async function updateVotes() {
    //         const arg = {
    //             username: (JSON.parse(localStorage.getItem('user'))).username,
    //             id: (JSON.parse(localStorage.getItem('user')))._id,
    //             token: (JSON.parse(localStorage.getItem('user'))).token,
    //             postid: votetarget_post._id,
    //             voting_mode: voting_mode,
    //         }

    //         const result = await updatePostVotes_service(arg)

    //         if (result === 400) {
    //             window.alert("An error occurred in the backend. So unable to update votes.")
    //         }
    //         if (result === 200) {
    //             await getSubGredditPosts();
    //             rerender_page();
    //         }
    //     }
    //     console.log('target post details:', votetarget_post)
    //     if ((Object.keys(votetarget_post).length !== 0) && (voting_mode !== 0)) {
    //         // console.log('suii')
    //         updateVotes();
    //     }

    // }, [votingeffect])

    // useEffect(() => {
    //     async function comment() {
    //         const arg = {
    //             username: (JSON.parse(localStorage.getItem('user'))).username,
    //             id: (JSON.parse(localStorage.getItem('user')))._id,
    //             token: (JSON.parse(localStorage.getItem('user'))).token,
    //             postid: commenttarget_post._id,
    //             comment: comment_input,
    //         }

    //         console.log(arg)

    //         const result = await publishComment_service(arg)

    //         if (result === 400) {
    //             window.alert("An error occurred in the backend due to which adding comment failed.")
    //         }
    //         if (result === 200) {
    //             await getSubGredditPosts();
    //             rerender_page();
    //         }

    //     }
    //     if (comment_input) {
    //         comment();
    //     }
    // }, [commentstate])


    // function rerender_page() {
    //     console.log('rerender function call')
    //     if (rerender) {
    //         setRerender(false)
    //     }
    //     else {
    //         setRerender(true)
    //     }
    // }

    // function voting_effect() {
    //     console.log('voting effect function call')
    //     if (votingeffect) {
    //         setVotingEffect(false)
    //     }
    //     else {
    //         setVotingEffect(true)
    //     }
    // }


    // useEffect(() => {
    //     async function submitpost() {
    //         const arg = {
    //             username: (JSON.parse(localStorage.getItem('user'))).username,
    //             id: (JSON.parse(localStorage.getItem('user')))._id,
    //             token: (JSON.parse(localStorage.getItem('user'))).token,
    //             subgreddit: name,
    //             post_text,
    //         }

    //         const result = await SubmitPost_service(arg)

    //         if (result === 201) {
    //             window.alert("Your post contains words banned by the subreddit moderator.")
    //         }
    //         if (result === 400) {
    //             window.alert("Failed to create post. Try again later.")
    //         }
    //         if (result === 200 || result === 201) {
    //             await getSubGredditPosts()
    //             rerender_page();
    //         }
    //     }
    //     if (post_text) {
    //         submitpost();
    //     }
    // }, [post_submit])

    return (
        <div >
            <section className='heading'>
                <p>Main feed of - {name}</p>
            </section>
            <button className="btn" onClick={() => {
                setModalOpen(true)
            }}>Add post</button>


            {modalOpen && <div>
                <div className="modalContainer">
                    <div className="titleCloseBtn">
                        <button
                            onClick={() => {
                                setModalOpen(false);
                            }}
                        >
                            X
                        </button>
                    </div>
                    <div className="title" style={{ fontSize: '30px', color: 'red' }}>Heads up !</div>
                    <div className="title">
                        <p>Posts that contain words that are banned by the moderator will be replaced with asteriks when displayed.</p>

                    </div>
                    <textarea className="body" placeholder="Enter your text" onChange={(e) => { setPostText(e.target.value) }}>
                    </textarea>
                    <div className="footer">
                        <button className="btn"
                            onClick={() => {
                                setModalOpen(false);
                            }}
                            id="cancelBtn"
                        >
                            Cancel
                        </button>
                        <button className="btn" onClick={() => {
                            if (!post_text) {
                                window.alert("Enter some text to make a post.")
                            }
                            else {
                                console.log(post_text)
                                if (post_submit) {
                                    setPostSubmit(false);
                                    setModalOpen(false);
                                }
                                else {
                                    setModalOpen(false);
                                    setPostSubmit(true);
                                }
                            }
                        }}>Post</button>
                    </div>
                </div>
            </div>}
            {posts ? <> {
                posts.map((item, index) => {
                    return (
                        <>
                            <section className='postheading'>
                                <p>Posted By : {item.creator_name_for_feed}
                                    {item.creator_name_for_feed !== 'Blocked user' ? <button> Follow </button> : <p></p>}</p>

                            </section>
                            <section className='postform'>
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
                            </section>
                            <p className="postformicons">
                                <div className="vote-icon">
                                    <span className="upvotes">{item.liked_users.length}</span>
                                    <ThumbUpOffAltIcon
                                        onClick={() => {
                                            console.log("upvote");
                                            setVoteTargetPost(item);
                                            setVotingMode(1);
                                            voting_effect();
                                        }}
                                    />
                                </div>
                                <div className="vote-icon">
                                    <ThumbDownOffAltIcon
                                        onClick={() => {
                                            console.log("downvote");
                                            setVoteTargetPost(item);
                                            setVotingMode(2);
                                            voting_effect();
                                        }}
                                    />
                                    <span className="downvotes">{item.disliked_users.length}</span></div>

                                {!item.saved_users.includes(loggedin_username) ? (
                                    <div>
                                        <div className="vote-icon">
                                            <BookmarkAddIcon
                                                onClick={() => {
                                                    console.log("adding to saved posts");
                                                    setPostToBookmark(item);
                                                    setBookmarkClicked(!bookmarkClicked);
                                                }}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <p>Bookmark Added</p>
                                )}


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
            }</> : <p></p>
            }
        </div >
    )
}