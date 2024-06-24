const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 5000;

        this.paths = {
            auth: '/api/auth'
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
        this.app.use(this.paths.auth, require('./routes/auth'));
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