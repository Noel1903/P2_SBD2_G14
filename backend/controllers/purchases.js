const { response } = require('express');
const Purchase = require('../models/purchases');
const Cart = require('../models/cart');
const Book = require('../models/book');
const StatisticPurchase = require('../models/statisticPurchase');

const addPurchase = async(req, res = response) => {
    const purchase = Purchase(req.body);

    try {
        // Se recorre el arreglo de items del carro
        for (const item of purchase.cart) {
            const itemCart = await Cart.findById(item);

            if (itemCart) {
                // Se busca el libro que está en el carro
                const bookCart = await Book.findById(itemCart.book);
                let stock = 0;

                if (bookCart) {
                    // Se actualiza el stock del libro
                    stock = bookCart.cantidad_stock - itemCart.quantity;

                    if (stock < 0) {
                        stock = 0;
                    }

                    bookCart.cantidad_stock = stock;

                    await bookCart.save();

                    // Se busca si existe el libro en la colección de estadísticas
                    const existsStatistic = await StatisticPurchase.findOne({ bookName: bookCart.Titulo });

                    if (existsStatistic) {
                        // Se actualiza la cantidad adquirida en la compra
                        existsStatistic.quantity += itemCart.quantity;

                        await existsStatistic.save();
                    } else {
                        // Se crea un nuevo registro en la colección con la cantidad de la compra
                        const newStatistic = new StatisticPurchase({
                            bookName: bookCart.Titulo,
                            quantity: itemCart.quantity
                        });

                        await newStatistic.save();
                    }
                }

                // Se actualiza estado del item en el carro de la compra actual
                await Cart.findByIdAndUpdate(item, { status: false });
            }
        }

        await purchase.save();

        res.status(200).json({
            message: 'Compra realizada correctamente',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error al realizar la compra'
        });
    }

}


const getPurchases = async(req, res = response) => {
    try {
        const purchases = await Purchase.find();
        res.json({
            purchases
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error al obtener las compras'
        });
    }
}

const getPurchasesByUser = async(req, res = response) => {
    const { userId } = req.params;

    try {
        const purchases = await Purchase.find({ userId });
        res.json({
            purchases
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error al obtener las compras'
        });
    }
}


const updatePurchase = async(req, res = response) => {
    const { id, status } = req.body;

    try {
        const purchase = await Purchase.findById(id);

        if (!purchase) {
            return res.status(404).json({
                message: 'No existe la compra'
            });
        }

        purchase.status = status;
        await purchase.save();

        res.json({
            message: 'Compra actualizada correctamente'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error al actualizar la compra'
        });
    }
}

module.exports = {
    addPurchase,
    getPurchases,
    getPurchasesByUser,
    updatePurchase
}