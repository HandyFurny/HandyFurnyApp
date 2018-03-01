const express             = require ('express');
const { ensureLoggedIn }  = require ('connect-ensure-login');
const User                = require ('../models/User.js');
const Review              = require ('../models/Review.js');
const router              = express.Router();

router.get('/:id/review', ensureLoggedIn('/'),  (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      console.log('estoy en review')
      res.render('user/review', { user })
    })
    .catch(err => res.send('error', { message: err }));
});

router.post('/:id/review', ensureLoggedIn('/'), (req, res, next)  =>{
  
  const newReview  = new Review({
    _owner        : req.user._id,
    _userSeller   : req.params.id,
    description   : req.body.description,
    rate          : req.body.rate
  });
  console.log('estoy llegando')
  newReview.save()
    .then(()=>{
      res.redirect(`/user/${req.params.id}`)
    })
    .catch(err => res.render('error',{ message:err }));
});

module.exports = router;