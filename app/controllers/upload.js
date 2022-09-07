const { default: mongoose } = require('mongoose')
const multer = require('multer')
const uploadModel = require('../models/upload.js')

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
const upload = multer({storage: storage})
exports.upload = upload.single('myFileJLF')


exports.getFile = (req, res) => {
    uploadModel.find(
        {},
        (error, docs) => {
            res.send({
                docsJLF: docs
            })
        }
    )
}

/**
 * Subir un archivo a la db 
 */
exports.uploadFile = (req, res) => {
    res.send({
        data: 'Archivo enviado'
    })
        
}
