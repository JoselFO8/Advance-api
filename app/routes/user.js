const express = require('express')

// Exporta todos los metodos desde controllers/user 
const controller = require('../controllers/user.js')

const router = express.Router()

const path = 'user'

/**
 * Ruta: /user GET
 */
// router.get(
//     `${path}/`,
    // Esta logica ↓ hacerla desde otra dependencia
    // (req, res) => {
    //     res.send({a: 1})    
    // }
// )

router.get(
    `/${path}`, controller.getData
)

router.post(
    `/${path}`, controller.inserData
)

// router.post(
//     `/${path}`, controller.inserManyData
// )

router.put(
    `/${path}/:id`, controller.updateSingle
)

router.delete(
    `/${path}/:id`, controller.deleteSingle
)

module.exports = router