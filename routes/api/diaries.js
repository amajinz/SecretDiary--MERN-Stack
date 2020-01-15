const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

//Diary Model
const Diary = require('../../models/Diary')

// @route Get api/diaries
// @desc Get All Items
// @access Private
router.get('/', auth, (req, res) => {
    Diary.find({})
        .sort({ date: -1 })
        .then(diaries => res.json(diaries))
        .catch(err => res.json(err))
})

// @route Post api/diaries
// @desc Create A Post
// @access Private
router.post('/', auth, (req, res) => {
    const newDiary = new Diary({
        title: req.body.title,
        body: req.body.body,
        // user: req.user
    })
    newDiary
        .save()
        .then(diary => res.json(diary))
        .catch(err => res.json(err))
})

// @route Delete api/diaries
// @desc Delete A Diary
// @access Public
router.delete('/:id/delete', auth, (req, res) => {
    Diary.findById(req.params.id)
        .then(item => { item.remove().then(() => res.json({ success: true })) })
        .catch(err => res.status(404).json({ success: false, message: "Item does not exist" }))

})

module.exports = router;