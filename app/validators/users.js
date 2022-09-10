const { check } = require("express-validator");
const validateResults = require("../utils/handleValidators.js")

// Midelware - Validacion de datos

const ValidatorInserData = [
    check("name").exists().notEmpty().isLength({min: 3, max: 25}), // Exista esta propiedad, no este vacia, minimo 5 caracteres y maximo 90 caracteres
    // check("email").exists().notEmpty().isEmail(), //.isEmail()
    check("age").exists().notEmpty().isLength({min: 1, max: 3}),
    check("description").exists().notEmpty().isLength({min: 1, max: 30}),
    check("avatar").exists().notEmpty(),
    check("gender").exists().notEmpty().isLength({min: 1, max: 2}),
    // check("work").exists().notEmpty(),

    (req, res, next) => {
        // try {
        //     validatioResult(req).throw()
        //     return next()
        // } catch (error) {
        //     res.status(403)
        //     res.send({errors: error.array()})
        // }
        // Se va a hacer uso del aparatado de utils
        return validateResults(req, res, next)
    }
]

module.exports = {ValidatorInserData}