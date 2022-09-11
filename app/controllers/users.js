const { default: mongoose } = require('mongoose')
const userModel = require('../models/users.js')
const { handleHttpError } = require('../utils/handleError.js')

const options = {
    page: 1,
    limit: 6
}

/**
 * Metodo para transformar un string en un objeto (id 'en este caso') 
 */
const parseId = (id) => {
    return mongoose.Types.ObjectId(id)
}

const parseJSON = (data) => {
    return mongoose.Types.Array(data)
}

/**
 * Obtener DATA de usuarios
 */
exports.getData = async (req, res) => {
    // Se le dice a modelo que traiga de colecciones '{}' los documentos que encuentre
    // model.find({ // email: 'correo@gmail.com' // Aqui se puede poner las condiciones => Queryes
    
    try {
        // NOTA: Se inyectó el user a req desde middleware/sesion
        const user = req.user
        // const data = await userModel.find({})
        // res.send({data, user})

        const data = await userModel.paginate({}, options, (error, docs) => {
            res.send({
                users: docs.docs,
                user
            })
        })
    } catch (error) {
        handleHttpError(res, "ERROR_GET_USERS")
    }
}

exports.getDataByID = async (req, res) => {
    try {
        const {id} = req.params
        const data = await userModel.findById(id)
        res.send({user: data})    
    } catch (error) {
        handleHttpError(res, "ERROR_GET_USERS_BY_ID")
    }    
}

/**
 * Insertar DATA de usuarios
 * @param {*} req 
 * @param {*} res 
 */
exports.inserData = async (req, res) => {
    try {
        const dataUser = req.body
        const data = await userModel.create(dataUser)
        res.send({data})  
    } catch (error) {
        handleHttpError(res, "ERROR_CREATE_USER")
    }
}

/**
 * Insertar muchos docs de usuarios
 * @param {*} req 
 * @param {*} res 
 */
 exports.inserManyData = async (req, res) => {
    try {
        const dataUsers = req.body
        const data = await userModel.insertMany(dataUsers, (error, docs) => { // Crear el documento en la db
            if(error) {
                res.send({ error: 'Error' }, 422)
            }
            res.send({ data: docs })
        })    
    } catch (error) {
        handleHttpError(res, "ERROR_CREATE_MANY_USERS")
    }
    
}

/**
 * Actualizar un user por ID
 * @param {*} req 
 * @param {*} res 
 */
exports.updateUser = (req, res) => {
    try {
        const { id } = req.params
        const body = req.body
        userModel.updateOne(
            { _id: parseId(id)},
            body, // Segundo argumento, se indican datos a actualizar
            (error, docs) => {
                res.send({
                    items: docs
                })
            }
        )
    } catch (error) {
        handleHttpError(res, "ERROR_UPDATE_USER")
    }    
}

/**
 *  Borrar un usuario
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteUser = (req, res) => {
    try {
        const { id } = req.params
        userModel.deleteOne(
            { _id: parseId(id)},
            (error, docs) => {
                res.send({
                    items: docs
                })
            }
        )   
    } catch (error) {
        handleHttpError(res, "ERROR_DELETE_USER")
    }
}

