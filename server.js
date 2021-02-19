//Global uncaught exceptions (async handlers)
process.on('uncaughtException', err => {
    console.log('UNHANDLED EXCEPTION! Shutting down...')
    console.log(err.name, err.message)
    process.exit(1)
})

const express = require('express')
const connectDB = require('./config/db')


const globalErrorHandler = require('./routes/controllers/errorController')
const AppError = require('./utils/appError')
const userRoutes = require('./routes/api/users')
const profileRoutes = require('./routes/api/profile')
const bookRoutes = require('./routes/api/books')

const app = express()

//Connect Database
connectDB()


//Reading data from the body into req.body
app.use(express.json({ limit: '10kb' }))

app.get('/', (req, res) => res.send('Hello from the server!'))

//Routes
app.use('/api/users', userRoutes)
app.use('/api/profiles', profileRoutes)
app.use('/api/books', bookRoutes)

//Error handling for any routes trying to be accessed that do not exist
app.all('*', (req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404))
})
app.use(globalErrorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})

//Global unhandled rejection handler
process.on('unhandledRejection', err => {
    console.log(err.name, err.message)
    console.log('UNHANDLED REJECTION! Shutting down...')
    server.close( () => {
        process.exit(1)
    })
})
