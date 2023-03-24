const errorhandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 400
    res.status(statusCode)
    res.json({
        message: "oops",
    })
}

module.exports = {
    errorhandler,
}