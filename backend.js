
const express = require("express")
const cors = require('cors')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const app = express()

app.use(express.json())
app.use(cors())

const Filme = mongoose.model("Filme", mongoose.Schema({
    titulo: { type: String },
    sinopse: { type: String }
}))

const usuarioSchema = mongoose.Schema ({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model("Usuario", usuarioSchema)

async function conectarAoMongo() {
    await mongoose.connect(`mongodb+srv://pedro:123_456@cluster0.vixpx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
}

app.get("/filmes", async (req, res) => {
    const filmes = await Filme.find()
    res.json(filmes) })

app.post("/filmes", async (req, res) => {
    //captura o que o usuario enviou
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    //montar um objeto de acordo com o modelo Filme
    const filme = new Filme({titulo: titulo, sinopse: sinopse})
    await filme.save()
    const filmes = await Filme.find()
    res.json(filmes)
})

app.post("/signup", async (req, res) => {
    const login = req.body.login
    const password = req.body.password
    const usuario = new Usuario({login: login, password: password})
    const respMongo = await usuario.save()
    console.log(respMongo)
    res.end()
})

app.listen(3000, () => {
    try {
        conectarAoMongo()
        console.log("server up and running e conexão ok");
    }
    catch (e) {
    console.log('erro na conexão', e)
    }}
)
