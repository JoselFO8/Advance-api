const { matchedData } = require("express-validator") // Tomar solo las variables requeridas

const { encrypt, compare } = require("../utils/handlePasword")
const userModel = require("../models/users") 
const { tokenSign } = require("../utils/handleJwt")
const { handleHttpError } = require("../utils/handleError")

/**
 * Controlador encargado de registrar un usuario
 * @param {*} req 
 * @param {*} res 
 */
const registerControl = async (req, res) => {
    try {
        req = matchedData(req)
        const password = await encrypt (req.password)
        const body = {...req, password} //reemplazar el password por el encriptado
        const dataUser = await userModel.create(body)
        dataUser.set("password", undefined, {strict: false})

        // JWT
        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        res.status(201)
        res.send({data:data})

    } catch (error) {
        handleHttpError(res, "ERROR_REGISTER_USER")
    }
    
}

/**
 * Login de usuario
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const loginControl = async (req, res) => {
    try {
        req = matchedData(req)
        const user = await userModel.findOne({email: req.email})
        .select('password name role email')
        
        if(!user) {
            handleHttpError(res, "USER_NOT_EXIST", 404)
            return
        }

        const hashPassword = user.get('password')

        const check = await compare(req.password, hashPassword)

        if(!check) {
            handleHttpError(res, "PASSWORD_INVALID", 401)
            return
        }

        user.set("password", undefined, {strict: false}) // Para que no se muestre la contraseña
        // // JWT
        const data = {
            token: await tokenSign(user),
            user: user
        }

        res.send({
            data:data,
            error: false,
            msg: "Success Login",
        })

    } catch (error) {
        handleHttpError(res, "ERROR_LOGIN_USER")
    }
}

module.exports = { registerControl, loginControl }
