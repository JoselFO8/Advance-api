const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const UserScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        avatar: {
            type: String,
            default: 'http://image.com'
        },    
        email: {
            type: String,
            unique: true, // Para que no se repita
            required: true, // Debe enviarse obligatoriamente
        }
    },
    {
        versionKey: false,  // deshabilitar el __v que envia mongo por defecto 
        timestamps: true    // guarda por defecto fecha de creacion y fecha de actualizacion
    }
)

// Llamar al schema y aplicarle el plugin para que pagine // Configurar en controllers
UserScheme.plugin(mongoosePaginate) 

// al igual que en MySQL, al modelo se le debe poner nombre, en este caso 'user'
module.exports = mongoose.model('user', UserScheme)