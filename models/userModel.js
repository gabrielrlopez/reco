const crypto = require('crypto')
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Please enter a username. This is how you will be found by other users.'],
        unique: [true, 'Oops! Looks like this username is already in use. Please enter a different username.'],
        minLength: [6, 'Oh c\'mon that\'s a short username let\'s make it more interesting! At least make it 6 characters long!'],
        maxLength: [16, 'Okay, that\'s a bit too interesting.. Let\'s not get too carried away. No longer than 12 characters long.']
    },
    firstName: {
        type: String,
        required: [true, 'Please tell us your name!'],
        uppercase: true
    },
    lastName: {
        type: String,
        required: [true, 'Please tell us your last name!'],
        uppercase: true
    },
    email: {
        type: String,
        required: [true, 'Please enter a valid email.'],
        validate: [validator.isEmail, 'Please enter a valid email.'],
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
                function(passConfirm){
                    return passConfirm === this.password
                },
                message: "Oops! Passwords do no match"
        }
    },
    passwordChangedAt: Date,
    date: {
        type: Date,
        default: Date.now()
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
})

//Capitalize users first/last name
userSchema.pre('save', function(next){
    this.firstName = this.firstName.toUpperCase()
    this.lastName= this.lastName.toUpperCase()
    next()
})

//Unactive users wont show up in querys
userSchema.pre(/^find/, function(next) {
    // this keyword points to the current query
    this.find({active: {$ne: false}})
    next()
})

//Comparing hashed password with user input
userSchema.methods.correctPassword = async function(formInput, userPasssword){
    return await bcrypt.compare(formInput, userPasssword)
}

userSchema.methods.changedPassword = function(JWTTimestamp){
    if(this.passwordChangedAt) {
        //converting passwordChangedAt date to seconds and to an integer
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)
        return JWTTimestamp < changedTimeStamp
    }
    // false means password was not changed
    return false
}

//Hash users passwords when modified and when creating new account
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
    next()
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password') || this.isNew) return next()

    this.passwordChangedAt = Date.now() - 1000
    next()
})

userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex')

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    console.log({resetToken}, this.passwordResetToken)

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000

    return resetToken
}

const User = mongoose.model('User', userSchema)
module.exports = User