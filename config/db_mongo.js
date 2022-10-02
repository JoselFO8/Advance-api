require("dotenv").config()
const mongoose = require('mongoose')

const DB_URI = process.env.DB_URI

// mongoose.connect('mongodb://localhost:27017/myapp'); DESDE la documentacion
// const DB_URI = `mongodb://localhost:27017/advance`

module.exports = () => {
    const connect = () => {
        mongoose.connect(
            DB_URI,
            {
                // Para evitar errores sin razón aparente de conexion
                keepAlive: true, 
                // No más opciones de advertencia de obsolescencia // Parsea la conexion
                useNewUrlParser: true, 
                useUnifiedTopology: true
            },
            (error) => {
                if(error) {
                    console.log('DB: ERROR!!', error)
                }
                else {
                    console.log('Conexion correcta!!');
                }
            }
        )
    }

    connect();
}