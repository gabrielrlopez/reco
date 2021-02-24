const mongoose =  require('mongoose')

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Type,
        ref: 'user'
    },
    bio: {
        type: String
    },
    social: {
        facebook: {
            type: String
        },
        twitter: {
            type: String
        },
        instagram: {
            type: String
        },
        linkedin: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Profile = mongoose.model('Profile', profileSchema)
module.exports = Profile