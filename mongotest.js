const mongoose = require('mongoose')
const password = process.argv[2]

const url = `mongodb+srv://hello:${password}@cluster0-orhph.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

const playerSchema = new mongoose.Schema({
    name: String,
    club: String,
    important: Boolean
})

playerSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Player = mongoose.model('Player', playerSchema)

const player = new Player({
    name: 'test',
    club: 'testalso',
    important: false
})

player.save().then(data => {
    console.log(data)
    mongoose.connection.close()
})