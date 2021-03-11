const User = require('../../models/userModel')
const Profile = require('../../models/profileModel')
const catchErrorsAsync = require('../../utils/catchAsync')
const AppError = require('../../utils/appError')

exports.createUpdateProfile = catchErrorsAsync(async(req, res, next) => {
    const profileFields = {
        user: req.user.id,
    }
    
    let profile = await Profile.findOne({user: req.user.id})
    if(profile) {
        profile = await Profile.findOneAndUpdate(
            {user: req.user.id},
            {$set: profileFields},
            {new: true})
        return res.json(profile)
    }
    profile = new Profile(profileFields)
    await profile.save()
    res.json(profile)
})

exports.addBookToDB = catchErrorsAsync(async(req, res, next) => {
    const book = req.body
    const {googleId} = book
    const profile = await Profile.findOne({user: req.user.id})

    //Check if book has already been added to the users favorites/readLater
    profile.books.favorites.map(book => {
        if(book.googleId === googleId) return next(new AppError('This book is already saved to your base.', 500))
    })
    profile.books.readLater.map(book => {
        if(book.googleId === googleId) return next(new AppError('This book is already saved to your base.', 500))
    })

    profile.books[book.addedTo].push(book)
    await profile.save()
    res.json(profile)
})

exports.deleteBook = catchErrorsAsync(async(req, res, next) => {
    const book = req.body
    const type = book.addedTo
    const profile = await Profile.findOne({user: req.user.id})
    const removeIndex = profile.books[type].map(book => book._id).indexOf(req.params.book_id)
    profile.books[type].splice(removeIndex, 1)   
    await profile.save()
    res.json(profile)
})

exports.getMyProfile = catchErrorsAsync(async(req, res, next) => {
    const profile = await Profile.findOne({
        user: req.user.id
    })

    if(!profile) next(new AppError('This user does not exist. Please sign up for an account. If you forgot the email or password please follow this link and follow the prompts to recover your account..'))

    res.status(200).json({
        status: 'success',
        data: profile
    })
})