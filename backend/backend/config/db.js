const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connect = await mongoose.connect("mongodb+srv://cqrbala:admin123@clustergreddit.yvhxc4b.mongodb.net/?retryWrites=true&w=majority")
        console.log(`MongoDB Connected: ${connect.connection.host}`)
    }
    catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB