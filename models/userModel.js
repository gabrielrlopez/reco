const mongoose = require('mongoose')
const validator = require('validator')  

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!'],
        validate: {
            validator:
                function(name){
                    return name.split(/\W+/).length >= 2
                },
                message: 'You must provide first and last name!'
        }
    },
    email: {
        type: String,
        required: [true, 'Please enter a valid email.'],
        vaidate: [validator.isEmail, 'Please enter a valid email.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please come up with a password that contains a minimum of 8 characters.'],
        minLeng: 8,
        select: false
    },
    // passwordConfirm: {

    // },
    date: {
        type: Date,
        default: Date.now()
    },
    avatar: {
        type: String
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User