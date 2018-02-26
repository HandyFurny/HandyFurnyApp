const express = require('express');
const router  = express.Router();

/* Catalog index*/
router.get('/', (req, res, next) => {
  res.render('catalog/index', {user:req.user})
});

module.exports = router;
