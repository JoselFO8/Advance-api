require("dotenv").config()

const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const initDB = require('./config/db_mongo.js')


const app = express()

const port = process.env.PORT || 3001

// Como ya se creo la primer ruta, no es necesario hacer uso de esta
// app.get('/', (req, res) => {
//     res.send({
//         data: 'Respuesta de prueba'
//     })
// })

// const userRouters =require('./app/routes/user.js')
// const itemsRouters =require('./app/routes/items.js')
// const uploadRouters =require('./app/routes/upload.js')

// App, use las rutas q se exportan desde este archivo
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
// app.use(userRouters)
// app.use(itemsRouters)
// app.use(uploadRouters)

app.listen(port, () => {
    console.log(`La aplicacion esta corriendo en el puerto ${port}`);
})

initDB();
