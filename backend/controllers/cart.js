const { response } = require('express');
const Cart = require('../models/cart');
const Book = require('../models/book');

const addCart = async(req, res = response) => {
    const cart = Cart(req.body);
    try {
        await cart.save();
        res.json({
            message: 'Libro añadido al carrito correctamente',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error  al añadir al carrito'
        });
    }

}

const getCart = async(req, res = response) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.find({ userId, status: true });
        if (!cart) {
            return res.status(404).json({
                message: 'Carrito no encontrado'
            });
        }
        let totalQuantity = 0;
        let totalPrice = 0;
        let arrayBooks = [];

        for (const item of cart) {
            const bookCart = await Book.findById(item.book);
            if (bookCart) {
                let book = {
                    idItem: item.id,
                    nombre: bookCart.Titulo,
                    price: bookCart.precio,
                    quantity: item.quantity,
                    idBook: item.book
                }
                arrayBooks.push(book);
            }
            totalQuantity += item.quantity;
            totalPrice += (bookCart.precio * item.quantity);
        }

        res.status(200).json({
            userId,
            cart: arrayBooks,
            totalQuantity,
            totalPrice
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error al obtener el carrito'
        });
    }
}

const deleteCart = async(req, res = response) => {
    const { idCart } = req.params;
    const cart = await Cart.findByIdAndDelete(idCart);
    if (!cart) {
        return res.status(404).json({
            message: 'Libro no encontrado'
        })
    } else {
        res.json({
            message: 'Libro eliminado correctamente'
        });
    }
}

module.exports = {
    addCart,
    getCart,
    deleteCart,
}