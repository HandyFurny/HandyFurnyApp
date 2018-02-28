const express             = require ('express');
const { ensureLoggedIn }  = require ('connect-ensure-login');
const User                = require ('../models/User.js');
const Review              = require ('../models/Review.js');
const router              = express.Router();


router.post('/new/:profile', ensureLoggedIn('/'), (req, res, next)  =>{
  const newReview  = new Review({
    ownerBuyer    : { type: Schema.Types.ObjectId, ref: 'User', required: true },
    _userSeller   : { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description   : { type: String, required: true },
    rate          : { type: Number, required: true },
  });

  newItem.save()
    .then(res.redirect('/catalog/list'))
    .catch(err => res.render('error'));
});
module.exports = router;