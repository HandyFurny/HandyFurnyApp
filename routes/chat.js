const express = require('express');
var router=express();
const Item    = require ('../models/Item');
const Chat    = require ('../models/Chat');
const TYPES   = require ('../models/item_types');
const User    = require ('../models/User.js');

const { ensureLoggedIn }  = require('connect-ensure-login');

/* GET home page. */
router.get('/:iid', ensureLoggedIn('/'), (req, res, next) => {
console.log("este es mi usuario "+ req.user);
console.log(req.params.iid)
       console.log('8==============D')
    Item.findById(req.params.iid)
      .populate("_creator")
      .then(result => {
        console.log("este es el usuario conectado"+req.user._id);
        console.log("este es el propietario del item"+result._creator._id);
        Chat.findOne( { $or : [{ $and : [ { _Buyer : req.user._id }, { _Seller : result._creator._id } ] },{ $and : [ { _Buyer : result._creator._id  }, { _Seller : req.user._id } ] } ] } ,(err,doc)=>{
          if (doc) {
           // console.log("estoy dentro del chat"+result);  
            console.log("este es el chat"+doc.messages[0])
            res.render('item/chat', { user:req.user,item: result,doc:doc})
         }else{
          let doc=[]
          // tengo que añadir el item en el que estoy interesada a favoritos
          res.render('item/chat', { user:req.user,item: result,doc:doc})
         }
        });  

       
      })
      .catch(err => res.render('error'))

});




  
  


module.exports = router;
     
