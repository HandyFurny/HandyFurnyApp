const express             = require ('express');
const multer              = require ('multer');
const Item                = require ('../models/Item');
const TYPES               = require ('../models/item_types');
const User                = require ('../models/User.js');
const upload              = multer  ({  dest: './public/uploads'});
const { ensureLoggedIn }  = require ('connect-ensure-login');
const router              = express.Router();
const {authorizeItem,checkOwnership}  = require ('../middlewares/currentUser.js')


router.get('/new', (req, res, next) =>{
  res.render('item/new', {types:  TYPES, user:req.user});
});

router.get('/api', (req, res, next) =>{
  Item.find({})
    .populate("_creator")
    .then(result => res.json(result))
});

router.get('/new', ensureLoggedIn('/'), (req, res, next) =>{
  res.render('item/new', {types:  TYPES, user:req.user});
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
    .then(()=>res.redirect('/catalog/list'))
    .catch(err => res.render('error'));
});

router.get('/list', ensureLoggedIn('/'), (req, res, next) => {
  Item.find({})
    .populate("_creator")
    .then(items =>  res.render('catalog/list', {items, user: req.user}))
    .catch(err => res.render('error'))
});

router.get('/:id',  ensureLoggedIn('/'), checkOwnership , (req, res, next) => {
    Item.findById(req.params.id)
      .populate("_creator")
      .then(item => res.render("catalog/single", { item, user: req.user}))
      .catch(err => res.render('error'))
});

router.get('/:id/edit', ensureLoggedIn('/'), authorizeItem, (req, res, next) => {
    Item.findById(req.params.id)
    .then(item => res.render('item/edit', { item, types: TYPES }))
    .catch(err => res.render('error'))
});

router.post('/:id', ensureLoggedIn('/'), authorizeItem, upload.single('itemPic'), (req, res, next) => {
    const updates = {
      title         : req.body.title,
      description   : req.body.description,
      category      : req.body.category,
      price         : req.body.price,
      views         : 0,
      itemPic       : `/uploads/${req.file.filename}`
    };
    Item.findByIdAndUpdate(req.params.id, updates)
    .then(item => res.redirect('/catalog/'+req.params.id))
    .catch(err => res.redirect('/catalog/'+req.params.id+'/edit'))
});

router.get('/:id/payment', ensureLoggedIn('/'),  (req, res, next) => {
  Item.findById(req.params.id)
  .then(item => res.render('item/payment', { item }))
  .catch(err => res.render('error'))
});

router.post('/:id/delete', ensureLoggedIn('/'), authorizeItem, (req, res, next) => {
  const id = req.params.id;
  Item.findByIdAndRemove(id)
  .then(item => res.redirect('/catalog/list'))
  .catch(err => res.render('error'))
});

/* Catalog index*/
router.get('/', ensureLoggedIn('/'), (req, res, next) => {
  Item.find({})
  .sort({created_at: -1})
  .populate("_creator")
  .then(result => res.render('catalog/index', {user:req.user, items:result, types:TYPES, enviroment:process.env.web}))
  .catch(err => res.render('error'))
});

module.exports = router;
