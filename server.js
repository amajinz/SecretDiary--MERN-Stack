const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const config = require('./config/keys')


const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

//Routes
app.use('/api/diaries', require('./routes/api/diaries'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))



//Database
const dbURI = config.MONGODB_URI
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
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