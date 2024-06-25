const { response } = require('express');
const Purchase = require('../models/purchases');

const addPurchase = async(req, res = response) => {
    const purchase = Purchase(req.body);
    try {
        await purchase.save();
        res.json({
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


const updatePurchase = async(req, res = response) => {
    const { id,status } = req.body;

    try{
        const purchase = await Purchase.findById(id);

        if(!purchase){
            return res.status(404).json({
                message: 'No existe la compra'
            });
        }

        purchase.status = status;
        await purchase.save();

        res.json({
            message: 'Compra actualizada correctamente'
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            message: 'Error al actualizar la compra'
        });
    }
}

module.exports = {
    addPurchase,
    getPurchases,
    updatePurchase
}
