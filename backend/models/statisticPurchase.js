const { Schema, model } = require('mongoose');

const StatisticPurchaseSchema = Schema({
    bookName: {
        type: String,
    },
    quantity: {
        type: Number,
        default: 0
    },
});

// Para excluir atributos o campos al momento de insertar en mongo, se usa el operador rest ... para almacenar el resto en una variable
StatisticPurchaseSchema.methods.toJSON = function() {
    const { __v, _id, ...statistic } = this.toObject();
    statistic.id = _id;
    return statistic;
}

// mongoose agrega una s al final en el nombre de la colección, por eso se pone Usuario
module.exports = model('statistic', StatisticPurchaseSchema);