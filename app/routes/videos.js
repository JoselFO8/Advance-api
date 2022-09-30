const express = require('express')
const router = express.Router()

const controller = require('../controllers/videos.js')
const authMiddleware = require('../middleware/session.js')


/**
 * Ruta: /videos GET
 */
router.get(
    `/`, authMiddleware, controller.getFiles
)

/**
 * Ruta: /videos POST
 */
router.post(
    `/`,
    authMiddleware,
    controller.upload, 
    controller.uploadFile
)

/**
 * Ruta /videos/:id GET
 */
router.get(
    `/:id`, authMiddleware, controller.getFileById
)

/**
 * Ruta /videos/:id/delete GET
 */
router.get(
    `/:id/delete`, authMiddleware, controller.deleteFileById
)

module.exports = router