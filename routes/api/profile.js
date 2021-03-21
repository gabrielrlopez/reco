const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const profileController = require('../controllers/profileController')
const friendRequestController = require('../controllers/friendRequestController')

//Create profile on sign up, and get users profile on log in
router.route('/me')
.post(authController.protect, profileController.createUpdateProfile)
.get(authController.protect, profileController.getMyProfile)

//Send user and profile data when a user is searched for
router.post('/search', 
    authController.protect,
    profileController.getSearchedProfile
)

//Delete a friend
router.post('/friends/delete', authController.protect, profileController.deleteFriend)

//Send and receive friend requests
router.post('/requests', authController.protect,
friendRequestController.checkIfAlreadyRequestedOrFriends,
friendRequestController.sendFriendRequest)
//Cancel a friend request
router.post('/requests/cancel', authController.protect, friendRequestController.cancelFriendRequest)
//Accept friend requests
router.post('/requests/accept', authController.protect, friendRequestController.acceptFriendRequest)
//Decline friend requests
router.post('/requests/decline', authController.protect, friendRequestController.declineFriendRequest)

module.exports = router 