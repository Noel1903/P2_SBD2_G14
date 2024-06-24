const { response } = require('express');
const aws = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const configS3 = {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}

aws.config.update(configS3);
const s3 = new aws.S3();

const uploadImage = (img64, esPerfil) => {

    return new Promise((resolve, reject) => {
        const nombreImagen = uuidv4();
        const urlImagen = (esPerfil ? `Fotos_Perfil/${nombreImagen}.jpg` : `Libros/${nombreImagen}.jpg`)
        const bufferImagen = Buffer.from(img64, 'base64');

        const parametros = {
            Bucket: process.env.AWS_BUCKET,
            Key: urlImagen,
            Body: bufferImagen,
            ContentType: 'image'
        }

        s3.upload(parametros, (error, data = aws.S3.ManagedUpload.SendData) => {
            if (error) {
                reject({ msg: 'error', error });
            }

            resolve({ msg: 'ok', data });
        });
    });
}

module.exports = {
    uploadImage,
}