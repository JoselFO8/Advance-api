const express = require('express')
const router = express.Router()

const controller = require('../controllers/upload.js')

const path = 'upload'

/**
 * Ruta: /upload GET
 */
router.get(
    `/${path}`, controller.getFile
)
/**
 * Ruta: /upload POST
 */
router.post(
    `/${path}`,
    controller.upload, 
    controller.uploadFile
)

module.exports = router