const { response } = require('express');
const Book = require('../models/book');
const { uploadImage } = require('../helpers/upload-files');

const createBook = async(req, res = response) => {
    const { Titulo, autor, descripcion, genero, fecha_publicacion, disponibilidad, cantidad_stock, puntuacion_promedio, precio, imagen_url} = req.body;
    
    Book(req.body);
    try {

        let urlImage = '';
        const bookExists = await Book.findOne({ Titulo });
        
        if (bookExists) {
            return res.status(404).json({
                message: `Ya existe un libro con el titulo ${Titulo}`,
                ok: false
            });
        }
        if (imagen_url && imagen_url != '') {
            const uploadImg = await uploadImage(imagen_url, true);

            if (!uploadImg.ok) {
                return res.status(404).json({
                    message: `Error al subir foto libro ${ uploadImage.error }`,
                    ok: false
                });
            }

            urlImage = uploadImg.data.Location;
        }

        const book = new Book({
            Titulo,
            autor,
            descripcion,
            genero,
            fecha_publicacion,
            disponibilidad,
            cantidad_stock,
            puntuacion_promedio,
            precio,
            imagen_url: urlImage
        });

        await book.save();
        res.json({
            ok: true,
            message: 'Libro creado correctamente',
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error  al crear el libro'
        });
    }
}


const getBooks = async(req, res = response) => {
    const books = await Book.find();
    res.json({
        books
    });
}

const getBookById = async(req, res = response) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
        return res.status(404).json({
            message: 'Libro no encontrado',
            ok: false
        });
    }
    res.json({
        book
    });

}


const updateBook = async(req, res = response) => {
    const { id } = req.params;
    const { Titulo, autor, descripcion, genero, fecha_publicacion, disponibilidad, cantidad_stock, puntuacion_promedio, precio, imagen_url} = req.body;
    try {
        let urlImage = '';
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({
                message: 'Libro no encontrado',
                ok: false
            });
        }
        if (imagen_url && imagen_url != '') {
            const uploadImg = await uploadImage(imagen_url, true);

            if (!uploadImg.ok) {
                return res.status(404).json({
                    message: `Error al subir foto libro ${ uploadImage.error }`,
                    ok: false
                });
            }

            urlImage = uploadImg.data.Location;
        }

        const newBook = {
            Titulo,
            autor,
            descripcion,
            genero,
            fecha_publicacion,
            disponibilidad,
            cantidad_stock,
            puntuacion_promedio,
            precio,
            imagen_url: urlImage
        }

        const bookUpdated = await Book.findByIdAndUpdate(id, newBook, { new: true });
        res.json({
            bookUpdated
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error al actualizar el libro'
        });
    }
}


const deleteBook = async(req, res = response) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({
                message: 'Libro no encontrado',
                ok: false
            });
        }
        await Book.findByIdAndDelete(id);
        res.json({
            message: 'Libro eliminado correctamente',
            ok: true
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error al eliminar el libro'
        });
    }
}

module.exports = {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
}
