const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const login = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        const userLogin = await User.findOne({ email });

        if (!userLogin) {
            return res.status(404).json({
                message: `No existe un usuario con el email ${email}`,
                ok: false
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, userLogin.password);

        if (!validPassword) {
            return res.status(404).json({
                message: `Password incorrecta`,
                ok: false
            });
        }

        res.status(200).json({
            userLogin,
            ok: true
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al hacer login ' + error,
            ok: false
        });
    }
}

module.exports = {
    login,
}