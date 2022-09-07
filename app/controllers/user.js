const { default: mongoose } = require('mongoose')
const userModel = require('../models/user.js')

const options = {
    page: 1,
    limit: 3
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
exports.getData = (req, res) => {
    // Se le dice a modelo que traiga de colecciones '{}' los documentos que encuentre
    // model.find({ // email: 'correo@gmail.com' // Aqui se puede poner las condiciones => Queryes
    userModel.paginate({

    }, options, (error, docs) => {
        res.send({
            docsJLF: docs
        })
    })
}

/**
 * Insertar DATA de usuarios
 */
exports.inserData = (req, res) => {
    const data = req.body
    console.log('typeof', typeof data, data);
    userModel.create(data, (error, docs) => { // Crear el documento en la db
        if(error) {
            res.send({ error: 'Error' }, 422)
        }
        res.send({ data: docs })
    })
}

/**
 * Insertar muchos docs de usuarios
 */
 exports.inserManyData = (req, res) => {
     const data = req.body
     console.log('Esta entrando', data);
     console.log('Prueba parcer', parseJSON(data));
     const array = parseJSON(data)
    // const prueba = parse
    userModel.insertMany(data, (error, docs) => { // Crear el documento en la db
        if(error) {
            res.send({ error: 'Error' }, 422)
        }
        res.send({ dataJLF: docs })
    })
}

/**
 * Actualizar un user por ID
 */
exports.updateSingle = (req, res) => {
    const { id } = req.params
    const body = req.body
    // userModel.findOne({ _id: parseId(req.params.id)},
    userModel.updateOne(
        { _id: parseId(id)},
        body, // Segundo argumento, se indican datos a actualizar
        (error, docs) => {
            res.send({
                items: docs
            })
        }
    )
}

exports.deleteSingle = (req, res) => {
    const { id } = req.params
    // userModel.findOne({ _id: parseId(req.params.id)},
    userModel.deleteOne(
        { _id: parseId(id)},
        (error, docs) => {
            res.send({
                items: docs
            })
        }
    )
}

// Retorna un Json como:
// {
//     "data": {
//         "name": "camilo",
//         "avatar": "http://image.com",
//         "email": "camilo@gmail.com",
//         "_id": "63177ccb0766f506e835a527",   // ID
//         "__v": 0                             // 
//     }
// }