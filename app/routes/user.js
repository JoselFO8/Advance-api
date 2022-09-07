const express = require('express')

const {ValidatorInserData} = require("../validators/user.js")

// Exporta todos los metodos desde controllers/user 
const controller = require('../controllers/user.js')

const router = express.Router()

// const path = 'user'

// router.get(
//     `${path}/`,
    // Esta logica ↓ hacerla desde otra dependencia
    // (req, res) => {
    //     res.send({a: 1})    
    // }
// )

// router.get(
//     `/${path}`, controller.getData // Con la configuracion de index, ya no es necesario dejar el path
// )

/**
 * Ruta: /user GET
 */
router.get(
    `/`, controller.getData
)

router.post(
    `/`, ValidatorInserData, controller.inserData
)

router.post(
    `/bulk`, ValidatorInserData, controller.inserManyData
)

router.put(
    `/:id`, controller.updateSingle
)

router.delete(
    `/:id`, controller.deleteSingle
)

module.exports = router