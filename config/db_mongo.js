require("dotenv").config()
const mongoose = require('mongoose')

const { MONGO_HOST, MONGO_PASSWORD, MONGO_PORT, MONGO_USER} = process.env
const DB_URI_PROD = `mongodb://${{ MONGO_USER }}:${{ MONGO_PASSWORD }}@${{ MONGO_HOST }}:${{ MONGO_PORT }}`
const DB_URI = DB_URI_PROD || process.env.DB_URI_DEV 


// mongoose.connect('mongodb://localhost:27017/myapp'); DESDE la documentacion
// const DB_URI = `mongodb://localhost:27017/advance`

module.exports = () => {
    const connect = () => {
        console.log("DESDE db_mongo PROD", process.env.DB_URI_PROD, "MONGOPORT", MONGOPORT);
        // console.log("DESDE db_mongo DEV", process.env.DB_URI_DEV);
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