
###Agregar un autor
POST http://localhost:5000/api/author
{
    "name": "",
    "biography": "",
    "photoProfile": "",
    "booksList": [Objects]

}
Respuesta Correcta:
{
    "ok":true,
    "message":"Autor creado correctamente"

}

Respuesta Incorrecta:
{
    "ok":false,
    "message":"Error al crear al autor"
}
---------------------------------------------------------------------------------

###Ver todos los autores
GET http://localhost:5000/api/author


Respuesta:
[
    {
        "_id": "",
        "name": "",
        "biography": "",
        "photoProfile": "",
        "booksList": []
    }, ...
]


---------------------------------------------------------------------------------
###ver un autor por id
GET http://localhost:5000/api/author/id

Respuesta Correcta:
{
    "_id": "",
    "name": "",
    "biography": "",
    "photoProfile": "",
    "booksList": []
}

Respuesta Incorrecta:
{
    "message": "Autor no encontrado"
}


------------------------------------------------------------------------------------
###Eliminar un autor por id
DELETE http://localhost:5000/api/author/id

Respuesta Correcta:
{
    "message": "Autor eliminado correctamente"
}

Respuesta Incorrecta:
{
    "message": "Autor no encontrado"
}
-------------------------------------------------------------------------------------