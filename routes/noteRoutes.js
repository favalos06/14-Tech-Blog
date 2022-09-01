const router = require('express').Router()
const {Post, User, Note} = require('../models')
const passport = require('passport')


router.get('/notes', passport.authenticate('jwt'), async function (req, res) {
  const notes = await Note.findAll({ include: [Post] })
  res.json(notes)
})

router.post('/notes', passport.authenticate('jwt'), async function (req, res) {
  const note = await Note.create(req.body)
  res.json(note)
})


module.exports = router