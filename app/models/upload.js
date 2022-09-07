const mongoose = require('mongoose')

const UploadScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
    },
    {
        versionKey: false,  // deshabilitar el __v que envia mongo por defecto 
        timestamps: true    // guarda por defecto fecha de creacion y fecha de actualizacion
    }
)

// al igual que en MySQL, al modelo se le debe poner nombre, en este caso 'user'
module.exports = mongoose.model('upload', UploadScheme)