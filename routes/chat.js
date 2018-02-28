const express = require('express');
var router=express();
const Item    = require ('../models/Item');
const TYPES   = require ('../models/item_types');
const User    = require ('../models/User.js');
const { ensureLoggedIn }  = require('connect-ensure-login');

/* GET home page. */
router.get('/:id&:iid', ensureLoggedIn('/'), (req, res, next) => {

 
   

    Item.findById(req.params.iid)
      .populate("_creator")
      .then(result => {
        res.render('item/chat', { userId, item: result})
   
      })
      .catch(err => res.render('error'))


 
});


module.exports = router;
     
