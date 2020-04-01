require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Player = require('./models/players')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))




app.get('/players', (req, res) => {
    Player.find({}).then(data => {
        res.send(data)
    })
})

app.delete('/players/:id', (req, res) => {
    Player.findByIdAndRemove(req.params.id)
        .then(data => {
            res.status(204).end()
        })
})

app.post('/players', (req, res) => {
    const body = req.body

    const newPlayer = new Player({
        name: body.name,
        club: body.club,
        important: false
    })

    newPlayer.save().then(data => {
        res.send(data)
    })
})

app.put('/players/:id', (req, res) => {
    const body = req.body
    const newPlayer = {
        id: body.id,
        name: body.name,
        club: body.club,
        important: body.important
    }

    Player.findByIdAndUpdate(req.params.id, newPlayer, { new: true })
        .then(updated => {
            res.send(updated)
        })
})

app.patch('/players/:id', (req, res) => {
    const body = req.body
    const newPlayer = { ...body, important: !body.important }

    Player.findByIdAndUpdate(req.params.id, newPlayer, { new: true })
        .then(newData => {
            res.send(newData)
        })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server running ong ${PORT}`)
})