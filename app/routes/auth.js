const express = require("express");
const router = express.Router();

const { validatorRegister, validatorLogin } = require("../validators/auth.js");
const { registerControl, loginControl} = require("../controllers/auth.js");
const authMiddleware = require("../middleware/session.js");

const { getAllUsers } = require("../controllers/users.js");
const checkRol = require("../middleware/rol.js");

/**
 * Crear un registro
 */
router.post("/register", validatorRegister, registerControl) 

/**
 * Loguear usuario
 */
router.post("/login", validatorLogin, loginControl); // Pendiente midelwares

router.get(
    '/users',
    authMiddleware,
    checkRol(["admin", "manager"]),
    getAllUsers
)

module.exports = router;