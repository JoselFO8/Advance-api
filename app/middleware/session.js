const { handleHttpError } = require("../utils/handleError")
const { verifyToken } = require("../utils/handleJwt")
const userModel = require("../models/users")

const authMiddleware = async (req, res, next) => {
    try {
        // Se debe capturar el token
        if(!req.headers.authorization) { // Si en la peticion, no existe el token
            handleHttpError(res, "NOT_TOKEN", 401)
        }

        const token = req.headers.authorization.split(' ').pop()

        // Verificacion del payload JWT
        const dataToken = await verifyToken(token)

        if(!dataToken._id) {
            handleHttpError(res, "NOT_PAYLOAD_DATA", 401)
            return
        }

        const query = {
            _id: dataToken._id
        }
        
        const user = await userModel.findOne(query)
        // NOTA: Se inyecta al req para que desde el controller se pase el argumento 
        req.user = user

        next()

    } catch (error) {
        handleHttpError(res, "SESSION_REQUIRED", 401)
    }
}

module.exports = authMiddleware