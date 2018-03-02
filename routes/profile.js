const express               = require('express');
const router                = express.Router();
const User                  = require('../models/User')
const Item                  = require('../models/Item')
const multer                = require ('multer');
const upload                = multer  ({  dest: './public/uploads'});
const { ensureLoggedIn }    = require ('connect-ensure-login');
const bcrypt                = require ('bcrypt');
const salt                  = bcrypt.genSaltSync(10);
const Review                = require ('../models/Review.js')
const {authorizeItem,checkOwnership}  = require ('../middlewares/currentUser.js')

router.get('/:id/edit', ensureLoggedIn('/'),  (req, res, next) => {
  User.findById(req.params.id)
    .then(user => res.render('user/edit', { user }))
    .catch(err => res.render('error'));
});

router.get('/:id', ensureLoggedIn('/'), (req, res, next) => {
    User.findById(req.params.id)
      .then(user => {
        Item.find({_creator:req.params.id})
          .then(items =>{
            Review.find({_userSeller:req.params.id})
              .then(reviews => {
                User.findById(req.user._id)
                .populate('favorite')
                .then(owner => {                
                  res.render("user/profile",{user,items,reviews, owner})
                })
                .catch(err => res.render('error'))                
              })
              .catch(err => res.render('error'))
          })
          .catch(err => res.render('error'));
      })
      .catch(err => res.render('error'));
});

router.post('/:id', ensureLoggedIn('/'), upload.single('userPic'), (req, res, next) => {
  const updates = {
    email       : req.body.email,
    username    : req.body.username,
    password    : bcrypt.hashSync(req.body.password, salt),
    profilePic  : `/uploads/${req.file.filename}`,
    location    : {
      type        : 'Point',
      coordinates : [req.body.latitud, req.body.longitud]
    }
  };
  User.findByIdAndUpdate(req.params.id, updates)
  .then(user => res.redirect('/user/'+req.params.id))
  .catch(err => res.render('error'));
});

router.post('/:id/delete', ensureLoggedIn('/'), (req, res, next) => {
User.findByIdAndRemove(req.params.id)
.then(() =>{
  Item.find({})
    .populate("_creator")
    .remove()
    .then(res.redirect('/'))
    .catch(err => res.render('error'))
  })
  .catch(err => res.render('error'))
});

module.exports = router;