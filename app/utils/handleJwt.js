const jwt = require("jsonwebtoken")

const users = require("../models/users")
const JWT_SECRET = process.env.JWT_SECRET

/**
 * Pasar el objeto del usuario
 * @returns 
 */
const tokenSign = async () => {
    const sign = await jwt.sign(
        { // Payload
            _id: users._id,
            role: users.role,
        }, 
        JWT_SECRET,
        {
            expiresIn: "2h",
        }
    )
    return sign
}

/**
 * Pasar el token de session JWT
 * @param {*} tokenJwt 
 * @returns 
 */
const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET)
    } catch (error) {
        return null
    }
}

module.exports = { tokenSign, verifyToken}