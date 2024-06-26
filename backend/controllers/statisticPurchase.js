const { response } = require('express');
const StatisticPurchase = require('../models/statisticPurchase');

const getTopBook = async(req, res = response) => {
    console.log('reportBook');
    try {
        const reportBook = await StatisticPurchase.find();


        res.status(200).json({
            reportBook
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error al obtener el top de libros',
            ok: false
        });
    }
}

module.exports = {
    getTopBook,
}