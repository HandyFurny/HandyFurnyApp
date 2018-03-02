const Item    = require ('../models/Item');

function authorizeItem(req, res, next){
  Item.findById(req.params.id, (err, item) => {
    if (err)      { return next(err) }
    if (!item){ return next(new Error('404')) }
    if (item._creator.equals(req.user._id)){
      return next()
    } else {
      return res.redirect(`/catalog/${item._id}`)
    }
  });
}

function checkOwnership(req, res, next){
  Item.findById(req.params.id, (err, item) => {
    if (err){ return next(err) }
    if (!item){ return next(new Error('404')) }
    if (item._creator.equals(req.user._id)){
      res.locals.isCurrentUser = true;
    } else {
      res.locals.isCurrentUser = false;
    }
    return next()
  });
}

module.exports = {authorizeItem,checkOwnership} ;
