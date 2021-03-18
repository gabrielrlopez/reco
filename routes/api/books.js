const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const profileController = require('../controllers/profileController')
const booksController = require('../controllers/booksController')


//favorite/readLater a book which gets added to users mybase(myBooks)
router.put('/myBooks', 
    authController.protect, 
    booksController.checkForDuplicateBooks, 
    booksController.addBookToDB
)

//delete a book from users mybase
router.put('/myBooks/:book_id',
 authController.protect, 
 booksController.deleteBook
)




module.exports = router