const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
const SubGreddit = require('../model/subGredditModel')
const Post = require('../model/postModel')
const { use, post } = require('../routes/userRoutes')

const registerUser = asyncHandler(async (req, res) => {
    const firstname = req.body.Firstname;
    const lastname = req.body.LastName;
    const username = req.body.Username;
    const email = req.body.Email;
    const age = req.body.Age;
    const contact = req.body.Contact;
    const password = req.body.Password;
    const followers = []
    const following = []
    console.log('entered')

    const exists = await User.findOne({ username })
    if (exists) {
        console.log('already exists error')
        return res.status(403).json({ message: "User already exists" });
    }
    console.log('user does not exist')
    const salt = await bcrypt.genSalt(10)
    const encrypted_pass = await bcrypt.hash(password, salt)

    console.log('creating user')
    const new_user = await User.create({
        firstname,
        lastname,
        username,
        email,
        age,
        contact,
        password: encrypted_pass,
        followers,
        following,
    })
    if (new_user) {
        console.log('created user')
        return res.status(201).json({
            _id: new_user.id,
            firstname: new_user.firstname,
            lastname: new_user.lastname,
            token: generateToken(new_user.id),
        })
    } else {
        console.log('failed to create user')
        return res.status(400).json({
            message: 'registration failed'
        })
    }
})




const loginUser = asyncHandler(async (req, res) => {
    const username = req.body.username
    const password = req.body.password


    const user = await User.findOne({ username })
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    console.log('valid user')

    const password_match = await bcrypt.compare(password, user.password)
    if (!password_match) {
        return res.status(400).json({ message: "Incorrect password" });
    }
    console.log('valid password')



    return res.status(200).json({
        _id: user.id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        token: generateToken(user._id),
    })


})

const getUserdata = asyncHandler(async (req, res) => {
    const username = req.body.username
    const user = await User.findOne({ username })
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    else {
        return res.status(200).json(user)
    }
})

const updateUserdata = asyncHandler(async (req, res) => {
    const Firstname = req.body.Firstname;
    const Lastname = req.body.Lastname;
    const Username = req.body.Username;
    const Email = req.body.Email;
    const Age = req.body.Age;
    const Contact = req.body.Contact;

    const result = await User.updateOne({ username: Username }, {
        $set: {
            firstname: Firstname,
            lastname: Lastname,
            email: Email,
            age: Age,
            contact: Contact
        }
    })

    if (!result) {
        return res.status(400).json({ message: "Error occured" });
    }

    console.log(result)
    return res.status(200).json({ message: "Successful update" })

})

const getFollowers = asyncHandler(async (req, res) => {
    const username = req.body.username
    const user = await User.findOne({ username })
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    else {
        return res.status(200).json(user.followers)
    }
})

const getFollowing = asyncHandler(async (req, res) => {
    const username = req.body.username
    const user = await User.findOne({ username })
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    else {
        return res.status(200).json(user.following)
    }
})

const updateFollowers = asyncHandler(async (req, res) => {
    const target = req.body.target_user
    const user = req.body.username

    const result = await User.updateOne({ username: user }, {
        $pull: {
            followers: target,
        }
    })

    if (!result) {
        return res.status(400).json({ message: "Error occured" });
    }

    const result_2 = await User.updateOne({ username: target }, {
        $pull: {
            following: user,
        }
    })

    if (!result_2) {
        return res.status(400).json({ message: "Error occured" });
    }

    return res.status(200).json({ message: "Successful update" })

})

const updateFollowing = asyncHandler(async (req, res) => {
    const target = req.body.target_user
    const user = req.body.username

    const result = await User.updateOne({ username: user }, {
        $pull: {
            following: target
        }
    })

    if (!result) {
        return res.status(400).json({ message: "Error occured" });
    }

    const result_2 = await User.updateOne({ username: target }, {
        $pull: {
            followers: user
        }
    })

    if (!result_2) {
        return res.status(400).json({ message: "Error occured" });
    }

    return res.status(200).json({ message: "Successful update" })

})

const createSubGreddit = asyncHandler(async (req, res) => {
    const name = req.body.Name
    const description = req.body.Description
    const tags = req.body.Tags
    const banned_keywords = req.body.BannedKeywords
    const moderator = req.body.username
    const posts = []
    const valid_users = [req.body.username,]
    const blocked_users = ['haran',]
    const requested_users = []

    const exists = await SubGreddit.findOne({ name })
    if (exists) {
        console.log('SubGreddit exists error')
        return res.status(403).json({ message: "SubGreddit already exists" });
    }
    console.log('SubGreddit does not exist')

    const new_SubGreddit = await SubGreddit.create({
        moderator,
        name,
        description,
        tags,
        banned_keywords,
        posts,
        valid_users,
        blocked_users,
        requested_users
    })
    if (new_SubGreddit) {
        console.log('created SubGreddit')
        return res.status(201).json({
            message: 'success'
        })
    } else {
        console.log('failed to create SubGreddit')
        return res.status(400).json({
            message: 'creation failed'
        })
    }

})

const getMySubGreddits = asyncHandler(async (req, res) => {
    const username = req.body.username
    const documents = await SubGreddit.find({ moderator: username })
    console.log(documents)
    if (!documents) {
        return res.status(400).json({ message: "Your subgreddits were not found" });
    }
    else {
        return res.status(200).json(documents)
    }
})

const updateMySubGreddits = asyncHandler(async (req, res) => {
    console.log('starting to update')
    const namesArray = req.body.subgredditnames;
    const username = req.body.username;
    const documents = await SubGreddit.find({ moderator: username });

    const result = documents.filter(document => !namesArray.includes(document.name));
    console.log('Documents to delete:', result)
    const promises = result.map(async element => {
        const deleteResult = await SubGreddit.deleteOne({ name: element.name });
        if (!deleteResult) {
            throw new Error("Failed to delete the subgreddit");
        }

        const deletePostsResult = await Post.deleteMany({ subgreddit: element.name })
        if (!deletePostsResult) {
            throw new Error("Failed to delete the posts of the subgreddit you wanted to delete");
        }
    });

    await Promise.all(promises);
    return res.status(200).json({ message: "Successful deletion" });


})

const handleMySubGredditsRequests = asyncHandler(async (req, res) => {
    console.log('entered here')
    const username = req.body.username
    const requests = req.body.requests
    const accepted_users = req.body.accept
    const blocked_users = req.body.reject
    const subgreddit_name = req.body.name

    console.log(req.body)

    const requestsUpdate_result = await SubGreddit.updateOne({ name: subgreddit_name }, {
        $set: {
            requested_users: requests,
        }
    })

    if (!requestsUpdate_result) {
        return res.status(400).json({ message: "Error occured in updating requests" });
    }

    const document = await SubGreddit.findOne({ name: subgreddit_name });

    if (!document) {
        return res.status(400).json({ message: "Error occured in retrieveing document" });
    }
    console.log(document)

    const existing_array = document.valid_users
    const difference = accepted_users.filter(element => !existing_array.includes(element));

    const new_array = existing_array.concat(difference)

    const valid_users_update = await SubGreddit.updateOne({ name: subgreddit_name }, {
        $set: {
            valid_users: new_array,
        }
    })
    if (!valid_users_update) {
        return res.status(400).json({ message: "Error occured in updating valid users" });
    }

    const document2 = await SubGreddit.findOne({ name: subgreddit_name });

    if (!document2) {
        return res.status(400).json({ message: "Error occured in retrieveing document" });
    }
    console.log(document2)
    console.log('done with duty')

})

const getAllSubGreddits = asyncHandler(async (req, res) => {
    console.log("getting all subgreddits")
    const documents = await SubGreddit.find()
    console.log(documents)
    if (!documents) {
        return res.status(400).json({ message: "Your subgreddits were not found" });
    }
    else {
        return res.status(200).json(documents)
    }
})

const leaveSubGreddit = asyncHandler(async (req, res) => {
    console.log('trying to leave sub')
    const user = req.body.username
    const joined_subs = req.body.joinedsubgreddits

    const documents = await SubGreddit.find()
    if (!documents) {
        return res.status(400).json({ message: "Your subgreddits were not found" });
    }
    const joined_docs = documents.filter(obj => obj.valid_users.includes(user))

    const difference = joined_docs.filter(obj =>
        !joined_subs.some(sub => obj._id.toString() === sub._id.toString())
    );


    await updateSubGreddits(difference, user);

    return res.status(200).json({ message: "successful exit from subgreddit" })

})

async function updateSubGreddits(difference, user) {
    for (let i = 0; i < difference.length; i++) {
        console.log(difference[i].name)
        const result = await SubGreddit.updateOne({ name: difference[i].name }, {
            $pull: {
                valid_users: user,
            },
            $addToSet: {
                not_allowed_users: user,
            }
        });

        if (!result) {
            throw new Error("Failed to remove user from subgreddit.");
        }
    }
}

const joinSubGreddit = asyncHandler(async (req, res) => {
    const user = req.body.username
    const target_sub = req.body.subwishtojoin

    const doc = await SubGreddit.findOne({ name: target_sub })
    if (!doc) {
        return res.status(400).json({ message: "error occurred in retrieving the subgreddit data" })
    }

    if (doc.not_allowed_users.includes(user)) {
        return res.status(403).json({ message: "user can never join" })
    }

    const result = await SubGreddit.updateOne({ name: target_sub }, {
        $addToSet: {
            requested_users: user
        }
    })

    if (!result) {
        return res.status(400).json({ message: "error occurred in sending request" })
    }

    return res.status(200).json({ message: "successful sending of request" })
})

const SubmitPost = asyncHandler(async (req, res) => {
    let post_content = req.body.post_text
    const subgreddit = req.body.subgreddit
    const user = req.body.username

    const doc = await SubGreddit.findOne({ name: subgreddit })
    if (!doc) {
        return res.status(400).json({ message: "Error in retrieveing subgreddit info to check for banned keywords" })
    }
    const banned_words = (doc.banned_keywords).filter(str => str !== "");
    console.log(banned_words);

    const has_banned_words = banned_words.some(banned_word => post_content.toLowerCase().includes(banned_word.toLowerCase()));

    if (has_banned_words) {

        for (let i = 0; i < banned_words.length; i++) {
            post_content = post_content.replace(new RegExp(banned_words[i], "gi"), "*".repeat(banned_words[i].length))
        }


        console.log(post_content)

        const create_post_result = await Post.create({
            content: post_content,
            creator: user,
            creator_name_for_feed: user,
            subgreddit: subgreddit,
            upvotes: 0,
            downvotes: 0,
        })

        if (!create_post_result) {
            return res.status(400).json({ message: "Error occurred in creating the post" })
        }

        console.log(create_post_result)
        return res.status(201).json({ message: "succesfully created banned keywords post" })
    }
    else {
        const create_post_result = await Post.create({
            content: post_content,
            creator: user,
            creator_name_for_feed: user,
            subgreddit: subgreddit,
            upvotes: 0,
            downvotes: 0,
        })

        if (!create_post_result) {
            return res.status(400).json({ message: "Error occurred in creating the post" })
        }
        console.log(create_post_result)
        return res.status(200).json({ message: "successfully created the post" })
    }
})

const getSubGredditPosts = asyncHandler(async (req, res) => {
    const subgreddit_name = req.body.subgreddit

    const documents = await Post.find({ subgreddit: subgreddit_name })

    if (!documents) {
        return res.status(400).json({ message: "Error in getting posts from database" })
    }

    return res.status(200).json(documents)
})

const handleVoteUpdate = asyncHandler(async (req, res) => {
    const voting_mode = req.body.voting_mode;
    const user = req.body.username;
    const post_id = req.body.postid;

    const doc = await Post.findOne({ _id: post_id })

    if (!doc) {
        return res.status(400).json({ message: "Error getting the post" })
    }

    const already_liked = doc.liked_users.includes(user)
    const already_disliked = doc.disliked_users.includes(user)

    if (voting_mode === 1) {

        if (already_liked) {
            const update_result = await Post.updateOne({ _id: post_id }, {
                $pull: {
                    liked_users: user
                }
            })

            if (!update_result) {
                return res.status(400).json({ message: "Error unliking it" })
            }
        }
        else {
            if (already_disliked) {
                const update_result = await Post.updateOne({ _id: post_id }, {
                    $pull: {
                        disliked_users: user
                    },
                    $addToSet: {
                        liked_users: user
                    }
                })

                if (!update_result) {
                    return res.status(400).json({ message: "Error liking after having disliked it" })
                }
            }
            else {
                const update_result = await Post.updateOne({ _id: post_id }, {
                    $addToSet: {
                        liked_users: user
                    }
                })

                if (!update_result) {
                    return res.status(400).json({ message: "Error liking it for the first time" })
                }
            }
        }
    }
    if (voting_mode === 2) {
        if (already_disliked) {
            const update_result = await Post.updateOne({ _id: post_id }, {
                $pull: {
                    disliked_users: user
                }
            })

            if (!update_result) {
                return res.status(400).json({ message: "Error removing dislike" })
            }
        }
        else {
            if (already_liked) {
                const update_result = await Post.updateOne({ _id: post_id }, {
                    $pull: {
                        liked_users: user
                    },
                    $addToSet: {
                        disliked_users: user
                    }
                })

                if (!update_result) {
                    return res.status(400).json({ message: "Error unliking after having liked it" })
                }
            }
            else {
                const update_result = await Post.updateOne({ _id: post_id }, {
                    $addToSet: {
                        disliked_users: user
                    }
                })

                if (!update_result) {
                    return res.status(400).json({ message: "Error unliking it for the first time" })
                }
            }
        }
    }

    return res.status(200).json({
        message: "success"
    })
})

const PublishSubComment = asyncHandler(async (req, res) => {
    const user = req.body.username
    const comment = req.body.comment
    const postid = req.body.postid
    console.log(postid)

    const obj = {
        commentor: user,
        comment_content: comment,
    }

    const update_result = await Post.updateOne({ _id: postid }, {
        $push: {
            comments: obj
        }
    })

    if (!update_result) {
        return res.status(400).json({ message: "Failed in adding comment" })
    }

    return res.status(200).json({ message: "Successfully added comment" })
})

const SaveSubGredditPost = asyncHandler(async (req, res) => {
    const postid = req.body.postid
    const user = req.body.username

    const update_result = await Post.updateOne({ _id: postid }, {
        $push: {
            saved_users: user
        }
    })

    if (!update_result) {
        return res.status(400).json({ message: "Failed to save post" })
    }

    return res.status(200).json({ message: "Successfully saved post" })
})

const getSavedPosts = asyncHandler(async (req, res) => {
    const user = req.body.username
    console.log(user)

    const posts = await Post.find();
    if (!posts) {
        return res.status(400).json({ message: "Failed to get posts" })
    }

    const saved_posts = posts.filter(post => post.saved_users.includes(user))

    if (!saved_posts) {
        return res.status(400).json({ message: "Failed to get saved posts" })
    }

    return res.status(200).json(saved_posts)
})

const removeSavedPosts = asyncHandler(async (req, res) => {
    const postid = req.body.postid
    const user = req.body.username

    const result = await Post.updateOne({ _id: postid }, {
        $pull: {
            saved_users: user
        }
    })

    if (!result) {
        return res.status(400).json({ message: "Failed to remove saved post" })
    }

    return res.status(200).json({ message: "Successfully removed saved post" })
})

const FollowUser = asyncHandler(async (req, res) => {
    const user = req.body.username
    const target_user = req.body.target_user

    const follow_result = await User.updateOne({ username: user }, {
        $push: {
            following: target_user
        }
    })

    if (!follow_result) {
        return res.status(400).json({ message: "Unable to follow user" })
    }

    const follow_result_2 = await User.updateOne({ username: target_user }, {
        $push: {
            followers: user
        }
    })

    if (!follow_result_2) {
        return res.status(400).json({ message: "Unable to follow user" })
    }

    return res.status(200).json({ message: "Successfully followed user" })

})

const handlePostReport = asyncHandler(async (req, res) => {
    console.log('entered here')
    let report_obj = req.body.obj
    report_obj.ignored_status = false;
    const user = req.body.username
    const postid = req.body.postid

    const post_info = await Post.findOne({ _id: postid })

    if (!post_info) {
        return res.status(400).json({ message: "Backend error" })
    }

    if (post_info.creator_name_for_feed === "Blocked user") {
        return res.status(403).json({ message: "The post has been blocked" })
    }

    const result = await Post.updateOne({ _id: postid }, {
        $push: {
            reports: report_obj
        }
    })

    if (!result) {
        return res.status(400).json({ message: "Unable to report the post" })
    }
    return res.status(200).json({ message: "Successfully reported" })
})

const handleReportBlock = asyncHandler(async (req, res) => {
    const postid = req.body.postid
    const reportid = req.body.reportid

    const post = await Post.findOne({ _id: postid });
    const name_update = await Post.updateOne({ _id: postid }, {
        $set: {
            creator_name_for_feed: "Blocked user"
        }
    })

    if (!name_update) {
        return res.status(400).json({ message: "Backend error in changing name for feed" })
    }

    const report_removal = await Post.updateOne({ _id: postid }, {
        $pull: {
            reports: {
                _id: reportid
            }
        }
    })

    if (!report_removal) {
        return res.status(400).json({ message: "Backend error in deleting report" })
    }

    return res.status(200).json({ message: "Successfully executed" })
    // const report = post.reports.find(report => report._id.equals(reportid));
})

const handleReportIgnore = asyncHandler(async (req, res) => {
    const postid = req.body.postid
    const reportid = req.body.reportid

    const result = await Post.updateOne(
        {
            _id: postid,
            reports: {
                $elemMatch: {
                    _id: reportid
                }
            }
        },
        {
            $set: {
                "reports.$.ignored_status": true
            }
        }
    );

    if (!result) {
        return res.status(400).json({ message: "Backend error in ignoring report" })
    }

    return res.status(200).json({ message: "Successfully executed" })
})

const handleDeletePost = asyncHandler(async (req, res) => {
    const postid = req.body.postid

    const result = await Post.deleteOne({ _id: postid });

    if (!result) {
        return res.status(400).json({ message: "Backend error in deleting post" })
    }

    return res.status(200).json({ message: "Successfully executed" })
})

// Generate JWT
const generateToken = (id) => {
    console.log('creating token')
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser, loginUser, getUserdata, updateUserdata, getFollowers, getFollowing, updateFollowers, updateFollowing, createSubGreddit,
    getMySubGreddits, updateMySubGreddits, handleMySubGredditsRequests, getAllSubGreddits, leaveSubGreddit, joinSubGreddit, SubmitPost,
    getSubGredditPosts, handleVoteUpdate, PublishSubComment, SaveSubGredditPost, getSavedPosts, removeSavedPosts, FollowUser, handlePostReport,
    handleReportBlock, handleReportIgnore, handleDeletePost
}
