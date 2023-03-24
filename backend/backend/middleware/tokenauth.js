const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const tokenAuth = asyncHandler(async (req, res, next) => {
    if (!req.body.token || !req.body.id) {
        console.log('token or id missing in request')
        return res.status(400).json({ message: "Not authorized" })
    }
    const token = req.body.token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (decoded.id === req.body.id) {
        console.log('Authorized, moving to next')
        next()
    }
    else {
        console.log('Token does not match')
        return res.status(400).json({ message: "Not authorized" })
    }
})

module.exports = { tokenAuth }