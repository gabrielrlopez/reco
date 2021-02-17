const mongoose = require('mongoose')

const userSchema = new moongose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    email: {
        type: String,
        required: [true, 'Please enter a valid email.']
    },
    password: {
        type: String,
        required: [true, 'Please come up with a password that contains a minimum of 8 characters.'],
        minLeng: 8,
        select: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User