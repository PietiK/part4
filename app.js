const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

app.use('/api/users', usersRouter)
app.use(blogsRouter)

module.exports = app