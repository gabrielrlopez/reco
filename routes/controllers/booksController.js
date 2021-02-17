const Book = require('../../models/bookModel')

exports.newBook = async(req, res, next) => {
    try {
        const newBook = await Book.create(req.body)
        res.status(201).json({
            status: 'success',
            data: {
                books: newBook
            }
        })
        console.log(newBook)
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message: error
        })
    }
}