const mongoose = require('mongoose');

const SubGredditSchema = mongoose.Schema({
    moderator: {
        type: String
    },
    name: {
        type: String,
        unique: true
    },
    description: {
        type: String
    },
    tags: [{
        type: String
    }],
    banned_keywords: [{
        type: String
    }],
    posts: [{
        type: String
    }],
    valid_users: [{
        type: String
    }],
    blocked_users: [{
        type: String
    }],
    requested_users: [{
        type: String
    }],
    not_allowed_users: [{
        type: String
    }],
}, {
    timestamps: true
})

module.exports = mongoose.model('SubGreddit', SubGredditSchema)