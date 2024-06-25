const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { uploadImage } = require('../helpers/upload-files');

const signUp = async(req, res = response) => {
    const { name, lastname, email, password, imgProfile, telephone, address, age } = req.body;
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

        if (imgProfile && imgProfile != '') {
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
            address: (address) ? address : '',
            age: (age) ? age : 0
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

const getProfile = async(req, res = response) => {
    const { id } = req.params;

    try {
        const userProfile = await User.findById(id);

        if (!userProfile) {
            return res.status(404).json({
                message: `No existe un usuario con el id`,
                ok: false
            });
        }

        res.status(200).json({
            userProfile,
            ok: true
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener perfil de usuario ' + error,
            ok: false
        });
    }
}

const updateProfile = async(req, res = response) => {
    const { email, imgProfile, uid, ...resto } = req.body;

    try {

        const userUpdate = await User.findById(uid);
        let urlImage = '';

        if (!userUpdate) {
            return res.status(404).json({
                message: `No existe un usuario con el id`,
                ok: false
            });
        }

        let emailUser = userUpdate.email;

        if (emailUser != email) {
            const userExists = await User.findOne({ email });

            if (userExists) {
                return res.status(404).json({
                    message: `Ya existe un usuario con el email ${email}`,
                    ok: false
                });
            }

        }

        if (imgProfile || imgProfile != '') {
            const uploadImg = await uploadImage(imgProfile, true);

            if (!uploadImg.ok) {
                return res.status(404).json({
                    message: `Error al subir foto usuario ${ uploadImage.error }`,
                    ok: false
                });
            }

            urlImage = uploadImg.data.Location;
        } else {
            urlImage = userUpdate.imgProfile;
        }

        const object = { email, imgProfile: urlImage, ...resto }

        const newUser = await User.findByIdAndUpdate(uid, object, { new: true });

        res.status(200).json({
            message: 'Usuario actualizado exitosamente',
            user: newUser,
            ok: true
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar usuario ' + error,
            ok: false
        });
    }
}

module.exports = {
    signUp,
    getProfile,
    updateProfile,
}