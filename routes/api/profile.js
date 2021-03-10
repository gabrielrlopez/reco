const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const profileController = require('../controllers/profileController')


router.route('/me')
.post(authController.protect, profileController.createUpdateProfile)
.get(authController.protect, profileController.getMyProfile)

//favorite a book which gets added to users mybase(myBooks)
router.put('/me/myBooks', authController.protect, profileController.addBookToDB)

//delete a book from users mybase
router.delete('/me/myBooks/:book_id', authController.protect, profileController.deleteBook)

module.exports = router