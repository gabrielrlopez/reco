const User = require('../../models/userModel')
const Profile = require('../../models/profileModel')
const catchErrorsAsync = require('../../utils/catchAsync')
const AppError = require('../../utils/appError')


exports.checkIfAlreadyRequestedOrFriends = catchErrorsAsync(async(req, res, next) => {
    const {receiverUserId} = req.body
    const currentUserProfile = await Profile.findOne({user: req.user.id})
    const friends = currentUserProfile.friends
    const sentRequest = currentUserProfile.friendRequests.sentRequests
    const requests = currentUserProfile.friendRequests.requests

    if(friends.includes(receiverUserId)) next(new AppError('This user is already your friend.'))
    if(sentRequest.includes(receiverUserId)) next(new AppError('You already sent this user a friend request.'))
    if(requests.includes(receiverUserId)) next(new AppError('This user has already sent you a friend request.'))
    
    next()
})

exports.sendFriendRequest = catchErrorsAsync(async(req, res, next) => {
    //User that is sending friend request
    const currentUser = await User.findById(req.user.id)

    //User that will be receiving friend request
    //Pushing friend request into receiving users friend requests array
    const {receiverUserId} = req.body
    await Profile.findOneAndUpdate(
        {user: receiverUserId},
        {$push: {"friendRequests.requests": {
            userId: currentUser._id,
            userName: currentUser.userName,
            userFullName: [currentUser.firstName, currentUser.lastName]
        }}}
    )

    //Pushing friend request into current users sent friend requests array
    const receivingUser = await User.findById(receiverUserId)
    const currentUserProfile = await Profile.findOneAndUpdate(
        {user: req.user.id},
        {$push: {"friendRequests.sentRequests": receivingUser}},
    )


    res.json(currentUserProfile)
})

exports.cancelFriendRequest = catchErrorsAsync(async(req, res, next) => {
    const {requestedUserId} = req.body
    
    //Delete sent friend request from current users sent requests array 
    const currentUserProfile = await Profile.findOneAndUpdate(
        {user: req.user.id},
        {$pull: {"friendRequests.sentRequests": requestedUserId}}
    )
    //Delete the friend request from requested user friend requests array
    await Profile.findOneAndUpdate(
        {user: requestedUserId},
        {$pull: {"friendRequests.requests": {userId: req.user.id}}}
    )
    
    res.json(currentUserProfile)
})

exports.acceptFriendRequest = catchErrorsAsync(async(req, res, next) => {
    const {senderUserId} = req.body
    const senderUserProfile = await User.findById(senderUserId)
    
    //Delete friend request from current users requests array then push the requester into current users friends array
    const currentUserProfile = await Profile.findOneAndUpdate(
        {user: req.user.id},
        {$pull: {"friendRequests.requests": {userId: senderUserId}},
         $push: {"friends": {
            $each: [
                {
                    userFullName: [senderUserProfile.firstName, senderUserProfile.lastName],
                    userId: senderUserProfile._id,
                    userName: senderUserProfile.userName,
                }
            ],
            $sort: {userFullName: 1}
        }}},
        {new: true}
    )


    //Delete the sent request from requesters sent requests array and push the requested user into the requestors friends array
    const currentUser = await User.findById(req.user.id)
    await Profile.findOneAndUpdate(
        {user: senderUserId},
        {$pull: {"friendRequests.sentRequests": req.user.id},
         $push: {"friends": {
            userId: currentUser._id,
            userName: currentUser.userName,
            userFullName: [currentUser.firstName, currentUser.lastName]
         }}
        },
        {new: true}
    )

    res.status(200).json({
        status: "success",
        data: currentUserProfile
    })
})

exports.declineFriendRequest = catchErrorsAsync(async(req, res, next) => {
    const {senderUserId} = req.body

    //Delete request from current users requests array
    const currentUserProfile = await Profile.findOneAndUpdate(
        {user: req.user.id},
        {$pull: {"friendRequests.requests": {userId: senderUserId}}},
        {new: true}
    )

    //Delete sent request from the user's sent request array that sent the request
    await Profile.findOneAndUpdate(
        {user: senderUserId},
        {$pull: {"friendRequests.sentRequests": req.user.id}},
        {new: true}
    )

    res.status(200).json({
        status: "success",
        data: currentUserProfile
    })
})