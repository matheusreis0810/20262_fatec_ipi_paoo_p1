const express = require('express')
const app = express()
app.use(express.json())

const baseConsulta = {}

const funcoes = {
    AvistamentoCriado: (avistamento) => {
        avistamento.relatos = [] 
        baseConsulta[avistamento.id] = avistamento
    },
    RelatoCriado: (relato) => {
        const relatos = baseConsulta[relato.avistamentoId]['relatos'] || []
        relatos.push(relato)
        baseConsulta[relato.avistamentoId]['relatos'] = relatos
    }
}
app.get("/avistamentos", (req, res) => {
    res.json(baseConsulta)
})

app.post("/eventos", (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados)
    }
    catch (erro) {}
    return res.status(200).json({ msg: "ok" })
})

const port = 4200
app.listen(port, () => console.log(`Consulta. Porta ${port}.`))