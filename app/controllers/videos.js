// const { default: mongoose } = require('mongoose')
const videoModel = require('../models/videos.js')
const { handleHttpError } = require('../utils/handleError.js')
const path = require('path')
const fs = require("fs-extra")

const multer = require('multer')
const cloudinary = require("cloudinary")

// Multer - Subida de archivos
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'storage/uploads'),
    filename: (req, file, cb) => { // El nombre sera el propiio del archivo + la fecha, para evitar que se reemplace
        console.log(file);
        // cb(null, file.fieldname + '-' + Date.now())
        // cb(null, `${Date.now()}-${file.originalname}`)
        cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
    
})
const upload = multer({storage})
exports.upload = upload.single('videoFile')


// Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


/**
 * Tomar todos los archivos existentes en storage 
 * @param {*} req 
 * @param {*} res 
 */
exports.getFiles = (req, res) => {
    try {
        // videoModel.find(
        //     {},
        //     (error, docs) => {
        //         res.send({
        //             docsJLF: docs
        //         })
        //     }
        // ) 
        res.render('upload')  
    } catch (error) {
        handleHttpError(res, "ERROR_GET_FILES")
    }
}

/**
 * Subir un archivo a la db 
 * @param {*} req 
 * @param {*} res 
 */
exports.uploadFile = async (req, res) => {
    const { title, description} = req.body
    console.log('req_file', req.file);
    console.log('req_body', req.body);
    // Guardando video en Cloudinary // Videos superiores a 100 mb requieren metodo .upload_large
    try {
        const result = await cloudinary.v2.uploader.upload_large(req.file.path)
        // console.log(result);
        const newVideo = new videoModel({
            title, 
            description, 
            videoURL: result.url,
            public_id: result.public_id
        })
        await newVideo.save()
        console.log({newVideo});
        await fs.unlink(req.file.path)
        res.send({
            data: 'Archivo enviado'
        })
    } catch (error) {
        console.log(error);
        handleHttpError(res, "ERROR_UPLOAD_FILE")   
    }
    // res.send({
    //     data: 'Archivo enviado'
    // })
}

exports.getFileById = (req, res) => {
    try {
        videoModel.find(
            {},
            (error, docs) => {
                res.send({
                    docsJLF: docs
                })
            }
        )   
    } catch (error) {
        handleHttpError(res, "ERROR_GET_FILE_BY_ID")
    }
}

exports.deleteFileById = (req, res) => {
    try {
        // videoModel.find(
        //     {},
        //     (error, docs) => {
        //         res.send({
        //             docsJLF: docs
        //         })
        //     }
        // ) 
        res.send({
            data: 'Archivo eliminado'
        })  
    } catch (error) {
        handleHttpError(res, "ERROR_DELETE_FILE_BY_ID")
    }
}
