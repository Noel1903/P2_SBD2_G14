const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    cart: {
        type: Array,
        required: true
    },
    totalQuantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    }
}, { collection: 'purchases' });

module.exports = mongoose.model('Purchase', purchaseSchema);