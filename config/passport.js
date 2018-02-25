const LocalStrategy      = require('passport-local').Strategy;
const bcrypt             = require('bcrypt');
const User               = require('../models/User');
const passport           = require ("passport")
const session            = require("express-session");

//********************************** passport ****************
module.exports = function (app) {
  // NEW
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  
  passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });

  passport.use(new LocalStrategy({passReqToCallback:true},(req, username, password, next)=>{
    User.findOne({username}, (err, user)=>{
      if(err) return next(err);
      if(!user) return next(null, false, {message: "incorrect username"});
      if(!bcrypt.compareSync(password, user.password)) return next(null, false, {message: "Incorrecto password"});
      return next(null, user);
    });
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());

}
//********************************** passport ****************