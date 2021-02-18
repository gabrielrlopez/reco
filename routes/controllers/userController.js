const User = require('../../models/userModel')

exports.createNewUser = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body)
        res.status(200).json({
            status: 'sucess',
            data: {
                user: newUser
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        })
    }
}