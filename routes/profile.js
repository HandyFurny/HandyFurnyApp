const express               = require('express');
const router                = express.Router();
const User                  = require('../models/User')
const Item                  = require('../models/Item')
const multer                = require ('multer');
const upload                = multer  ({  dest: './public/uploads'});
const { ensureLoggedIn }    = require('connect-ensure-login');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

router.get('/:id/edit', ensureLoggedIn('/'),  (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err)       { return next(err) }
    if (!user)  { return next(new Error("404")) }
    return res.render('user/edit', { user })
  });
});
router.get('/:id', ensureLoggedIn('/'), (req, res, next) => {

    User.findById(req.params.id)
      .then(user => {
        Item.find({_creator:req.params.id})
          .then(items => {
            res.render("user/profile",{user,items})
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
    
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

  User.findByIdAndUpdate(req.params.id, updates, (err, user) => {
    if (err) {
      return res.redirect('/user/'+req.params.id+'/edit')
    }
    if (!user) {
      return next(new Error('404'));
    }
    return res.redirect('/user/'+req.params.id);
  });
});

router.post('/:id/delete', (req, res, next) => {
const id = req.params.id;

User.findByIdAndRemove(id, (err, user) => {
  if (err){ return next(err); }
  return res.redirect('/');
});

});

 
  module.exports = router;
  