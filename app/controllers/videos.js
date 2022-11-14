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
        cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage})
exports.upload = upload.single('thisFile')


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
exports.getFiles = async (req, res) => {
    try {
        const videos = await videoModel.find()
        res.status(200).send({videos})  
    } catch (error) {
        console.log(error);
        handleHttpError(res, "ERROR_GET_FILES")
    }
}

/**
 * Subir un archivo a la db 
 * @param {*} req 
 * @param {*} res 
 */
exports.uploadFile = async (req, res) => {
    const { title, description, chanel, visibility} = req.body
    // const file = req.file    
    // Guardando video en Cloudinary // Videos superiores a 100 mb requieren metodo .upload_large // Luego agregar img tambien
    try {
        // const result = await cloudinary.v2.uploader.upload_large(req.file.path)
        const result = await cloudinary.v2.uploader.upload(
            req.file.path,
            { resource_type: "video", chunk_size: 40000000 }
        )
        const newVideo = new videoModel({
            title, 
            description,
            chanel,
            visibility,
            videoURL: result.url,
            public_id: result.public_id,
        })
        await newVideo.save()
        await fs.unlink(req.file.path)
        res.send({
            data: 'Archivo enviado'
        })
    } catch (error) {
        console.log(error);
        handleHttpError(res, "ERROR_UPLOAD_FILE")   
    }
}

exports.getFileById = async (req, res) => {
    try {
        const {id} = req.params
        console.log({id});
        const data = await videoModel.findById(id)
        console.log({data});
        res.send({video: data})    
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
