const express = require ('express');
const multer  = require ('multer');
const Item    = require ('../models/Item');
const TYPES   = require ('../models/item_types');
const User    = require ('../models/User.js');
const upload  = multer  ({  dest: './public/uploads'});
const { ensureLoggedIn }  = require('connect-ensure-login');
const router  = express.Router();

router.get('/new', (req, res, next) =>{
  res.render('item/new', {types:  TYPES});
});

router.post('/new', ensureLoggedIn('/'), upload.single('itemPic'), (req, res, next)  =>{
  console.log("========")
  console.log(req.user)
  console.log("========")
  const newItem  = new Item({
  _creator      : req.user._id,
  title         : req.body.title,
  description   : req.body.description,
  category      : req.body.category,
  price         : req.body.price,
  views         : 0,
  itemPic       : `/uploads/${req.file.filename}`
  });

  console.log(newItem)
  // newItem.save((err, result)=>{
  //   if(err) return res.send(err);
  //   res.redirect("/");
  //  }); 

  // }); 

  newItem.save()
    .then(productUpload =>  res.redirect(`/catalog/${productUpload._id}`))
    .catch(err => res.render('error'));
});

router.get('/:id', (req, res, next) => {
    Item.findById(req.params.id)
      .populate("_creator")
      .then(result => res.render("catalog/list", {  product:  result  }))
  });

router.get('/:id/edit', ensureLoggedIn('/'),  (req, res, next) => {
    Item.findById(req.params.id, (err, product) => {
      if (err)       { return next(err) }
      if (!product)  { return next(new Error("404")) }
      return res.render('item/edit', { product, types: TYPES })
    });
  });

router.post('/:id/edit', ensureLoggedIn('/'), (req, res, next) => {
    const updates = {
      title         : req.body.title,
      description   : req.body.description,
      category      : req.body.category,
      price         : req.body.price,
      views         : 0,
      itemPic       : `/uploads/${req.file.filename}`
    };

    Item.findByIdAndUpdate(req.params.id, updates, (err, product) => {
      if (err) {
        return res.render('catalog/edit', {
          product,
          errors: product.errors
        });
      }
      if (!product) {
        return next(new Error('404'));
      }
      return res.redirect(`/catalog/${product._id}`);
    });
  });

/* Catalog index*/
router.get('/', (req, res, next) => {
  res.render('catalog/index', {user:req.user, types:TYPES})
});

module.exports = router;
