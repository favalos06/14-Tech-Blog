const router = require('express').Router()
const {Post, User, Note} = require('../models')
const passport = require('passport')


router.get('/posts', passport.authenticate('jwt'), async function (req, res) {
  const posts = await Post.findAll({ include: [User] })
  res.json(posts)
})

router.get('/posts/:id', passport.authenticate('jwt'), async function (req, res) {
  const post = await Post.findOne({ where: {id: req.params.id}, include: [User, Note] })
  res.json(post)
})


router.post('/posts', passport.authenticate('jwt'), async function (req, res) {
  
  const post = await Post.create(
    {
      ...req.body,
      uid: req.user.id
    })
  res.json(post)
})

router.delete('/posts/:id', passport.authenticate('jwt'), async function(req, res) {
  const post = await Post.destroy({where: {id: req.params.id}})
  res.sendStatus(200)
})

router.put('/posts/:id', passport.authenticate('jwt'), async function(req, res) {
  const post = await Post.update(req.body, {where: {id: req.params.id}})
  res.json(post)
})




module.exports = router