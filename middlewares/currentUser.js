const Item    = require ('../models/Item');

function authorizeCampaign(req, res, next){
  Campaign.findById(req.params.id, (err, campaign) => {
    if (err)      { return next(err) }
    if (!campaign){ return next(new Error('404')) }
    if (campaign._creator.equals(req.user._id)){
      return next()
    } else {
      return res.redirect(`/campaigns/${campaign._id}`)
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

module.exports = {authorizeCampaign,checkOwnership} ;
