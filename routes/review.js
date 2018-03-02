const express             = require ('express');
const { ensureLoggedIn }  = require ('connect-ensure-login');
const User                = require ('../models/User.js');
const Review              = require ('../models/Review.js');
const router              = express.Router();

router.get('/:id/review', ensureLoggedIn('/'),  (req, res, next) => {
  User.findById(req.params.id)
    .then(user => res.render('user/review', { user }))
    .catch(err => res.send('error'));
});

router.post('/:id/review', ensureLoggedIn('/'), (req, res, next)  =>{
  
  const newReview  = new Review({
    _owner        : req.user._id,
    _userSeller   : req.params.id,
    description   : req.body.description,
    rate          : req.body.rate
  });
  newReview.save()
    .then(()=>  res.redirect(`/user/${req.params.id}`))
    .catch(err => res.render('error'));
});

module.exports = router;