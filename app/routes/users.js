const express = require('express')

const {ValidatorInserData} = require("../validators/users.js")

// Exporta todos los metodos desde controllers/user 
const controller = require('../controllers/users.js')
const authMiddleware = require('../middleware/session.js')

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
    `/`, 
    authMiddleware, 
    controller.getAllUsers
)

/**
 * Ruta: /user GET
 */
 router.get(
    `/:id`, 
    controller.getUserByID
)

/**
 * Ruta: /user POST
 */
router.post(
    `/`,
    ValidatorInserData, 
    controller.createUser
)

/**
 * Ruta: /user/bulk POST
 */
router.post(
    `/bulk`,
    controller.createManyUsers
)

/**
 * Ruta: /user/:id PUT
 */
router.put(
    `/:id`,
    controller.updateUser
)

/**
 * Ruta: /user/:id DELETE
 */
router.delete(
    `/:id`, 
    controller.deleteUser
)

module.exports = router