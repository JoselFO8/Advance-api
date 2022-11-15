const express = require("express")

const app = express()

app.get("/", (req, res) => {
    res.send("Pagina de inicio")
})

module.exports = app