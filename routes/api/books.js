 const express = require('express')
 const router = express.Router()
 const authController = require('../controllers/authController')
 const booksController = require('../controllers/booksController')

 router.route('/')
 .post(authController.protect, booksController.newBook)
 router.get('/my-books', authController.protect, booksController.getMyBooks)



module.exports = router