const { response } = require('express');
const Author = require('../models/author');
const { uploadImage } = require('../helpers/upload-files');

const createAuthor = async(req, res = response) => {
    const { name, biography, photoProfile, booksList} = req.body;
    
    Author(req.body);
    try {

        let urlImage = '';
        const authorExists = await Author.findOne({ name });
        
        if (authorExists) {
            return res.status(404).json({
                message: `Ya existe un autor con el nombre ${name}`,
                ok: false
            });
        }


        if (photoProfile && photoProfile != '') {
            const uploadImg = await uploadImage(photoProfile, true);

            if (!uploadImg.ok) {
                return res.status(404).json({
                    message: `Error al subir foto usuario ${ uploadImage.error }`,
                    ok: false
                });
            }

            urlImage = uploadImg.data.Location;
        }

        const author = new Author({
            name,
            biography,
            photoProfile: urlImage,
            booksList
        });


        await author.save();
        res.json({
            ok: true,
            message: 'Autor creado correctamente',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error  al crear al autor'
        });
    }
    
}

const getAuthors = async(req, res = response) => {
    const authors = await Author.find();
    res.json({
        authors
    });
}

const getAuthor = async(req, res = response) => {
    const id = req.params.id;
    const author = await Author.findById(id);
    if (!author) {
        return res.status(404).json({
            message: 'Autor no encontrado'
        });
    }else{
        res.json({
            author
        });
    
    }
}


const deleteAuthor = async(req, res = response) => {
    const id = req.params.id;
    const author = await Author.findByIdAndDelete(id);
    if(!author){
        return res.status(404).json({
            message: 'Autor no encontrado'
        })
    }
    else{
        res.json({
            message: 'Autor eliminado correctamente'
        });
    }
}

module.exports = {
    createAuthor,
    getAuthors,
    getAuthor,
    deleteAuthor
}