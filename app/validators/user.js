const { check } = require("express-validator");
const validateResults = require("../../utils/handleValidators.js")

// Midelware - Validacion de datos

const ValidatorInserData = [
    check("name").exists().notEmpty().isLength({min: 5, max: 90}), // Exista esta propiedad, no este vacia, minimo 5 caracteres y maximo 90 caracteres
    check("email").exists().notEmpty().isEmail(), //.isEmail()
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