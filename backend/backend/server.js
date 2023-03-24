const express = require('express')
const colors = require('colors')
const cors = require('cors')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const { errorhandler } = require('./middleware/errorMiddleware')

const PORT = process.env.PORT

connectDB();

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({ origin: '*' }))

app.use('/api/users', require('./routes/userRoutes'));

// app.use(errorhandler)

app.listen(PORT, () => {
    console.log(`started listening to port ${PORT}`);
})

