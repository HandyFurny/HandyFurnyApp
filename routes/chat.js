const express = require ('express');
var router    = express ();
const Item    = require ('../models/Item');
const Chat    = require ('../models/Chat');
const TYPES   = require ('../models/item_types');
const User    = require ('../models/User.js');
const { ensureLoggedIn }  = require('connect-ensure-login');

router.get('/:iid', ensureLoggedIn('/'), (req, res, next) => {   
    Item.findById(req.params.iid)
      .populate("_creator")
      .then(result => {
        Chat.findOne( { $or : [{ $and : [ { _Buyer : req.user._id }, { _Seller : result._creator._id } ] },{ $and : [ { _Buyer : result._creator._id  }, { _Seller : req.user._id } ] } ] } ,(err,doc)=>{
          if (doc) {
            res.render('item/chat', { user:req.user,item: result,doc:doc})
          }else{
          let doc=undefined;

          // tengo que añadir el item en el que estoy interesada a favoritos
          User.findByIdAndUpdate(req.user._id, {$push: {favorite: req.params.iid}}, function (err, data){
            if (err )console.log(err)
        })
          res.render('item/chat', { user:req.user,item: result, doc:doc})
         }
        });  
      })
      .catch(err => res.render('error'))

});

module.exports = router;
     
