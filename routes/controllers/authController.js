const jwt = require('jsonwebtoken')
const User = require('../../models/userModel')
const catchErrorsAsync = require('../../utils/catchAsync')
const config = require('config')
const AppError = require('../../utils/appError')

const jwtSECRET = config.get('jwtSECRET')
const jwtEXPIRESIN = config.get('jwtEXPIRESIN')

exports.signUp = catchErrorsAsync(async(req, res, next) => {
    const  newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    })

    const token = jwt.sign({id: newUser._id}, jwtSECRET, {
        expiresIn: jwtEXPIRESIN
    })
    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    })
})


exports.login = catchErrorsAsync(async(req, res, next) => {
    const {email} = req.body
    const {password} = req.body


    //Check if email and password exist 
    if(!email || !password) {
        return next(new AppError('Please enter your email and password', 400))
    }
    //Check if user exists and password is correct
    const user = await User.findOne({email}).select('+password')
    if(!user || !(await user.correctPassword(password, user.password))){
        return next(new AppError('Oops! Incorrect password or email', 400))
    } 

    //If everything is okay send token
    const token = jwt.sign({id: user._id}, jwtSECRET, {
        expiresIn: jwtEXPIRESIN
    })

    res.status(200).json({
        status: 'success',
        token,
    })
})