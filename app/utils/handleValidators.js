const { validationResult } = require("express-validator");

const validateResults = (req, res, next) => {
    // console.log(req);
    try {
        validationResult(req).throw()
        return next() // Si no hay error continua hacia el controlador
    } catch (error) {
        res.status(403)
        res.send({errors: error.array()})
    }
}
        
 module.exports = validateResults      