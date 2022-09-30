const { default: mongoose } = require('mongoose')
const multer = require('multer')
const uploadModel = require('../models/upload.js')
const { handleHttpError } = require('../utils/handleError.js')

// Pruebas Multer - Subida de archivos
const storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, 'storage') // va a guardar todos nuestros archivos en una carpeta que se llama 'uploads'
    },
    filename: function (req, file, cb) { // El nombre sera el propiio del archivo + la fecha, para evitar que se reemplace
        console.log(file);
        // cb(null, file.fieldname + '-' + Date.now())
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

// Ahora hay que decirle a la ruta que use esta const
const upload = multer({storage})
exports.upload = upload.single('myFileJLF')

/**
 * Tomar todos los archivos existentes en storage 
 * @param {*} req 
 * @param {*} res 
 */
exports.getFile = (req, res) => {
    try {
        uploadModel.find(
            {},
            (error, docs) => {
                res.send({
                    docsJLF: docs
                })
            }
        )   
    } catch (error) {
        handleHttpError(res, "ERROR_GET_FILE")
    }
}

/**
 * Subir un archivo a la db 
 * @param {*} req 
 * @param {*} res 
 */
exports.uploadFile = (req, res) => {
    try {
        res.send({
            data: 'Archivo enviado'
        })
    } catch (error) {
     handleHttpError(res, "ERROR_UPLOAD_FILE")   
    }
}
