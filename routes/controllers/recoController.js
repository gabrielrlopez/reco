const User = require('../../models/userModel')
const Profile = require('../../models/profileModel')
const catchErrorsAsync = require('../../utils/catchAsync')
const AppError = require('../../utils/appError')

exports.sendNewReco = catchErrorsAsync(async(req, res, next) => {
        //1) Check if current user is friends with the user they are trying to send the reco to 
        const currentUser = await User.findById(req.user.id)
        const currentUserProfile = await Profile.findOne({user: req.user.id})
        const currentUserFriends = currentUserProfile.friends.map(friend => friend.userId)

        if(!currentUserFriends.includes(req.body.userId)){
            return next(new AppError('In order to send other users Recos you must be friends.'), 500)  
        } 
        //2)If so, send reco and push it into the receiving user's reco array
        await Profile.findOneAndUpdate(
            {user: req.body.userId},
            {$push: {"recommendations.books": {
                userId: currentUser._id,
                userName: currentUser.userName,
                userFullName: [currentUser.firstName, currentUser.lastName].toString(),
                reco: req.body.book
            }}}
        )

        res.status(200).json({
            status: 'success',
            data: currentUserProfile
        })
})