const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { uploadImage } = require('../helpers/upload-files');

const signUp = async(req, res = response) => {
    const { name, lastname, email, password, imgProfile, telephone, address } = req.body;
    const role = 1;

    try {

        const userExists = await User.findOne({ email });
        let urlImage = '';

        if (userExists) {
            return res.status(404).json({
                message: `Ya existe un usuario con el email ${email}`,
                ok: false
            });
        }

        if (imgProfile) {
            const uploadImg = await uploadImage(imgProfile, true);

            if (!uploadImg.ok) {
                return res.status(404).json({
                    message: `Error al subir foto usuario ${ uploadImage.error }`,
                    ok: false
                });
            }

            urlImage = uploadImg.data.Location;
        }

        const newUser = new User({
            name,
            lastname,
            email,
            password,
            role,
            imgProfile: urlImage,
            telephone: (telephone) ? telephone : '',
            address: (address) ? address : ''
        });

        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        newUser.password = bcryptjs.hashSync(password, salt);

        // Guardar en BD
        await newUser.save();

        res.status(200).json({
            message: 'Usuario creado exitosamente',
            ok: true
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear usuario ' + error,
            ok: false
        });
    }
}

module.exports = {
    signUp,
}