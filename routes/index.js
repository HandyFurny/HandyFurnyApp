const express = require('express');
const router  = express.Router();
//about Us
router.get('/about', (req, res, next) => {
  res.render('about');
});
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;

