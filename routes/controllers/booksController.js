const Profile = require('../../models/profileModel')
const catchErrorsAsync = require('../../utils/catchAsync')
const AppError = require('../../utils/appError')

exports.checkForDuplicateBooks = catchErrorsAsync(async(req, res, next) => {
    const book = req.body
    const {googleId} = book
    const profile = await Profile.findOne({user: req.user.id})
    const favorites = profile.userBase.books.favorites
    const readLater = profile.userBase.books.readLater
    favorites.map(book => {
        if(book.googleId === googleId) return next(new AppError('This book is already saved to your base.', 500))
    })
    readLater.map(book => {
        if(book.googleId === googleId) return next(new AppError('This book is already saved to your base.', 500))
    })
    next()
})

exports.addBookToDB = catchErrorsAsync(async(req, res, next) => {
    const book = req.body
    const profile = await Profile.findOne({user: req.user.id})
    profile.userBase.books[book.addedTo].push(book)
    await profile.save()
    res.json(profile)
})


exports.deleteBook = catchErrorsAsync(async(req, res, next) => {
    const book = req.body
    const type = book.addedTo
    const profile = await Profile.findOne({user: req.user.id})
    const removeIndex = profile.userBase.books[type].map(book => book._id).indexOf(req.params.book_id)
    profile.userBase.books[type].splice(removeIndex, 1)   
    await profile.save()
    res.json(profile)
})