const express = require("express");
const router = express.Router();

const { validatorRegister, validatorLogin } = require("../validators/auth.js");
const { registerControl, loginControl} = require("../controllers/auth.js");

/**
 * Crear un registro
 */
router.post("/register", validatorRegister, registerControl) 

/**
 * Loguear usuario
 */
router.post("/login", validatorLogin, loginControl); // Pendiente midelwares

module.exports = router;