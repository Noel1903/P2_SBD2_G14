const { response } = require('express');
const Author = require('../models/author');


const createAuthor = async(req, res = response) => {
    const author = Author(req.body);
    try {
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