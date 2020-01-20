const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

// Diary Model
const Diary = require('../../models/Diary')

// @route Get api/diaries
// @desc Get All diaries
// @access Private
router.get('/', auth, (req, res) => {
  Diary.find({ user: req.user.id })
    .sort({ date: -1 })
    .then(diaries => res.json(diaries))
    .catch(err => res.status(400).json(err))
})

// @route get api/diary
// @desc get A Diary
// @access Private
router.get('/:id/view', auth, (req, res) => {
  Diary.findById(req.params.id)
    .then(diary => res.json(diary))
    .catch(err => res.status(404).json({ success: false, message: err }))
})

// @route Post api/diaries
// @desc Create A Post
// @access Private
router.post('/new', auth, (req, res) => {
  const newDiary = new Diary({
    title: req.body.title,
    body: req.body.body,
    user: req.user.id
  })
  newDiary
    .save()
    .then(diary => res.json(diary))
    .catch(err => res.status(400).json(err))
})

// @route Update api/diary
// @desc Update A Diary
// @access Private
router.put('/:id/update', auth, (req, res) => {
  Diary.findByIdAndUpdate(req.params.id, req.body)
    .then(diary => res.json(diary))
    .catch(err => res.status(400).json(err))
})

// @route Delete api/diaries
// @desc Delete A Diary
// @access Public
router.delete('/:id/delete', auth, (req, res) => {
  Diary.findById(req.params.id)
    .then(diary => {
      diary.remove().then(() => res.json({ success: true }))
    })
    .catch(err =>
      res
        .status(404)
        .json({ success: false, message: 'Item does not exist', error: err })
    )
})

module.exports = router
