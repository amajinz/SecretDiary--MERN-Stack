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
    }
})
//Model 

module.exports = Diary = mongoose.model('Diary', DiarySchema)