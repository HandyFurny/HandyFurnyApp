const express = require('express');
const router  = express.Router();
const User               = require('../models/User');
const Item               = require('../models/Item');
const Chat               = require('../models/Chat');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

 //
/* GET home page. */
router.get('/catalog/chat', (req, res, next) => {
    res.render('/item/chat');
  });



module.exports = router;