const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')


router.post('/signup', authController.signUp)
router.post('/login', authController.login)

router.get('/auth', authController.isLoggedIn)
router.get('/logout', authController.logout)


module.exports = router