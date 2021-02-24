const Book = require('../../models/bookModel')
const catchErrorsAsync = require('../../utils/catchAsync')

exports.newBook = catchErrorsAsync(async(req, res, next) => {
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
        const myBooks = await Book.find()
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