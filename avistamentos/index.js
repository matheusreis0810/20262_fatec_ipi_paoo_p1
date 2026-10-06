const axios = require('axios')
const express = require('express')
const app = express()
app.use(express.json())

const avistamentos = {}
let contador = 0

app.post("/eventos", (req, res) =>{
    const evento = req.body
    console.log(evento.tipo)
    return res.status(200).json({ msg: "ok" })
})

app.get("/avistamentos", function(req,res){
    res.json(avistamentos)
})

app.put("/avistamentos", async(req, res) => {
    const local = req.body.local
    const descricao = req.body.descricao

    if(!local || !descricao){
        return res.status(400).json({ erro: "local e descricao são obrigatórios" })
    }

    contador++
    const id = contador
    const avistamento = {
        id: id,
        local: local,
        descricao: descricao
    }

    avistamentos[id] = avistamento
    await axios.post('http://localhost:10000/eventos', {
        tipo: 'AvistamentoCriado',
        dados: avistamento
    })
    return res.status(201).json({ id, local, descricao })
})

const port = 4000
app.listen(port, () => console.log(`Avistamentos. Porta ${port}`))