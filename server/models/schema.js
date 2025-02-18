const mongoose = require('mongoose')

const userStoks = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    prix: {
        type: Number,
        require: true
    },
    stock: {
        type: Number,
        require: true
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model('Stocks', userStoks)