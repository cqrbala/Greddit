const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getUserdata, updateUserdata, getFollowers, updateFollowers, getFollowing, updateFollowing, createSubGreddit
    , getMySubGreddits, updateMySubGreddits, handleMySubGredditsRequests, getAllSubGreddits, leaveSubGreddit, joinSubGreddit,
    SubmitPost, getSubGredditPosts, handleVoteUpdate, PublishSubComment, SaveSubGredditPost, getSavedPosts, removeSavedPosts,
    FollowUser, handlePostReport, handleReportBlock, handleReportIgnore, handleDeletePost } = require('../controllers/userController')
const { tokenAuth } = require('../middleware/tokenauth')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/profile', tokenAuth, getUserdata)
router.post('/profile/update', tokenAuth, updateUserdata)
router.post('/profile/update/followers', tokenAuth, updateFollowers)
router.post('/profile/update/following', tokenAuth, updateFollowing)
router.post('/profile/followers', tokenAuth, getFollowers)
router.post('/profile/following', tokenAuth, getFollowing)
router.post('/createSubGreddit', tokenAuth, createSubGreddit)
router.post('/MySubGreddits', tokenAuth, getMySubGreddits)
router.post('/SubGreddits', tokenAuth, getAllSubGreddits)
router.post('/SubGreddits/leave', tokenAuth, leaveSubGreddit)
router.post('/SubGreddits/join', tokenAuth, joinSubGreddit)
router.post('/SubGreddits/posts', tokenAuth, getSubGredditPosts)
router.post('/SubGreddits/postSubmit', tokenAuth, SubmitPost)
router.post('/SubGreddits/posts/voteUpdate', tokenAuth, handleVoteUpdate)
router.post('/SubGreddits/posts/report', tokenAuth, handlePostReport)
router.post('/SubGreddits/posts/comment', tokenAuth, PublishSubComment)
router.post('/SubGreddits/posts/save', tokenAuth, SaveSubGredditPost)
router.post('/SubGreddits/posts/follow', tokenAuth, FollowUser)
router.post('/MySubGreddits/update', tokenAuth, updateMySubGreddits)
router.post('/MySubGreddits/reports/block', tokenAuth, handleReportBlock)
router.post('/MySubGreddits/reports/ignore', tokenAuth, handleReportIgnore)
router.post('/MySubGreddits/reports/delete', tokenAuth, handleDeletePost)
router.post('/MySubGreddits/requests', tokenAuth, handleMySubGredditsRequests)
router.post('/savedposts', tokenAuth, getSavedPosts)
router.post('/savedposts/remove', tokenAuth, removeSavedPosts)



module.exports = router