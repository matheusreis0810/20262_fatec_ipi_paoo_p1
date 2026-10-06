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
    },
    RelatoConfirmado: (relato) => {
        const relatos = baseConsulta[relato.avistamentoId]['relatos']
        const relatoParaAtualizar = relatos.find(r => r.id === relato.id)
        relatoParaAtualizar.confirmacoes = relato.confirmacoes
    }
}
app.get("/avistamentos", (req, res) => {
    res.json(baseConsulta)
})

app.get("/avistamentos/:id", (req, res) => {
    const avistamento = baseConsulta[req.params.id]
    if(!avistamento){
        return res.status(404).json({ erro: "avistamento não encontrado" })
    }
    res.json(avistamento)
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