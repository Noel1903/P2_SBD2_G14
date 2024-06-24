const mongoose = require('mongoose');


const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    biography: {
        type: String,
        required: true
    },
    photoProfile: {
        type: String,
        required: true
    },
    booksList: {
        type: Array,
        required: true
    }
}, { collection: 'authors' });

module.exports = mongoose.model('Author', authorSchema);