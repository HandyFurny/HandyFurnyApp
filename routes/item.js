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
  const newItem  = new Item({
  _creator      : req.user._id,
  title         : req.body.title,
  description   : req.body.description,
  category      : req.body.category,
  price         : req.body.price,
  views         : 0,
  itemPic       : `/uploads/${req.file.filename}`
  });

  newItem.save()
    .then(res.redirect('/catalog/list'))
    // .then(itemUpload =>  res.redirect(`/catalog/${itemUpload._id}`))
    .catch(err => res.render('error'));
});

router.get('/list', (req, res, next) => {
  Item.find({})
    .populate("_creator")
    .then(items =>{
      res.render('catalog/list', {items})
    })
    .catch  (err => res.render('error'))
  });

router.get('/:id', ensureLoggedIn('/'), (req, res, next) => {
    userId = req.user._id
    console.log('USER: '+userId)
    Item.findById(req.params.id)
      .populate("_creator")
      .then(result => {
        res.render("catalog/single", { userId, item: result})
        console.log(result);
      })
      .catch(err => res.render('error'))
  });

// router.get('/:id/edit', ensureLoggedIn('/'),  (req, res, next) => {
//     Item.findById(req.params.id, (err, item) => {
//       if (err)       { return next(err) }
//       if (!item)  { return next(new Error("404")) }
//       return res.render('item/edit', { item, types: TYPES })
//     });
//   });

// router.post('/:id/edit', ensureLoggedIn('/'), (req, res, next) => {
//     const updates = {
//       title         : req.body.title,
//       description   : req.body.description,
//       category      : req.body.category,
//       price         : req.body.price,
//       views         : 0,
//       itemPic       : `/uploads/${req.file.filename}`
//     };

//     Item.findByIdAndUpdate(req.params.id, updates, (err, item) => {
//       if (err) {
//         return res.render('item/edit', {
//           item,
//           errors: item.errors
//         });
//         console.log(item)
//       }
//       if (!item) {
//         return next(new Error('404'));
//       }
//       return res.redirect(`/${item._id}`);
//     });
//   });

/* Catalog index*/
router.get('/', (req, res, next) => {
  Item.find({})
  .populate("_creator")
  .then(result => res.render('catalog/index', {user:req.user, items:result, types:TYPES}))
});



module.exports = router;
