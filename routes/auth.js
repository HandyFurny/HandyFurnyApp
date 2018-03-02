const express            = require('express');
const router             = express.Router();
const passport           = require ("passport")
const User               = require('../models/User');
const LocalStrategy      = require('passport-local').Strategy;
const bcrypt             = require("bcrypt");
const salt               = bcrypt.genSaltSync(10);
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

 //facebook login
 router.get("/auth/facebook", passport.authenticate("facebook", {scope: 'email'}));
 router.get("/auth/facebook/callback", passport.authenticate("facebook", {
     successRedirect: "/catalog",
     failureRedirect: "/"
 }));

//login
router.get("/login", ensureLoggedOut(), (req,res)=>{
    res.render("authentication/login", {"message":req.flash("error")});
 });
 
 router.post("/login", ensureLoggedOut(), passport.authenticate("local", {
     successRedirect: "/catalog",
     failureRedirect: "/login",
     failureFlash: true,
     passReqToCallback: true
 }));

 
 router.get("/signup", ensureLoggedOut(), (req,res, next)=>{
     res.render("authentication/signup");
 })
 
 .post("/signup", ensureLoggedOut(), (req,res,next)=>{
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

     User.findOne({username}, "username", (err, user)=>{
        if (user !== null){
  
            res.render("authentication/signup", {message:"The username already exists"});
            return;
        }
 
        const hashPass = bcrypt.hashSync(password, salt);
 
        const newUser = new User({
            username,
            email,                
           password:hashPass
        });
     
        newUser.save(err=>{
       
            if (err) return res.render("authentication/signup", { message: "Something went wrong" });
             res.redirect("/catalog");
        });
 
     });
 });

 
 //logout

    router.get("/logout", ensureLoggedIn('/'), (req,res)=>{
        req.logout();
        res.redirect("/");
    });

module.exports = router;