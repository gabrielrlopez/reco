const User = require('../../models/userModel')
const Profile = require('../../models/profileModel')
const catchErrorsAsync = require('../../utils/catchAsync')
const AppError = require('../../utils/appError')

exports.createUpdateProfile = catchErrorsAsync(async(req, res, next) => {
    const {
        twitter,
        instagram,
        linkedin,
        facebook,
        // ...rest
    } = req.body

    const {book} = req.body



    const profileFields = {
        user: req.user.id,
        books: book
        // ...rest
    }

    const socialFields = {twitter, instagram, linkedin, facebook }
    profileFields.social = socialFields

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
    const profile = await Profile.findOne({user: req.user.id})
    profile.books[book.addedTo].push(book)
    await profile.save()
    res.json(profile)
})

exports.getMyProfile = catchErrorsAsync(async(req, res, next) => {
    const profile = await Profile.findOne({
        user: req.user.id
    }).populate('user', ['firstName', 'lastName'])

    console.log(profile)

    if(!profile) next(new AppError('This user does not exist. Please sign up for an account. If you forgot the email or password please follow this link and follow the prompts to recover your account..'))

    res.status(200).json({
        status: 'success',
        data: profile
    })
})