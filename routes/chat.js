const express = require('express');
var router=express();
const Item    = require ('../models/Item');
const TYPES   = require ('../models/item_types');
const User    = require ('../models/User.js');
const { ensureLoggedIn }  = require('connect-ensure-login');

/* GET home page. */
router.get('/:iid', ensureLoggedIn('/'), (req, res, next) => {
console.log("este es mi usuario "+ req.user);
console.log(req.params.iid)
    Item.findById(req.params.iid)
      .populate("_creator")
      .then(result => {
        console.log(result);  
        res.render('item/chat', { user:req.user,item: result})
      })
      .catch(err => res.render('error'))

});



module.exports = router;
     
