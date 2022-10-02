const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const UserScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        age: {
            type: Number
        },
        avatar: {
            type: String,
            default: 'https://img.freepik.com/foto-gratis/retrato-estudio-hombre-moreno-confianza_1187-5799.jpg?w=2000'
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String,
            select: false
        },
        role: {
            type: ["user, admin"],
            default: "user"
        },    
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