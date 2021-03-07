const User = require('../../models/userModel')
const Book = require('../../models/bookModel')
const catchErrorsAsync = require('../../utils/catchAsync')

exports.newBook = catchErrorsAsync(async(req, res, next) => {
        const {user} = req
        if(!user) return next()
        const newBook = await Book.create(req.body)
        res.status(201).json({
            status: 'success',
            data: {
                books: newBook
            }
        })
})

exports.getMyBooks = async(req, res, next) => {
    try {
        const myBooks = await Book.findOne({user: req.user.id})

        if(!myBooks){
            return res.status(400).json({msg: `You haven't saved any books to your library.`})
        }

        res.status(201).json({
            status: 'success',
            data: {
                books: myBooks
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        })
    }
}