const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

router.post('/signup', authController.signUp)

router.route('/')

router.route('/:id')

module.exports = router