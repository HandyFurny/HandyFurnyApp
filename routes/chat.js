const express = require('express');
var router=express();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('item/chat');   
});


module.exports = router;
     
