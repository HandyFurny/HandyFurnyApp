const express               = require('express');
const router                = express.Router();
const User                  = require('../models/User')


/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('user/profile');
  });
  
  module.exports = router;
  