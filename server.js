const express = require('express')
const connectDB = require('./config/db')

const userRoutes = require('./routes/api/users')
const profileRoutes = require('./routes/api/profile')
const bookRoutes = require('./routes/api/books')

const app = express()

//Connect Database
connectDB()

//Reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));

app.get('/', (req, res) => res.send('Hello from the server!'))

//Routes
app.use('/api/users', userRoutes)
app.use('/api/profiles', profileRoutes)
app.use('/api/books', bookRoutes)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})