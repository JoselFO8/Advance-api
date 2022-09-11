const express = require('express')
const router = express.Router()

const controller = require('../controllers/upload.js')


/**
 * Ruta: /upload GET
 */
router.get(
    `/`, controller.getFile
)

/**
 * Ruta: /upload POST
 */
router.post(
    `/`,
    controller.upload, 
    controller.uploadFile
)

module.exports = router