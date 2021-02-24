 const express = require('express')
 const router = express.Router()
 const authController = require('../controllers/authController')
 
 const booksController = require('../controllers/booksController')

 router.route('/')
    .post(booksController.newBook)
    .get(authController.protect, booksController.getMyBooks)


module.exports = router