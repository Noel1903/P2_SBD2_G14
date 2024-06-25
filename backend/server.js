const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const author = require('./routes/author');
const book = require('./models/book');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 5000;

        this.paths = {
            author: '/api/author',
            user: '/api/user',
            cart: '/api/cart',
            auth: '/api/auth',
            purchases: '/api/purchases',
            books: '/api/books',
            reviews: '/api/reviews'
        }

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y Parseo del body
        this.app.use(express.json({ limit: '20mb' }));
        this.app.use(express.urlencoded({ limit: '20mb', extended: true }));
    }

    routes() {
        this.app.use(this.paths.author, author);
        this.app.use(this.paths.user, require('./routes/user'));
        this.app.use(this.paths.cart, require('./routes/cart'));
        this.app.use(this.paths.auth, require('./routes/auth'));
        this.app.use(this.paths.purchases, require('./routes/purchases'));
        this.app.use(this.paths.books, require('./routes/book'));
        this.app.use(this.paths.reviews, require('./routes/review'));
    }

    listen() {
        mongoose
            .connect(process.env.MONGO_URI)
            .then(() => {
                console.log('Conectado a la base de datos MongoDBAtlas');
            })
            .catch((err) => {
                console.log('Error al conectarse a la base de datos', err);
            });
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;