## Para poder ejecutar la API:
### NODE
1. ``npm install``
2. Crear un archivo con el nombre .env tomando como base el archivo .example.env, esto para poder setear las variables de entorno
3. ``node index.js`` o ``npm start`` para ejecutar estando en la carpeta ``backend``

`NOTA: TODAS LAS IMÁGENES QUE SE REQUIERAN PARA TODAS LAS PANTALLAS, DEBEN DE ENVIARSE EN BASE64`

### Agregar un autor
```
POST http://localhost:5000/api/author
```
#### Body request
```json
{
    "name": "",
    "biography": "",
    "photoProfile": imgbase64,
    "booksList": [Objects]

}
```
#### Response
```json
{
    "ok":true,
    "message":"Autor creado correctamente"

}
```

#### Response Error
```json
{
    "ok":false,
    "message":"Error al crear al autor"
}
```
---------------------------------------------------------------------------------

### Ver todos los autores
```
GET http://localhost:5000/api/author
```

#### Response
```json
[
    {
        "_id": "",
        "name": "",
        "biography": "",
        "photoProfile": "",
        "booksList": []
    }, ...
]
```

---------------------------------------------------------------------------------
### Ver un autor por id
```
GET http://localhost:5000/api/author/id
```
#### Response
```json
{
    "_id": "",
    "name": "",
    "biography": "",
    "photoProfile": "",
    "booksList": []
}
```

#### Response Error
```json
{
    "message": "Autor no encontrado"
}
```

------------------------------------------------------------------------------------
### Eliminar un autor por id
```
DELETE http://localhost:5000/api/author/id
```

#### Response
```json
{
    "message": "Autor eliminado correctamente"
}
```
#### Response Error
```json
{
    "message": "Autor no encontrado"
}
```
-------------------------------------------------------------------------------------

### Agregar un libro
```
POST http://localhost:5000/api/books
```
#### Body request

```json
{
    "Titulo": " ",
    "autor": " ",
    "descripcion": " ",
    "genero": " ",
    "fecha_publicacion": " ",
    "disponibilidad": false,
    "cantidad_stock": 0,
    "puntuacion_promedio": 0,
    "precio": 0.0,
    "imagen_url": imgbase64
}
```
#### Response

```json
{
    "ok": true,
    "message":"Libro creado correctamente"
}
```
#### Response Error

```json
{
    "ok": false,
    "message":"Error  al crear el libro"
}
```
```json
{
    "ok": false,
    "message":"Ya existe un libro con el titulo "
}
```
```json
{
    "ok": false,
    "message": "Error al subir foto libro "
}
```

### Obtener todos los libros
```
GET http://localhost:5000/api/books
```
#### Response

```json
{
  "books": [
    {
      "_id": "667b42ca94159d93b4179341",
      "Titulo": "Pensar Bien, Sentirse Bien",
      "autor": "Walter Riso",
      "descripcion": "Motivación mental",
      "genero": "Psicologia",
      "fecha_publicacion": "2024-06-04T00:00:00.000Z",
      "disponibilidad": true,
      "cantidad_stock": 6,
      "puntuacion_promedio": 90,
      "precio": 320,
      "imagen_url": "https://bd2-p2-g14-imagenes.s3.amazonaws.com/Perfil/ed023b44-eade-47d2-a1ea-27ad72626852.jpg",
      "__v": 0
    },...
  ]
}
```

### Obtener libro por id
```
GET http://localhost:5000/api/books/idBook
```
#### Response

```json
{
    "_id": "667b433994159d93b4179346",
    "Titulo": "Blanca Olmeda",
    "autor": "Lucila Gamero de Medina",
    "descripcion": "Novela",
    "genero": "Romance-Tragedia",
    "fecha_publicacion": "2024-06-03T00:00:00.000Z",
    "disponibilidad": true,
    "cantidad_stock": 19,
    "puntuacion_promedio": 92,
    "precio": 350,
    "imagen_url": "https://bd2-p2-g14-imagenes.s3.amazonaws.com/Perfil/ca071d9a-a285-451c-8090-2c8e59ae279a.jpg",
    "__v": 0
}
```

### Modificar libro por id
```
PUT http://localhost:5000/api/books/idBook
```

```json
{
  "id": "1kjhk21323kjh123",
  "Titulo": "panda2",
  "autor": "Autor del Libro",
  "descripcion": "descripcion del Libro",
  "genero": "genero del Libro",
  "fecha_publicacion": "2020-01-01",
  "disponibilidad": true,
  "cantidad_stock": 10,
  "puntuacion_promedio": 4.5,
  "precio": 20,
  "imagen_url": "https://images.creativefabrica.com/products/previews/2023/10/28/zhrUKHj1Z/2XNe1i5NQ9la6jcMRJZbqSHpycm-desktop.jpg"
}
```

### Eliminar libro por id
```
DELETE http://localhost:5000/api/books/idBook
```

----------------------------------------------------------------------------------

### Registro de Usuarios
```
POST http://localhost:5000/api/user
```
#### Body request
```json
{
    "name": "",
    "lastname": "",
    "email": "",
    "password": "",
    "address": "",
    "imgProfile": imgbase64,
    "telephone": "",
    "age": 51,
}
```
#### Response
```json
{
    "message": "Usuario creado exitosamente",
    "ok": true
}
```
#### Response Error
```json
{
    "message": "Ya existe un usuario con el email",
    "ok": false
}
```

```json
{
    "message": "Error al subir foto usuario",
    "ok": false
}
```
```json
{
    "message": "Error al crear usuario",
    "ok": false
}
```
---------------------------------------------------------------------------------

### Get Usuarios o Perfil
```
GET http://localhost:5000/api/user/profile/:id
```

#### Response
```json
{
    "userProfile": {
        "name": "Karla",
        "lastname": "Rodriguez",
        "email": "karla@gmail.com",
        "imgProfile": "https://bd2-p2-g14-imagenes.s3.amazonaws.com/Perfil/1273b73a-8505-4dd9-a686-38e69483745b.jpg",
        "role": 1,
        "status": true,
        "registrationDate": "2024-06-25T03:22:02.467Z",
        "uid": "667a37dad74086313bf5832f"
    },
    "ok": true
}
```
#### Response Error
```json
{
    "message": "No existe un usuario con el id",
    "ok": false
}
```

```json
{
    "message": "Error al obtener perfil de usuario",
    "ok": false
}
```

---------------------------------------------------------------------------------

### Update Perfil
```
PUT http://localhost:5000/api/user/profile
```

#### Body request
```json
{
    "name": "",
    "lastname": "",
    "email": "",
    "password": "",
    "address": "",
    "imgProfile": imgbase64,
    "telephone": "",
    "age": 51,
    "uid": ""
}
```

#### Response
```json
{
    "message": "Usuario actualizado exitosamente",
    "user": {
        "name": "Miguel Angel",
        "lastname": "Garcia",
        "email": "miguel@gmail.com",
        "imgProfile": "https://bd2-p2-g14-imagenes.s3.amazonaws.com/Perfil/cef6a5e8-89be-4779-bf38-fa48eff567c3.jpg",
        "address": "Mixco, Guatemala",
        "telephone": "52874135",
        "role": 1,
        "status": true,
        "registrationDate": "2024-06-25T03:29:07.559Z",
        "age": 25,
        "uid": "667a39836ce522783b8085ec"
    },
    "ok": true
}
```
#### Response Error
```json
{
    "message": "No existe un usuario con el id",
    "ok": false
}
```

```json
{
    "message": "Ya existe un usuario con el email",
    "ok": false
}
```

```json
{
    "message": "Error al subir foto usuario",
    "ok": false
}
```

```json
{
    "message": "Error al actualizar usuario",
    "ok": false
}
```

---------------------------------------------------------------------------------
#### Enviar datos al carrito

POST http://localhost:5000/api/cart
#### Body request
```json
{
    "userId": "667a5b2c5f6063f208ef3d9b",
    "book": "667b449694159d93b4179354",
    "quantity": 3
}
```
#### Response
```json
{
  "message": "Libro añadido al carrito correctamente"
}
```
#### Response Error
```json
{
  "message": "Error al añadir al carrito"
}
```
----------------------------------------------------------
#### Obtener datos del carrito
GET http://localhost:5000/api/cart/:id(usuario)

```json
{
    "userId": "667a5b2c5f6063f208ef3d9b",
    "cart": [
        {
            "idItem": "667b7b2cca39e78654463661",
            "nombre": "Blanca Olmeda",
            "price": 350,
            "quantity": 2
        },
        {
            "idItem": "667b86fcc7e699b038588d0c",
            "nombre": "El Cuervo",
            "price": 125.34,
            "quantity": 3
        }
    ],
    "totalQuantity": 5,
    "totalPrice": 1076.02
}
```
-------------------------------------------------------
#### Eliminar un dato del carrito
DELETE http://localhost:5000/api/cart/:id_carrito
#### Response
```json
{
    "message": "Libro eliminado correctamente"
}
```

#### Response Error
```json
{
    "message": "Libro no encontrado"
}
```
---------------------------------------------------------------------------------------


#### Agregar pedido o compra
POST http://localhost:5000/api/purchases

En el array cart van los id de los items del carrito

#### Body request
```json
{
    "userId" : "667b52d32457ecb57eba311f",
    "cart": [
        "667b9832dc6877fe75e5aff9",
        "667b985cdc6877fe75e5affd"
    ],
    "totalQuantity": 6,
    "totalPrice": 1059,
    "address":"San José Pinula, Guatemala",
    "payment":"Efectivo",
    "status" : 0
}
```

#### Response
```json
{
    "message": "Compra realizada correctamente"
}
```

#### Para este 0 = en proceso , 1 = Enviado , 2 = Entregado
--------------------------------------------------------------------------------------------------
#### Obtener todos los pedidos o compras
GET http://localhost:5000/api/purchases
```json
{
  "ListPurchases": [
    {
      "id": "667b8edbbeb288438b9f25e0",
      "userId": "667a5b2c5f6063f208ef3d9b",
      "cart": [
        {
          "idBook": "667b45cb94159d93b417935b",
          "book": "Libro Edit Imagen"
        },...
      ],
      "totalQuantity": 5,
      "totalPrice": 1076.02,
      "address": "12 av 23-85 Z10, Guatemala",
      "payment": "Efectivo",
      "status": 0
    },...
  ]
}
```
-------------------------------------------------------------------------------------
#### Obtener todos los pedidos o compras por Usuario
```
GET http://localhost:5000/api/purchases/idUser
```

```json
{
  "ListPurchases": [
    {
      "id": "667b8edbbeb288438b9f25e0",
      "userId": "667a5b2c5f6063f208ef3d9b",
      "cart": [
        {
          "idBook": "667b45cb94159d93b417935b",
          "book": "Libro Edit Imagen"
        },...
      ],
      "totalQuantity": 5,
      "totalPrice": 1076.02,
      "address": "12 av 23-85 Z10, Guatemala",
      "payment": "Efectivo",
      "status": 0
    },...
  ]
}
```

----------------------------------------------------------------------------------------------
#### Actualizar estado de compra
PUT http://localhost:5000/api/purchases
#### Body request
```json
{
  "id": "667aecc32fb185e93f8a07ec",
  "status": 1
}
```
#### Response
```json
{
  "message": "Compra actualizada correctamente"
}
```

#### Response Error
```json
{
  "message": "No existe la compra"
}
```

----------------------------------------------------------------

### Get Top Libros
```
GET http://localhost:5000/api/report
```

El id que se devuelve NO es del libro, es del item de la colección statistics

#### Response
```json
{
    "reportBook": [
        {
            "bookName": "El Cuervo",
            "quantity": 5,
            "id": "667b951762d8c7d0e2667997"
        },
        {
            "bookName": "Pensar Bien, Sentirse Bien",
            "quantity": 4,
            "id": "667b95e062d8c7d0e26679a7"
        },
        {
            "bookName": "Libro Edit 4",
            "quantity": 4,
            "id": "667b98b3dc6877fe75e5b00d"
        }
    ]
}
```
#### Response Error
```json
{
    "message": "Error al obtener el top de libros",
    "ok": false
}
```
---------------------------------------------------------------------------------------

### Crear una reseña de libro
```
POST http://localhost:5000/api/reviews
```

#### Body request

```json
{
    "IdUser" : "32145454362632",
    "IdBook": "667b45cb94159d93b417935b",
    "review" : "Este es una review",
    "rating" : 5
}
```
#### Response

```json
{
    "ok" : true,
    "message" : "Reseña creada correctamente"
}
```

---------------------------------------------------------------------------
### Obtener reseñas de libro
```
GET http://localhost:5000/api/review/idBook
```

#### Response

```json
{
  "reviews": [
    {
      "_id": "667ce803c9e03729b5474c6f",
      "IdUser": "32145454362632",
      "IdBook": "667b45cb94159d93b417935b",
      "review": "Este es una review",
      "rating": 5,
      "__v": 0
    },
    {
      "_id": "667ce943c9e03729b5474c76",
      "IdUser": "rth89498jinf9u",
      "IdBook": "667b45cb94159d93b417935b",
      "review": "Este es una review 2",
      "rating": 4.5,
      "__v": 0
    }
  ]
}
```


### Consultas MongoDB

### Obtener la colección completa

### Authors
```javascript
db.authors.find()
db.authors.findOne({ _id: ObjectId("author_id") })
db.authors.updateOne(
    { _id: ObjectId("author_id") },
    { $set: { field: "new_value" } }
)
db.authors.deleteOne({ _id: ObjectId("author_id") })


```


### Books
```javascript
db.books.find()
db.books.findOne({ _id: ObjectId("book_id") })
db.books.updateOne(
    { _id: ObjectId("book_id") },
    { $set: { field: "new_value" } }
)
db.books.deleteOne({ _id: ObjectId("book_id") })


```

### Carts
```javascript
db.carts.find()
db.carts.findOne({ _id: ObjectId("cart_id") })
db.carts.updateOne(
    { _id: ObjectId("cart_id") },
    { $set: { field: "new_value" } }
)
db.carts.deleteOne({ _id: ObjectId("cart_id") })


```


### Purchases
```javascript
db.purchases.find()
db.purchases.findOne({ _id: ObjectId("purchase_id") })

```

### Reviews
```javascript
db.reviews.find()
db.reviews.findOne({ _id: ObjectId("id_book") })

```

### Stadistics
```javascript
db.statistics.find()
```

### Users
```javascript
db.users.find()
db.users.findOne({ _id: ObjectId("user_id") })
db.users.updateOne(
    { _id: ObjectId("user_id") },
    { $set: { field: "new_value" } }
)
db.users.deleteOne({ _id: ObjectId("user_id") })
```

