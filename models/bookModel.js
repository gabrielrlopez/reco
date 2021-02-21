const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: [true, "We can't seem to save the title from Google right now. Please try again."]
    },
    authors: {
        type: String,
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
    genre: String,
    averageRating: Number,
    maturityRating: String,
    cover: [String],
    previewLink: String
}) 

const Book = mongoose.model('Book', bookSchema)
module.exports = Book