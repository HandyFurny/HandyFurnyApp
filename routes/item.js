const express = require('express');
const router  = express.Router();
const TYPES   = require ('../models/item_types');

/* Catalog index*/
router.get('/', (req, res, next) => {
  res.render('catalog/index', {user:req.user, types:TYPES})
});

module.exports = router;
