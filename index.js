const express = require ("express")
const cors = require ('cors')
const app = express()

app.use(express.json())
app.use(cors())

//get http://localhost:3000/oi
app.get("/oi", (req, res) => {
    res.send("oi")
})

let filmes = [
    {
        titulo: "Deadpool",
        sinopse: "Ex-militar e mercenário, Wade Wilson (Ryan Reynolds) é diagnosticado com câncer em estado terminal, porém encontra uma possibilidade de cura em uma sinistra experiência científica. Recuperado, com poderes e um incomum senso de humor, ele torna-se Deadpool e busca vingança contra o homem que destruiu sua vida."
    },
    {
        titulo: "Barbie",
        sinopse: "Excêntrica e individualista, Barbie é exilada da Barbieland por causa de suas imperfeições. Quando seu mundo natal está em perigo, Barbie retorna com o conhecimento de que o que a torna diferente também a torna mais forte."
    }
]

app.get("/filmes", (req, res) => {res.json(filmes)})

app.post("/filmes", (req,res) => {
    //captura o que o usuario enviou
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    //monta o objeto filme para incluir na base 
    const filme = {titulo: titulo, sinopse: sinopse}
    //adiciona um novo filme à lista de filmes
    filmes.push(filme)
    //mostra a base atualizada
    res.json(filmes)
})

app.listen(3000,()=>console.log("up and running"))