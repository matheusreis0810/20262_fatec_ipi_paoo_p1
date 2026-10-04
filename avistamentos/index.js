const express = require('express')
const app = express()
app.use(express.json())

const avistamentos = {}
let contador = 0

app.get("/avistamentos", function(req,res){
    res.json(avistamentos)
})

app.put("/avistamentos", (req, res) => {
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
    return res.status(201).json({ id, local, descricao })
})

const port = 4000
app.listen(port, () => console.log(`Avistamentos. Porta ${port}`))