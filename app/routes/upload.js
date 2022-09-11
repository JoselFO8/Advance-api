const express = require('express')
const router = express.Router()

const controller = require('../controllers/upload.js')
const authMiddleware = require('../middleware/session.js')


/**
 * Ruta: /upload GET
 */
router.get(
    `/`, authMiddleware, controller.getFile
)

/**
 * Ruta: /upload POST
 */
router.post(
    `/`,
    authMiddleware,
    controller.upload, 
    controller.uploadFile
)

module.exports = router