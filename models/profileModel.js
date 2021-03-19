const mongoose =  require('mongoose')
const validator = require('validator')

const book = {
    googleId: {
        type: String,
    },
    title: {
        type: String,
        required: [true, "We can't seem to save the title from Google right now. Please try again."],
    },
    authors: {
        type: [String],
        required: [true, "We can't seem to save the author from Google right now. Please try again."]
    },
    publisher: String,
    publishedDate: {
        type: String
    },
    description: {
        type: String
    },
    pageCount: Number,
    genre: [String],
    averageRating: Number,
    maturityRating: String,
    cover: {
        type: String,
    },
    previewLink: String,
    addedTo: String
}

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Book must belong to a user library']
    },
    userBase: {
        books: {
            favorites: [book],
            readLater: [book]
        },
        videoGames: {
            favorites: [],
            wantToPlay: []
        },
    },
    bio: {
        type: String
    },
    friends: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            userName: String,
            fullName: String
        },
    ],
    friendRequests: {
        requests: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                userName: String,
                fullName: String
            },
        ],
        sentRequests: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                userName: String,
                fullName: String
            },
        ]
    },
    social: {
        facebook: {
            type: String,
            validate: [validator.isURL, 'Please enter a valid URL.'],
            select: false
        },
        twitter: {
            type: String,
            validate: [validator.isURL, 'Please enter a valid URL.'],
            select: false
        },
        instagram: {
            type: String,
            validate: [validator.isURL, 'Please enter a valid URL.'],
            select: false
        },
        linkedin: {
            type: String,
            validate: [validator.isURL, 'Please enter a valid URL.'],
            select: false
        },
        youtube: {
            type: String,
            validate: [validator.isURL, 'Please enter a valid URL.'],
            select: false
        }
    },
    date: {
        type: Date,
        default: Date.now,
        select: false
    }
})

const Profile = mongoose.model('Profile', profileSchema)
module.exports = Profile