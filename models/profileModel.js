const mongoose =  require('mongoose')
const validator = require('validator')

const book = {
        // googleId: {
    //     type: String,
    //     required: [true, 'We cannot obtain the id for this book from Google. Please try a different title or another instance of this title.'],
    //     unique: true
    // },
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
    addedto: String
}

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Book must belong to a user library']
    },
    bio: {
        type: String
    },
    books:  {   
            favorites: [book],
            readLater: [book]
        },
    social: {
        facebook: {
            type: String,
            validate: [validator.isURL, 'Please enter a valid URL.']
        },
        twitter: {
            type: String,
            validate: [validator.isURL, 'Please enter a valid URL.']
        },
        instagram: {
            type: String,
            validate: [validator.isURL, 'Please enter a valid URL.']
        },
        linkedin: {
            type: String,
            validate: [validator.isURL, 'Please enter a valid URL.']
        },
        youtube: {
            type: String,
            validate: [validator.isURL, 'Please enter a valid URL.']
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Profile = mongoose.model('Profile', profileSchema)
module.exports = Profile