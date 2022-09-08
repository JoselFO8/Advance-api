const { default: mongoose } = require('mongoose')
const userModel = require('../models/users.js')

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
    const data = await userModel.paginate({

    }, options, (error, docs) => {
        res.send({
            users: docs.docs
        })
    })
}

exports.getDataByID = async (req, res) => {
    const {id} = req.params
    // console.log('id', id);
    // const data = await userModel.find({
        // name: id
    // const data = await userModel.find({_id: id})
    const data = await userModel.findById(id)
    res.send({user: data})
    // .exec()
    // const data = await userModel.find({ name: id });
    // console.log(data);
    // data.map(doc => doc.name).sort()
}


/**
 * Insertar DATA de usuarios
 */
// exports.inserData = async (req, res) => {
//     const dataUser = req.body
//     console.log('typeof', typeof dataUser, dataUser);
//     const data = await userModel.create(dataUser, (error, docs) => { // Crear el documento en la db
//         if(error) {
//             res.send({ error: 'Error' }, 422)
//         }
//         res.send({ data: docs })
//     })
// }

exports.inserData = async (req, res) => {
    const dataUser = req.body
    // const data = await userModel.create(dataUser, (error, docs) => { // Crear el documento en la db
    //     if(error) {
    //         res.send({ error: 'Error' }, 422)
    //     }
    //     res.send({ data: docs })
    // })
    const data = await userModel.create(dataUser)
    res.send({data})
}

/**
 * Insertar muchos docs de usuarios
 */
 exports.inserManyData = async (req, res) => {
    const dataUsers = req.body
    const data = await userModel.insertMany(dataUsers, (error, docs) => { // Crear el documento en la db
        if(error) {
            res.send({ error: 'Error' }, 422)
        }
        res.send({ data: docs })
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