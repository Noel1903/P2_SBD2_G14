const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    lastname: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    imgProfile: {
        type: String,
    },
    address: {
        type: String,
    },
    telephone: {
        type: String,
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    role: {
        type: Number,
        required: true,
        default: 1
    },
    age: {
        type: Number,
    },
    status: {
        type: Boolean,
        default: true,
    },
});

// Para excluir atributos o campos al momento de insertar en mongo, se usa el operador rest ... para almacenar el resto en una variable
UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

// mongoose agrega una s al final en el nombre de la colección, por eso se pone Usuario
module.exports = model('user', UserSchema);