const cors = require("cors")
require("dotenv").config()

const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const initDB = require('./config/db_mongo.js')

// Initializations
const app = express()

// Settings
const port = process.env.PORT || 3001

const whiteList = [
    'http://localhost:4200'
]

// Midlewares
app.use(cors({origin: whiteList})) // Para dar permisos a algunas URL's
app.use(morgan('dev'));
app.use( // for parsing json
    bodyParser.json({
        limit: '20mb' // Limite de 20 megas por peticion
    })
)
app.use( // for parsing appication/x-www-form-urlencoded
    bodyParser.urlencoded({
        limit: '20mb', 
        extended: true
    })
)
app.use(express.json())
app.use("/", require("./app/routes")) // Muestra index

// Start the server
app.listen(port, () => {
    console.log(`La aplicacion esta corriendo en el puerto ${port}`);
})

initDB();
