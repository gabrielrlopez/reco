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
                message: 'You must provide a first and last name!'
        }
    },
    email: {
        type: String,
        required: [true, 'Please enter a valid email.'],
        vaidate: [validator.isEmail, 'Please enter a valid email.'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please come up with a password that contains a minimum of 8 characters.'],
        minlength: 8,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            // This only works on save & create NOT update
            validator: 
                function(el){
                    return el === this.password
                },
                message: "Oops! Passwords do no match"
        }
    },
    date: {
        type: Date,
        default: Date.now()
    },
    photo: String,
    avatar: {
        type: String
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User