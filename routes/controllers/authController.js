const {promisify} = require('util')
const jwt = require('jsonwebtoken')
const User = require('../../models/userModel')
const catchErrorsAsync = require('../../utils/catchAsync')
const config = require('config')
const AppError = require('../../utils/appError')

const jwtSECRET = config.get('jwtSECRET')
const jwtEXPIRESIN = config.get('jwtEXPIRESIN')
const jwtCOOKIEEXPIRE = config.get('jwtCOOKIEEXPIRE')

const signToken = (id) => {
    return jwt.sign({id}, jwtSECRET, {
        expiresIn: jwtEXPIRESIN
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user.id)

    const cookieOptions = {
        expires: new Date(Date.now() + jwtCOOKIEEXPIRE * 24 * 60 * 60 * 1000),
        // secure: true,
        httpOnly: true
    }

    res.cookie('jwt', token, cookieOptions)

    res.status(statusCode).json({
        status: 'success',
        token
    })
}

exports.signUp = catchErrorsAsync(async(req, res, next) => {
    const  newUser = await User.create({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    })

    createSendToken(newUser, 201, res)
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
    createSendToken(user, 200, res)
})

exports.logout = async(req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })
    res.status(200).json(
        {
            status: 'success'
        })
}


//Only for rendered pages
exports.isLoggedIn = async(req, res, next) => {
    // 1) Check if token exists
    if(req.cookies.jwt){
        try {
            // 2) Verification token 
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, jwtSECRET)
            // 3) Check if user still exists
            const currentUser = await User.findById(decoded.id)
            if(!currentUser) return next()
            // 4) Check if user changed password after token was issued 
            if(currentUser.changedPassword(decoded.iat)){
                return next()
            }
            // there is a logged in user
            return res.json(currentUser)
        } catch (error) {
            return next()
        }
    }
}


exports.protect = catchErrorsAsync(async(req, res, next) => {
    // 1) Getting token and check if it's there
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
         token = req.headers.authorization.split(' ')[1]
    } else if(req.cookies.jwt){
        token = req.cookies.jwt
    }

    if(!token) {
        return next(new AppError('Your are not logged in! Please log in to get access.', 401))
    }
    // 2) Verification token 
    const decoded = await promisify(jwt.verify)(token, jwtSECRET)
    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id)
    if(!currentUser){
        return next(new AppError('The user belonging to this token no longer exists'), 401)
    }
    // 4) Check if user changed password after token was issued 
    if(currentUser.changedPassword(decoded.iat)){
        next(new AppError('User recently changed password! Please log in again'), 401)
    }
    // Grant access to protected route
    req.user = currentUser
    next()
})


