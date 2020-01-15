const mongoose = require('mongoose')
const Schema = mongoose.Schema


//Schema
const DiarySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: String,
    date: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

//Model 

module.exports = Diary = mongoose.model('Diary', DiarySchema)