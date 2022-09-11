const express = require('express')

const {ValidatorInserData} = require("../validators/users.js")

// Exporta todos los metodos desde controllers/user 
const controller = require('../controllers/users.js')
const authMiddleware = require('../middleware/session.js')
const checkRol = require('../middleware/rol.js')

const router = express.Router()

/**
 * Ruta: /user GET
 */
router.get(
    `/`, 
    authMiddleware,
    checkRol(["admin", "manager"]), // Si o si agregar despues de middleware de authorization
    controller.getAllUsers
)

/**
 * Ruta: /user GET
 */
 router.get(
    `/:id`,
    authMiddleware, 
    controller.getUserByID
)

/**
 * Ruta: /user POST
 */
router.post(
    `/`,
    authMiddleware,
    ValidatorInserData, 
    controller.createUser
)

/**
 * Ruta: /user/bulk POST
 */
router.post(
    `/bulk`,
    authMiddleware,
    controller.createManyUsers
)

/**
 * Ruta: /user/:id PUT
 */
router.put(
    `/:id`,
    authMiddleware,
    controller.updateUser
)

/**
 * Ruta: /user/:id DELETE
 */
router.delete(
    `/:id`, 
    authMiddleware,
    controller.deleteUser
)

module.exports = router