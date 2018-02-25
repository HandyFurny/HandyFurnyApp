const express = require('express');
const router  = express.Router();
const passport = require ("passport")
const User               = require('../models/User');
const LocalStrategy      = require('passport-local').Strategy;
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


//login
router.get("/login", (req,res)=>{
    res.render("authentication/login", {"message":req.flash("error")});
 });
 
 router.post("/login", passport.authenticate("local", {
     successRedirect: "/user",
     failureRedirect: "/login",
     failureFlash: true,
     passReqToCallback: true
 }));
 
 //logout
 router.get("/logout", (req,res)=>{
    req.logout();
    res.redirect("/");
 });
 
 
 router.get("/signup", (req,res, next)=>{
     res.render("authentication/signup");
 })
 
 .post("/signup", (req,res,next)=>{
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

         console.log("entra al post")
     User.findOne({username}, "username", (err, user)=>{
        if (user !== null){
            console.log("entra al find")
            res.render("authentication/signup", {message:"The username already exists"});
            return;
        }
 
        const hashPass = bcrypt.hashSync(password, salt);
 
        const newUser = new User({
            username,
            email,                
           password:hashPass
        });
        console.log(newUser)
        newUser.save(err=>{
            console.log("salva")
            if (err) return res.render("authentication/signup", { message: "Something went wrong" });
             res.redirect("/user");
        });
 
     });
 });

module.exports = router;