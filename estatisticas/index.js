const express = require('express')
const app = express()
app.use(express.json())

const totais = {
    avistamentos: 0,
    relatos: 0,
    confirmacoes: 0
}
const locais = {}

const localPorAvistamentoId = {}
const ordemLocais = []

const funcoes = {
    AvistamentoCriado: (avistamento) => {
        localPorAvistamentoId[avistamento.id] = avistamento.local
        if(!locais[avistamento.local]){
            locais[avistamento.local] = { avistamentos: 0, relatos: 0, confirmacoes: 0 }
            ordemLocais.push(avistamento.local)
        }
        locais[avistamento.local].avistamentos++
        totais.avistamentos++
    },
    RelatoCriado: (relato) => {
        const local = localPorAvistamentoId[relato.avistamentoId]
        locais[local].relatos++
        totais.relatos++
    },
    RelatoConfirmado: (relato) => {
        const local = localPorAvistamentoId[relato.avistamentoId]
        locais[local].confirmacoes++
        totais.confirmacoes++
    }
}

app.get("/estatisticas", (req, res) => {
    res.json({ totais, locais })
})

app.get("/estatisticas/destaque", (req, res) => {
    if(ordemLocais.length === 0){
        return res.status(404).json({ erro: "sem dados" })
    }
    let localDestaque
    let maiorEngajamento = -1
    for(let local of ordemLocais){
        const engajamento = locais[local].relatos + locais[local].confirmacoes
        if(engajamento > maiorEngajamento){
            maiorEngajamento = engajamento
            localDestaque = local
        }
    }
    return res.json({ local: localDestaque, engajamento: maiorEngajamento })
})

app.post("/eventos", (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados)
    }
    catch (erro) {}
    return res.status(200).json({ msg: "ok" })
})

const port = 4300
app.listen(port, () => console.log(`Estatísticas. Porta ${port}.`))