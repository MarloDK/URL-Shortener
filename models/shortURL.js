const mongoose = require('mongoose')
const shortId = require('shortId')

const shortURLSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },

    short: {
        type: String,
        required: true,
        default: shortId.generate
    },

    timesClicked: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('shortURL', shortURLSchema)