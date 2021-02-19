const User = require('../../models/userModel')
const catchErrorsAsync = require('../../utils/catchAsync')


exports.signUp = catchErrorsAsync(async(req, res, next) => {
    const  newUser = await User.create(req.body)
    res.status(201).json({
        status: 'success',
        data: {
            user: newUser
        }
    })
})