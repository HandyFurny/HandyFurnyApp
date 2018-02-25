const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  email      : {type: String},
  username   : {type: String ,trim:true},
  password   : {type: String},
  imgUrl     : { type: String, default: "https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250" },
  //social login con passport
  facebookID: {type: String},
  displayName: {type: String}
});

const User = mongoose.model('User', userSchema);
module.exports = User;