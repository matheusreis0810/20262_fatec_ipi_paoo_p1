const axios = require('axios')
const express = require('express')
const app = express()
app.use(express.json())

app.post("/eventos", (req, res) =>{
    const evento = req.body
    console.log(evento)
    axios.post('http://localhost:4000/eventos', evento)
    .catch((erro) => console.log(`Erro na porta 4000: ${erro}`))
    axios.post('http://localhost:4100/eventos', evento)
    .catch((erro) => console.log(`Erro na porta 4100: ${erro}`))
    return res.status(200).json({ msg: "ok" })
})

const port = 10000
app.listen(port, () => console.log(`Barramento. ${port}`))