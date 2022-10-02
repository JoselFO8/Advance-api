const mongoose = require('mongoose')

const VideoScheme = new mongoose.Schema(
    {
        sampleImage: {
            type: String,
            default: 'https://i.postimg.cc/GtkHjSVq/Kids-4.jpg'
        },
        // video: { videoUrl ver abajo
        //     type: String
        // },
        title: {
            type: String
        },
        description: {
            type: String
        },
        chanel: {
            type: String
        },
        views: {
            type: Number,
            default: 0
        },
        date: {
            type: String
        },
        visibility: {
            type: String,
            // enum: 'public' | 'private',
            default: 'public'
        },
        comments: {
            type: Array,
            default: []
        },
        videoURL: {
            type: String
        },
        public_id: {
            type: String
        },
    },
    {
        versionKey: false,  // deshabilitar el __v que envia mongo por defecto 
        timestamps: true    // guarda por defecto fecha de creacion y fecha de actualizacion
    }
)

// al igual que en MySQL, al modelo se le debe poner nombre, en este caso 'user'
module.exports = mongoose.model('video', VideoScheme)