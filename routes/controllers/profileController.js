const User = require('../../models/userModel')
const Profile = require('../../models/profileModel')
const catchErrorsAsync = require('../../utils/catchAsync')
const AppError = require('../../utils/appError')

exports.createUpdateProfile = catchErrorsAsync(async(req, res, next) => {
    const profileFields = {
        user: req.user.id,
    }
    
    let profile = await Profile.findOne({user: req.user.id})
    if(profile) {
        profile = await Profile.findOneAndUpdate(
            {user: req.user.id},
            {$set: profileFields},
            {new: true})
    }
    profile = new Profile(profileFields)
    await profile.save()
    res.json(profile)
})

exports.getMyProfile = catchErrorsAsync(async(req, res, next) => {
    //Runs as soon as a user logs in
    const profile = await Profile.findOne({
        user: req.user.id
    })

    if(!profile) next(new AppError('This user does not exist. Please sign up for an account. If you forgot the email or password please follow this link and follow the prompts to recover your account..'))

    res.status(200).json({
        status: 'success',
        data: profile
    })
})

exports.getSearchedProfile = catchErrorsAsync(async(req, res, next) => {
    //Current user logged in and using application
    const currentUser = req.user

    //User being searched for
    const {userName} = req.body

    //Prevent users from searching themselves up
    if(userName === currentUser.userName) return next(new AppError(`${currentUser.firstName}, you cannot search yourself up..`))

    //Check if the user being searched for exists
    const user = await User.findOne({userName: userName})
    if(!user) return next(new AppError('Could not find this user. Double check that the capitalization, spelling, any spaces, and numbers are correct.'))
    
    //If user exists then send their profile as a response
    const userFullName = [user.firstName, user.lastName].toString()
    const profile = await Profile.findOne({
        user: user._id
    }).select('-friendRequests')

    res.status(200).json({
        status: 'success',
        data: {
            profile,
            userFullName,
            userName
        }
    })
})

exports.deleteFriend = catchErrorsAsync(async(req, res, next) => {
    const {friendUserId} = req.body

    //Delete user from current users friends array 
    currentUserProfile = await Profile.findOneAndUpdate(
        {user: req.user.id},
        {$pull: {"friends": friendUserId}}
    )

    //Delete current user from deleted friend's friends array
    await Profile.findOneAndUpdate(
        {user: friendUserId},
        {$pull: {"friends": req.user.id}}
    )
    res.json(currentUserProfile)
})
