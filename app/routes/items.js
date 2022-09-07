const express = require('express')

// Exporta todos los metodos desde controllers/user 
const controller = require('../controllers/items.js')

const router = express.Router()

const path = 'items'

/**
 * Ruta: /items GET
 */

router.get(
    `/${path}`, controller.getData
)

module.exports = router