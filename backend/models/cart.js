const { Schema, model } = require('mongoose');

const cartSchema = Schema({
    userId: {
        type: String,
        required: true
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    // name: {
    //     type: String,
    //     required: true
    // },
    // price: {
    //     type: Number,
    //     required: true,
    // },
    quantity: {
        type: Number,
        required: true
    }
}, { collection: 'carts' });


module.exports = model('Cart', cartSchema);