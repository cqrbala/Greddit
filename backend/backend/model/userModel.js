const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Add a name"]
    },
    lastname: {
        type: String,
        required: [true, "Add a name"]
    },
    username: {
        type: String,
        required: [true, "Add a name"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Add an email"],
    },
    age: {
        type: Number,
        required: [true, "Add a name"]
    },
    contact: {
        type: Number,
        required: [true, "Add a name"]
    },
    password: {
        type: String,
        required: [true, "Add a password"]
    },
    followers: [{
        type: String
    }],
    following: [{
        type: String
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)