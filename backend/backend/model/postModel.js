const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    content: {
        type: String,
        required: [true, "Add some content"]
    },
    creator: {
        type: String,
        required: [true, "Add a user"]
    },
    creator_name_for_feed: {
        type: String,
        required: [true, "Add the visible public name"]
    },
    subgreddit: {
        type: String,
        required: [true, "Add a subgreddit it belongs to"]
    },
    saved_users: [{
        type: String,
    }],
    liked_users: [{
        type: String,
    }],
    disliked_users: [{
        type: String,
    }],
    comments: [{
        commentor: {
            type: String,
            required: [true, "Add a commentor"]
        },
        comment_content: {
            type: String,
            required: [true, "Add some comment content"]
        }
    }],
    reports: [{
        reported_by: {
            type: String,
            required: [true, "Add a reporter"]
        },
        concern: {
            type: String,
            required: [true, "Add the concern"]
        },
        ignored_status: {
            type: Boolean,
            required: [true, "Add a ignored or not state"]
        }
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema)