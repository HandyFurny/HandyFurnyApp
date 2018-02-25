const FbStrategy         = require('passport-facebook').Strategy;
const LocalStrategy      = require('passport-local').Strategy;
const bcrypt             = require('bcrypt');
const User               = require('../models/User');
const passport           = require ("passport")
const session            = require("express-session");


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
//********************************** passport-local ****************
  passport.use(new LocalStrategy({passReqToCallback:true},(req, username, password, next)=>{
    User.findOne({username}, (err, user)=>{
      if(err) return next(err);
      if(!user) return next(null, false, {message: "incorrect username"});
      if(!bcrypt.compareSync(password, user.password)) return next(null, false, {message: "Incorrecto password"});
      return next(null, user);
    });
  }));

  passport.use(new FbStrategy({
    clientID: "841011936061948",
    clientSecret: "2e90da9d90fd75196d85d006530d08f9",
    callbackURL: "/auth/facebook/callback",
    profileFields: ['email', "displayName"]
},
    (accessToken, refreshToken, profile, done)=>{
  User.findOne({facebookID:profile.id}, (err,user)=>{
      //console.log(profile);
      if(err) return done(err);
      if(user) return done(null,user);
      const newUser = new User({
          facebookID:profile.id,
          username:profile.displayName,
          email:profile.emails.length > 0 ? profile.emails[0].value : null
      });
      newUser.save((err)=>{
        console.log("entro a guardar user")
        console.log(newUser)
        if(err) return done(err);
        done(null, newUser);
      });
    });
}));
  
  app.use(passport.initialize());
  app.use(passport.session());

  
//********************************** passport-local ****************
//********************** facebook login ******************


//********************** facebook login ******************

}


