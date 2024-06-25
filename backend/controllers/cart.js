const { response } = require('express');
const Cart = require('../models/cart');

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
    const {userId} = req.params;
    try {
        const cart = await Cart.find({userId});
        if (!cart) {
            return res.status(404).json({
                message: 'Carrito no encontrado'
            });
        }
        let totalQuantity = 0;
        let totalPrice = 0;
        cart.forEach((item) => {
            totalQuantity += item.quantity;
            totalPrice += item.price;
        });

        res.json({
            cart,
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
    const {idCart} = req.params;
    const cart = await Cart.findByIdAndDelete(idCart);
    if(!cart){
        return res.status(404).json({
            message: 'Libro no encontrado'
        })
    }
    else{
        res.json({
            message: 'Libro eliminado correctamente'
        });
    }
}





module.exports = {
    addCart,
    getCart,
    deleteCart
}