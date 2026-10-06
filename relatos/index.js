const express = require('express')
const {v4: uuidv4} = require('uuid')
const app = express()
app.use(express.json())

const relatosPorAvistamentoId = {}

app.post("/eventos", (req, res) =>{
    const evento = req.body
    console.log(evento.tipo)
    return res.status(200).json({ msg: "ok" })
})

app.put('/avistamentos/:id/relatos', (req, res) => {
    const idRelato = uuidv4()
    const { texto } = req.body
    const relato = {
        id: idRelato,
        texto: texto,
        confirmacoes: 0
    }
    const relatos = relatosPorAvistamentoId[req.params.id] || []
    relatos.push(relato)
    relatosPorAvistamentoId[req.params.id] = relatos

    return res.status(201).json(relatos)
})

app.get('/avistamentos/:id/relatos', (req, res) => {
    res.json(relatosPorAvistamentoId[req.params.id] || []) 
})


const port = 4100
app.listen(port, () => console.log(`Relatos. Porta ${port}.`))