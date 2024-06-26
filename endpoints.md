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
POST http://localhost:5000/api/purchase
#### Body request
```json
{
  "userId" : "6679c33afa5d6c30225fa1e2",
  "cart": [
    {
      "_id": "667ae6a1d8e1ded5d82b71d3",
      "userId": "6679c33afa5d6c30225fa1e2",
      "name": "Libro 1",
      "price": 100,
      "quantity": 1,
      "__v": 0
    },
    {
      "_id": "667ae787d8e1ded5d82b71d6",
      "userId": "6679c33afa5d6c30225fa1e2",
      "name": "Libro 3",
      "price": 60,
      "quantity": 1,
      "__v": 0
    }
  ],
  "totalQuantity": 2,
  "totalPrice": 160,
  "address":"12 av 23-85 Z10, Guatemala",
  "payment":"Efectivo",
  "status" : 0
}
```
#### Para este 0 = en proceso , 1 = Enviado , 2 = Entregado
--------------------------------------------------------------------------------------------------
#### Obtener todos los pedidos o compras
GET http://localhost:5000/api/purchase
```json
{
  "purchases": [
    {
      "_id": "667aecc32fb185e93f8a07ec",
      "userId": "6679c33afa5d6c30225fa1e2",
      "cart": [
        {
          "_id": "667ae6a1d8e1ded5d82b71d3",
          "userId": "6679c33afa5d6c30225fa1e2",
          "name": "Libro 1",
          "price": 100,
          "quantity": 1,
          "__v": 0
        },
        {
          "_id": "667ae787d8e1ded5d82b71d6",
          "userId": "6679c33afa5d6c30225fa1e2",
          "name": "Libro 3",
          "price": 60,
          "quantity": 1,
          "__v": 0
        }
      ],
      "totalQuantity": 2,
      "totalPrice": 160,
      "address": "12 av 23-85 Z10, Guatemala",
      "payment": "Efectivo",
      "status": 0,
      "__v": 0
    }
  ]
}
```
-------------------------------------------------------------------------------------
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