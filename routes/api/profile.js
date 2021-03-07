const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const profileController = require('../controllers/profileController')

//favorite a book which gets added to users library(myBooks)
router.put('/me/myBooks', authController.protect, profileController.addBookToDB)

router.route('/me')
.post(authController.protect, profileController.createUpdateProfile)
.get(authController.protect, profileController.getMyProfile)

module.exports = router