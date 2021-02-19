const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please tell us your name!'],
    },
    lastName: {
        type: String,
        required: [true, 'Please tell us your name!'],
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
        select: false
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

//Capitalize users first/last name
userSchema.pre('save', function(next){
    this.firstName = this.firstName.toUpperCase()
    this.lastName= this.lastName.toUpperCase()
    next()
})

//Comparing hashed password with user input
userSchema.methods.correctPassword = async function(formInput, userPasssword){
    return await bcrypt.compare(formInput, userPasssword)
}

//Hash users passwords when modified and when creating new account
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User