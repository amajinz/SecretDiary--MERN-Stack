const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require("body-parser");
const cors = require('cors')
const path = require('path')
const diaries = require('./routes/api/diaries')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('tiny'))
app.use('/api/diaries', diaries)



//Database
const dbURI = require('./config/keys').MONGODB_URI
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => { console.log('Mongoose is connected.') })
    .catch(err => console.log(err)
    )

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 8080
app.listen(PORT, console.log(`Server is running at port: ${PORT}`))