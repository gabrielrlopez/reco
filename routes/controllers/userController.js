const User = require('../../models/userModel')
const AppError = require('../../utils/appError')
const catchErrorsAsync = require('../../utils/catchAsync')

const filterObj = (obj, ...allowedFields) => {
    const newObj = {}
    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el)) newObj[el] = obj[el]
    })
    return newObj
}

exports.getAllUsers = async (req, res, next) => {
    const users = await User.find()

    res.status(200).json({
        status: 'success',
        data: {
            users
        }
    })
}

exports.updateMe = catchErrorsAsync(async (req, res, next) => {
    //1) Create error if user POSTs password data
    if(req.body.password || req.body.passwordConfirm){
        return next(new AppError('This route is not for password updates. Please use /updateMyPassword'), 400)
    }
    //2) Filter out unwanted field names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'firstName', 'lastName', 'email')

    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    })
    //3) Update user
    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    })
})

exports.deleteMe = catchErrorsAsync(async(req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false})

    res.status(204).json({
        status: 'success',
        data: null
    })
})

