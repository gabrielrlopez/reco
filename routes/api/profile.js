const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const profileController = require('../controllers/profileController')


router.route('/me')
.post(authController.protect, profileController.createUpdateProfile)
.get(authController.protect, profileController.getMyProfile)

router.post('/search', 
    authController.protect,
    profileController.getSearchedProfile
)


module.exports = router